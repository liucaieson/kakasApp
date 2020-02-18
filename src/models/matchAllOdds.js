import { getPreMatchOddsAllGG } from '@/services/api';
import { normalizeDataFromCPTID } from '@/utils/utils'


export default {
  namespace: 'matchAllOdds',

  state: {
    matchAllOdds:[
      []
    ]
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(getPreMatchOddsAllGG, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if(callback) callback()
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        matchAllOdds: payload
      };
    },
  },
};
