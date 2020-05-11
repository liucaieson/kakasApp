import { getCompetitions } from '@/services/api';

export default {
  namespace: 'competitions',

  state: {
    competitions: [],
    areaId: [],
    competitionsObj: {},
    competitionsMap: {}
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const data = yield call(getCompetitions, payload);
      const competitionsObj = {};
      const competitionsMap = {};
      const areaId = [];
      data.forEach((val) => {
        if (areaId.includes(val.areaId)) {
          competitionsObj[val.areaId].push(val)
        } else {
          areaId.push(val.areaId);
          competitionsObj[val.areaId] = [];
          competitionsObj[val.areaId].push(val)
        }
        competitionsMap[val.competitionId] = val
      });
      yield put({
        type: 'save',
        payload: {
          data,
          competitionsObj,
          areaId,
          competitionsMap
        },
      });
      if (callback) callback(data)
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        competitions: payload.data,
        areaId: payload.areaId,
        competitionsObj: payload.competitionsObj,
        competitionsMap: payload.competitionsMap,
      };
    },
  },
};
