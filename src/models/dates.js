import { getDates } from '@/services/api';

export default {
  namespace: 'dates',

  state: {
    dates:[

    ]
  },

  effects: {
    *fetch({payload}, { call, put, select }) {
      let data = yield call(getDates,payload);
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        dates: payload
      };
    },
  },

};
