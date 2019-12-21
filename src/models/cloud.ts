import { Effect } from 'dva';
import { Reducer } from 'redux';

import { query, comments } from '@/services/cloud';

export interface Cloud {
  list: any[];
  comments: any[];
}

export interface ModelType {
  namespace: 'cloud';
  state: Cloud;
  effects: {
    list: Effect;
    comments: Effect;
  };
  reducers: {
    setWorkspace: Reducer<Cloud>;
  };
}

const Model: ModelType = {
  namespace: 'cloud',
  state: {
    list: [],
    comments: [],
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
    *comments(action, { call, put }) {
      const res = yield call(comments, action.payload);
      yield put({
        type: 'setState',
        payload: {
          comments: res,
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
