import { accountStatement } from '@/services/api';
import { Toast } from 'antd-mobile'

export default {
  namespace: 'accountStatement',

  state: {
      data:[],
      count: 1,
      current: 1
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(accountStatement, payload);
      const accountData = yield select( state => state.accountStatement);
      if(data.current === 1){
        yield put({
          type: 'save',
          payload: {
            data: data.data,
            count:data.count,
            current:data.current
          },
        });
      }else{
        if(data.length === 0){
          Toast.info('暂无更多',1);
          return
        }
        yield put({
          type: 'save',
          payload: {
            data: accountData.data.concat(data.data),
            count:data.count,
            current:data.current
          },
        });
      }
      if(callback) callback(data)
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data,
        count: payload.count,
        current: payload.current
      };
    },
  },
};
