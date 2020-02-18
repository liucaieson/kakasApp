/* 查询历史比赛结果 */
import { queryHistory } from '@/services/api';
import { Toast } from 'antd-mobile'

export default {
  namespace: 'historyBets',

  state: {
    data:[],
    count:1,
    current:1
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(queryHistory, payload);
      const betData = yield select( state => state.historyBets);
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
          if(data.data.length === 0){
            Toast.info('暂无更多数据',1);
            return
          }
          yield put({
            type: 'save',
            payload: {
              data: betData.data.concat(data.data),
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
