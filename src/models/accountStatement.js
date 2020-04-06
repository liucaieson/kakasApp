import { accountStatement } from '@/services/api';
import { Toast } from 'antd-mobile'

export default {
  namespace: 'accountStatement',

  state: {
      data:[],
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(accountStatement, payload);
        if(data.data.length === 0){
          Toast.info('暂无更多',1);
          return
        }
        yield put({
          type: 'save',
          payload: {
            data: data.data,
          },
        });

      if(callback) callback(data)
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },
};
