// 保存比赛盘口项信息
export default {
  namespace: 'oddsDB',

  state: {
    oddsDB: {
    },
  },

  effects: {
    *saveOddsData({ payload }, { put }) {
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
        oddsDB: payload,
      };
    },
  },

};
