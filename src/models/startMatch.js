import { getPreStartMatch } from '@/services/api';

export default {
  namespace: 'startMatch',

  state: {
    matchList: []
  },

  effects: {
    *fetchMatchOdds({ payload, callback }, { call, put }) {
      const data = yield call(getPreStartMatch, payload);
      yield put({
        type: 'saveData/saveData',
        payload: data,
      });
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        matchList: payload
      };
    },
  },
};
