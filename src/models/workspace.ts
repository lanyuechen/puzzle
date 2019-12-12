import { Effect } from 'dva';
import { Reducer } from 'redux';
import { updateByPath } from '@/utils/utils';

import { load, save } from '@/services/workspace';

export interface StateType {
  projects: any[];
  actives: string[];
  current?: string;
  component: any;
}

export interface ModelType {
  namespace: 'workspace';
  state: StateType;
  effects: {
    load: Effect;
    save: Effect;
  };
  reducers: {
    setWorkspace: Reducer<StateType>;
    setCurrentProject: Reducer<StateType>;
    setActiveProjects: Reducer<StateType>;
    setProject: Reducer<StateType>;
    setComponent: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'workspace',
  state: {
    projects: [],
    actives: [],
    component: {}
  },
  effects: {
    *load(action, { call, put }) {
      const res = yield call(load);
      yield put({
        type: 'setWorkspace',
        payload: res,
      });
    },
    *save(action, { call, select }) {
      const { workspace } = yield select();
      yield call(save, workspace);
    },
  },
  reducers: {
    setWorkspace(state: StateType, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCurrentProject(state: StateType, action) {
      const actives = [...state.actives];
      if (!actives.includes(action.payload)) {
        actives.push(action.payload);
      }

      return {
        ...state,
        actives,
        current: action.payload,
      };
    },
    setActiveProjects(state: StateType, action) {
      return {
        ...state,
        actives: action.payload,
      };
    },
    setProject(state: StateType, action) {
      return {
        ...state,
        projects: action.payload,
      };
    },
    setComponent(state: StateType, action) {
      return {
        ...state,
        component: {
          ...state.component,
          [action.path]: action.payload,
        },
      };
    }
  },
};

export default Model;
