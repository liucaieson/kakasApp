import { getPreMatchOdds } from '@/services/api';

export default {
  namespace: 'matchDetail',

  state: {
    matchDetail: {},
    oddsIds: [],
    oddsObj: {}
  },

  effects: {
    *fetchMatchOdds({ payload, callback }, { call, put }) {
      const result = yield call(getPreMatchOdds, payload);
      const { data } = result;
      yield put({
        type: 'saveData/saveData',
        payload: data,
      });
      const oddsIds = [];
      const oddsObj = {};
      /* 将比赛的盘口按照盘口id，组成obj */
      data[0].odds.forEach((val) => {
        oddsIds.push(val.oddId);
        oddsObj[val.oddId] = val
      });
      yield put({
        type: 'save',
        payload: {
          data,
          oddsIds,
          oddsObj
        },
      });
      if (callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        matchDetail: payload.data[0],
        oddsIds: payload.oddsIds,
        oddsObj: payload.oddsObj
      };
    },
  },
};
