import { Effect } from 'dva';
import { Reducer } from 'redux';

import { query } from '@/services/cloud';

export interface Cloud {
  list: any[];
}

export interface ModelType {
  namespace: 'cloud';
  state: Cloud;
  effects: {
    list: Effect;
  };
  reducers: {
    setWorkspace: Reducer<Cloud>;
  };
}

const Model: ModelType = {
  namespace: 'cloud',
  state: {
    list: [],
  },
  effects: {
    *list(action, { call, put }) {
      const res = yield call(query, action.payload);
      yield put({
        type: 'setState',
        payload: {
          list: res,
        },
      });
    },
  },
  reducers: {
    setState(state: Cloud, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default Model;
