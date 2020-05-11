/* 公告栏信息 */
import { getMessage } from '@/services/api';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'announcement',

  state: {
    data: [],
  },

  effects: {
    * fetch({ payload, callback }, { call, put }) {
      const data = yield call(getMessage, payload);
      if (data.data.length === 0) {
        Toast.info('暂无更多数据', 1);
        return;
      }
      yield put({
        type: 'save',
        payload: {
          data: data.data,
        },
      });
      if (callback) callback(data);
    },
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
