import { getPreMatchOdds } from '@/services/api';
import { normalizeDataFromCPTID } from '@/utils/utils'

export default {
  namespace: 'mixed',

  state: {
    competitionsMatchList:{},
    matchList:{},
    oddsList:{}
  },

  effects: {
    *fetchMatchOdds({payload, callback}, { call, put, select }) {
      let result = yield call(getPreMatchOdds, payload);
      const {data} = result;
      let competitionsMatchList = normalizeDataFromCPTID(data, 'cptId');

      yield put({
        type: 'save',
        payload: competitionsMatchList.matchListObj,
      });
      if(callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        competitionsMatchList: payload
      };
    },
  },
};
