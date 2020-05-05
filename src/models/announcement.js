/* 公告栏信息 */
import { getMessage } from '@/services/api';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'announcement',

  state: {
    data:[],
    count: 1,
    current: 1
  },

  effects: {
    *fetch({payload, callback}, { call, put, select }) {
      let data = yield call(getMessage, payload);
      const annData = yield select( state => state.announcement);
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
            data: annData.data.concat(data.data),
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
