import { matchQuery, getAllCompetitions } from '@/services/api';

export default {
  namespace: 'gameResult',

  state: {
    data: [],
    current: 1,
    count: 1,
    competitions: []
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const res = yield call(matchQuery, payload);
      const { data, current, count } = res;
      yield put({
        type: 'save',
        payload: {
          data,
          current,
          count
        },
      });
      if (callback) callback(data)
    },
    *fetchAllCompetitions({ payload, callback }, { call, put }) {
      const data = yield call(getAllCompetitions, payload);
      yield put({
        type: 'saveCompetitions',
        payload: data,
      });
      if (callback) callback(data)
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
        current: payload.current,
        count: payload.count
      };
    },
    saveCompetitions(state, { payload }) {
      return {
        ...state,
        competitions: payload
      };
    },
  },
};
