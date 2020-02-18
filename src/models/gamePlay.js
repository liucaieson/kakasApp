import { getGg } from '@/services/api';

export default {
  namespace: 'gamePlay',

  state: {
    asianDish: [],
    todayDish: []
  },

  effects: {
    *fetchAsianDish(_, { call, put, select }) {
      let data = yield call(getGg,{token:'xxx',sports: 1});
      yield put({
        type: 'saveAsianDish',
        payload: data,
      });
    },
    *fetchTodayDish(_, { call, put, select }) {
      let data = yield call(getGg,{token:'xxx',sports: 1,date: '2018-11-10'});
      yield put({
        type: 'saveTodayDish',
        payload: data,
      });
    },

  },

  reducers: {
    saveAsianDish(state, { payload }) {
      return {
        ...state,
        asianDish: payload
      };
    },
    saveTodayDish(state, { payload }) {
      return {
        ...state,
        todayDish: payload
      };
    },
  },

};
