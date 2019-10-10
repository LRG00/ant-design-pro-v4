import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { querySysUser } from './service';

import { sysUserListData } from './data.d';

export interface StateType {
  data: sysUserListData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    // add: Effect;
    // remove: Effect;
    // update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'sysUser',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(querySysUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addArtile, payload);
    //   yield put({
    //     type: 'fetch',
    //   });
    //   if (callback) callback(response);
    // },
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeArtile, payload);
    //   yield put({
    //     type: 'fetch',
    //   });
    //   if (callback) callback(response);
    // },
    // *update({ payload, callback }, { call, put }) {
    //   const response = yield call(updateRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },

  reducers: {
    save(state, action) {
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export default Model;
