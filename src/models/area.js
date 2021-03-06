/* 请求区域 */
import { getArea } from '@/services/api';

export default {
  namespace: 'area',

  state: {
    area: [],
    areaObj: {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(getArea, payload);
      const areaObj = {};
      data.forEach((val) => {
        areaObj[val.areaId] = val.areaName
      });
      yield put({
        type: 'save',
        payload: {
          data,
          areaObj
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        area: payload.data,
        areaObj: payload.areaObj
      };
    },
  },

};
