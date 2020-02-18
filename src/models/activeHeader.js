export default {
  namespace: 'activeHeader',

  state: {
    isHeader: ''
  },

  effects: {
    *toggleHeader({payload}, { call, put, select }) {
      yield put({
        type: 'saveHeader',
        payload,
      });
    },
  },

  reducers: {
    saveHeader(state, { payload }) {
      return {
        ...state,
        isHeader: payload
      };
    },
  },

};
