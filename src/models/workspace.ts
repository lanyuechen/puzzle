import { Effect } from 'dva';
import { Reducer } from 'redux';
import { updateByPath } from '@/utils/utils';

import { load, save } from '@/services/workspace';

export interface Project {
  name: string;
  children: Project[];
  isFile: boolean;
}

export interface Component {
  type: string;
  ref?: string[];
  props?: any;
  children?: Component[];
  block?: boolean;
}

export interface Workspace {
  projects: Project[];
  actives: string[];
  current?: string;
  component: {[key: string]: Component};
}

export interface ModelType {
  namespace: 'workspace';
  state: Workspace;
  effects: {
    load: Effect;
    save: Effect;
  };
  reducers: {
    setWorkspace: Reducer<Workspace>;
    setCurrentProject: Reducer<Workspace>;
    setActiveProjects: Reducer<Workspace>;
    setProject: Reducer<Workspace>;
    setComponent: Reducer<Workspace>;
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
    setWorkspace(state: Workspace, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setCurrentProject(state: Workspace, action) {
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
    setActiveProjects(state: Workspace, action) {
      return {
        ...state,
        actives: action.payload,
      };
    },
    setProject(state: Workspace, action) {
      return {
        ...state,
        projects: action.payload,
      };
    },
    setComponent(state: Workspace, action) {
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