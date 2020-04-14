import { matchQuery, getCompetitions } from '@/services/api';

export default {
  namespace: 'gameResult',

  state: {
    data:[],
    current:1,
    count: 1,
    competitions:[]
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let res = yield call(matchQuery, payload);
      const { data , current, count} = res;
      yield put({
        type: 'save',
        payload: {
          data,
          current,
          count
        },
      });
      if(callback) callback(data)
    },
    *fetchCompetitions({payload, callback}, { call, put, select }) {
      let data = yield call(getCompetitions, payload);
      yield put({
        type: 'saveCompetitions',
        payload: data,
      });
      if(callback) callback(data)
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
        current:payload.current,
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
