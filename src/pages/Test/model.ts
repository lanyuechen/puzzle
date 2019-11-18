/**
 * test
 */
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { query, update, create, remove } from './service';

export interface ModelType {
  namespace: 'test';
  state: StateType;
  effects: {
    list: Effect;
    create: Effect;
    update: Effect;
    remove: Effect;
  };
  reducers: {
    setState: Reducer<StateType>;
    showModalUpsert: Reducer<StateType>;
    hideModalUpsert: Reducer<StateType>;
  };
}

export interface StateType {
  modalUpsertVisible: boolean;
  list: any[];
  current?: any;
}

const Model: ModelType = {
  namespace: 'test',
  state: {
    list: [],
    modalUpsertVisible: false,
  },
  effects: {
    *list(action, { call, put }) {
      const res = yield call(query, action.payload);
      if (res.success) {
        yield put({
          type: 'setState',
          payload: {
            list: res.data,
          },
        });
      }
    },
    *create(action, { call, put, select }) {
      const res = yield call(create, action.payload);
      if (res.success) {
        const { test } = yield select();

        yield put({
          type: 'setState',
          payload: {
            modalUpsertVisible: false,
            list: [ res.data, ...test.list ],
          },
        });
      }
    },
    *update(action, { call, put, select }) {
      const { id, values } = action.payload;
      const res = yield call(update, id, values);
      if (res.success) {
        const { test } = yield select();

        yield put({
          type: 'setState',
          payload: {
            modalUpsertVisible: false,
            list: test.list.map((d: any) => {
              if (d.id === id) {
                return {
                  ...d,
                  ...values,  // todo values的值是包含嵌套的，所以这里可能会有问题，需要deepMerge
                };
              }
              return d;
            }),
          },
        });
      }
    },
    *remove(action, { call, put, select }) {
      const res = yield call(remove, action.payload);
      if (res.success) {
        const { test } = yield select();

        yield put({
          type: 'setState',
          payload: {
            list: test.list.filter((item: any) => !res.data.includes(`${item.id}`)),
          },
        });
      }
    },
  },
  reducers: {
    setState(state: StateType, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    showModalUpsert(state: StateType, action) {
      return {
        ...state,
        current: action.payload,
        modalUpsertVisible: true,
      };
    },
    hideModalUpsert(state: StateType, action) {
      return {
        ...state,
        modalUpsertVisible: false,
      };
    }
  },
};

export default Model;