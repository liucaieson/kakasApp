// 登录
import { loginApp } from '@/services/api';

export default {
  namespace: 'login',

  state: {
    token: {
    },
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      let data = yield call(loginApp, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback(data);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        token: payload,
      };
    },
    change(state, { payload }) {
      return {
        ...state,
        isLogin: payload,
      };
    },
  },
};
