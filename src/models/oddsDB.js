// 保存比赛盘口项信息
export default {
  namespace: 'oddsDB',

  state: {
    oddsDB: {
    },
  },

  effects: {
    *saveOddsData({payload}, { call, put, select }) {
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
        oddsDB: payload,
      };
    },
  },

};
