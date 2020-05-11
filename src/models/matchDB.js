// 保存比赛信息
export default {
  namespace: 'matchDB',

  state: {
    matchDB: {
    },
  },

  effects: {
    *saveMatchData({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
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
