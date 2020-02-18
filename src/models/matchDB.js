// 保存比赛信息
export default {
  namespace: 'matchDB',

  state: {
    matchDB: {
    },
  },

  effects: {
    *saveMatchData({payload}, { call, put, select }) {
      yield put({
        type: 'save',
        payload: payload,
      });
    },

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        matchDB: payload,
      };
    },
  },

};
