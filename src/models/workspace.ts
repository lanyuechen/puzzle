import { Effect } from 'dva';
import { Reducer } from 'redux';

import { load, save } from '@/services/workspace';
import uuid from '@/utils/uuid';

export interface Project {
  name: string;
  children: Project[];
  isFile: boolean;
}

export interface Component {
  id: string;
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

export const withId = (data: Component): Component => {
  if (typeof(data) !== 'object') {
    return data;
  }
  return {
    ...data,
    id: data.id || uuid(),
    children: data.children && data.children.map(withId),
  }
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
        payload: {
          ...res,
          component: Object.entries(res.component).reduce((p: any, [k, v]: any) => ({
            ...p,
            [k]: withId(v),
          }), {}),
        },
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
      const { current } = state;
      return {
        ...state,
        actives: action.payload,
        current: action.payload.includes(current) ? current : action.payload[0],
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
