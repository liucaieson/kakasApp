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
      const data = yield call(loginApp, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback(data);
    },
    *logout(_, { put }) {
      sessionStorage.clear();
      window.location.replace('/401');
      yield put({
        type: 'change',
        payload: false,
      });
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
