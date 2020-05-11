import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'matchList',

  state: {
    competitionsMatchList: [],
    times: [],
    matchObj: {},
  },

  effects: {
    *fetchMatchOdds({ payload, callback }, { call, put }) {
      const result = yield call(getPreMatchOdds, payload);
      const { data } = result;
      yield put({
        type: 'saveData/saveData',
        payload: data,
      });

      const matchObj = {};
      const times = [];
      data.forEach((val) => {
        const time = val.time.substring(0, 8);
        if (times.includes(time)) {
          matchObj[time].push(val)
        } else {
         times.push(time);
         matchObj[time] = [];
         matchObj[time].push(val)
        }
      });

      yield put({
        type: 'save',
        payload: {
          times,
          matchObj
        },
      });
      if (callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        times: payload.times,
        matchObj: payload.matchObj
      };
    },
  },
};
