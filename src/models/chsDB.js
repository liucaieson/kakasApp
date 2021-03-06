// 保存比赛赔率信息
export default {
  namespace: 'chsDB',

  state: {
    chsDB: {
    },
  },

  effects: {
    *saveChsData({ payload }, { call, put, select }) {
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
        chsDB: payload,
      };
    },
  },

};
