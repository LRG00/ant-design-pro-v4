/*
 * @Author: liruigang
 * @Date: 2019-10-18 08:16:52
 * @LastEditors: liruigang
 * @LastEditTime: 2019-10-18 08:16:52
 * @UI:
 */
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryEditcode, addEditcode, updateEditcode, deleteEditcode } from './service';

import { editcodeListData } from './data';

export interface StateType {
  data: editcodeListData;
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
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'editcode',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      console.log('-----');
      const response = yield call(queryEditcode, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addEditcode, payload);
      yield put({
        type: 'fetch',
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteEditcode, payload);
      yield put({
        type: 'fetch',
      });
      if (callback) callback(response);
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateEditcode, payload);
      yield put({
        type: 'fetch',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export default Model;
