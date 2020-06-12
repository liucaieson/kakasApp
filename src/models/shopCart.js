import { postBetOrder, checkMatchStatus } from '@/services/api';
import { Toast } from 'antd-mobile';
/* 集中保存比赛数据，盘口数据，和竟猜项数据 */
export default {
  namespace: 'shopCart',

  /*
  * showCart 是否打开购物车
  * type1为单注 2混合过关
  * dishInfo为投注项信息
  * choiceId投注项固定id
  * mixedDishId 为混合过关比赛id
  * mixedDishInfo 是以matchId为key的比赛数组
  */

  state: {
    showCart: false,
    type: 1,
    dishInfo: {},
    choiceId: 1,
    mixedDishId: [],
    mixedDishInfo: {},
  },

  effects: {
    *openCart(_, { put }) {
      yield put({
        type: 'changeCartStatus',
        payload: true,
      });
    },
    *closeCart(_, { put }) {
      yield put({
        type: 'changeCartStatus',
        payload: false,
      });
    },
    /* 检查是否有过期比赛 */
    *checkBetOrder({ payload }, { call, put, select }) {
      if (payload.dishId === '') {
        return;
      }
      const data = yield call(checkMatchStatus, payload);
      const chsListObj = {};
      let dishInfo = {};
      data.map(v => {
        dishInfo = v;
        chsListObj[v.choiceId] = v;
        return v
      });
      /* 储存以choiceId为key的盘口竟猜项数据 */
      const chsDB = yield select(state => state.chsDB.chsDB);

      const newChsDB = {
        ...chsDB,
        ...chsListObj,
      };

      yield put({
        type: 'save',
        payload: {
          type: 1,
          choiceId: dishInfo.choiceId,
          dishInfo,
        },
      });

      yield put({
        type: 'chsDB/saveChsData',
        payload: newChsDB,
      });
    },
    /* 检查混合过关是否有过期比赛 */
    *checkMixedOrder({ payload }, { call, put, select }) {
      if (payload.dishId === '') {
        return;
      }
      const data = yield call(checkMatchStatus, payload);
      const mixedDishId = [];
      const mixedDishInfo = {};
      data.forEach((val) => {
        mixedDishId.push(val.matchId);
        mixedDishInfo[val.matchId] = { ...val, amount: 0 };
      });

      const chsListObj = {};
      data.forEach(v => {
        chsListObj[v.choiceId] = v;
      });
      /* 储存以choiceId为key的盘口竟猜项数据 */
      const chsDB = yield select(state => state.chsDB.chsDB);
      const newChsDB = {
        ...chsDB,
        ...chsListObj,
      };
      yield put({
        type: 'chsDB/saveChsData',
        payload: newChsDB,
      });

      yield put({
        type: 'saveMixed',
        payload: {
          type: 2,
          mixedDishId,
          mixedDishInfo,
        },
      });
    },

    /* 提交购物车投注单 */
    *postBetOrder({ payload, callback }, { call, put, select }) {
      const shopCartData = yield select(state => state.shopCart);
      const chsDB = yield select(state => state.chsDB.chsDB);
      const { choiceId } = shopCartData;
      const params = {
        sport: '1',
        result: [{
          betType: '1',
          dishValue: payload,
          dishId: chsDB[choiceId].dishId,
          dishRate: chsDB[choiceId].dish,
          }
        ]
      };
      const data = yield call(postBetOrder, params);
      /* 200为投注成功 */
      if (data.code === 200) {
        // 更新赔率
        const chsListObj = {};

        let cheChoiceId = 1;
        let dishInfo = {};
        data.data.forEach((val) => {
          // 不等于208标识错误交给购物车,并更新赔率
          if (val.code !== '208') {
            chsListObj[val.choiceId] = val;
            cheChoiceId = val.choiceId;
            dishInfo = val
          }
        });
        const newChsDB = {
          ...chsDB,
          ...chsListObj,
        };
        yield put({
          type: 'chsDB/saveChsData',
          payload: newChsDB,
        });
        yield put({
          type: 'save',
          payload: {
            type: 1,
            choiceId: cheChoiceId,
            dishInfo
          },
        });
        /* 将返回的数据给视图层处理 */
        if (callback) callback(data.data);
      } else if (data.code === 3002) {
        Toast.info('余额不足', 2);
      } else {
        Toast.info(data.message, 2);
      }
    },
    /* 提交购物车投注单 */
    *postMixedOrder({ payload, callback }, { call, put, select }) {
      const chsDB = yield select(state => state.chsDB.chsDB);
      const shopCartData = yield select(state => state.shopCart);
      const { mixedDishId, mixedDishInfo } = shopCartData;
      if (mixedDishId.length <= 1) {
        return
      }

      const dishIdArr = [];
      const dishRateArr = [];

      mixedDishId.forEach((val) => {
        dishIdArr.push(chsDB[mixedDishInfo[val].choiceId].dishId);
        dishRateArr.push(chsDB[mixedDishInfo[val].choiceId].dish)
      });

      const params = {
        sport: '1',
        result: [{
          betType: mixedDishId.length,
          dishValue: payload,
          dishId: dishIdArr.join(','),
          dishRate: dishRateArr.join(','),
         }
        ]
      };
      const data = yield call(postBetOrder, params);
      /* 200为投注成功 */
      if (data.code === 200) {
        const chsListObj = {};
        // 判断错误数量===0 则下注成功
        let err = 0;
        data.data.forEach((val) => {
          // 不等于208标识错误交给购物车,并更新赔率
          if (val.code !== '208') {
            err += 1;
            chsListObj[val.matchId] = val;
            mixedDishInfo[val.matchId] = {
              ...mixedDishInfo[val.matchId],
              ...val,
            };
          }
        });
        const newChsDB = {
          ...chsDB,
          ...chsListObj,
        };
        yield put({
          type: 'chsDB/saveChsData',
          payload: newChsDB,
        });
        if (err === 0) {
          yield put({
            type: 'saveMixed',
            payload: {
              type: 2,
              mixedDishId: [],
              mixedDishInfo: {},
            },
          });
        } else {
          yield put({
            type: 'saveMixed',
            payload: {
              type: 2,
              mixedDishInfo,
              mixedDishId,
            },
          });
        }
        /* 将返回的数据给视图层处理 */
        if (callback) callback(data.data);
      } else if (data.code === 3002) {
        Toast.info('余额不足', 2);
      } else {
        Toast.info(data.message, 2);
      }
    },

    *addBetShopCart({ payload }, { put, }) {
      if (payload.dishId === '') {
        return;
      }
      yield put({
        type: 'save',
        payload: {
          type: 1,
          choiceId: payload.choiceId,
          dishInfo: {
            dishId: payload.dishId,
            matchId: payload.matchId,
            gamblingId: payload.gamblingId,
            choiceId: payload.choiceId,
          },
        },
      });
      yield put({
        type: 'saveMixed',
        payload: {
          type: 1,
          mixedDishId: [],
          mixedDishInfo: {},
        },
      });
    },
    *addMixedBetShopCart({ payload }, { put, select }) {
      if (payload.dishId === '') {
        return;
      }
      const mixedDishId = yield select(state => state.shopCart.mixedDishId);
      const mixedDishInfo = yield select(state => state.shopCart.mixedDishInfo);
      if (mixedDishId.length >= 8) {
        Toast.info('混合过关最多选择8注', 2);
        return;
      }
      /* 储存以choiceId为key的盘口竟猜项数据 */
      if (mixedDishId.includes(payload.matchId)) {
        mixedDishInfo[payload.matchId] = {
          dishId: payload.dishId,
          matchId: payload.matchId,
          gamblingId: payload.gamblingId,
          choiceId: payload.choiceId,
        };
      } else {
        mixedDishId.push(payload.matchId);
        mixedDishInfo[payload.matchId] = {
          dishId: payload.dishId,
          matchId: payload.matchId,
          gamblingId: payload.gamblingId,
          choiceId: payload.choiceId,
        };
      }

      yield put({
        type: 'saveMixed',
        payload: {
          type: payload.type,
          mixedDishId,
          mixedDishInfo,
        },
      });
      yield put({
        type: 'save',
        payload: {
          type: payload.type,
          choiceId: 1,
          dishInfo: {},
        },
      });
    },
    *delAllShopCart(_, { put }) {
      yield put({
        type: 'allDel',
        payload: {
          type: 1,
          choiceId: 0,
          mixedDishId: [],
          dishInfo: {},
          mixedDishInfo: {},
        }
      })
    },
    *delOneMixedBet({ payload }, { put, select }) {
      const shopCartData = yield select(state => state.shopCart);

      const { mixedDishId, mixedDishInfo } = shopCartData;
      const index = mixedDishId.indexOf(payload);
      if (index > -1) {
        delete mixedDishInfo[payload];
        mixedDishId.splice(index, 1);
      }

      yield put({
        type: 'saveMixedBetAfterDel',
        payload: {
          mixedDishId,
          mixedDishInfo,
        }
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        type: payload.type,
        choiceId: payload.choiceId,
        dishInfo: payload.dishInfo,
      };
    },
    saveMixed(state, { payload }) {
      return {
        ...state,
        type: payload.type,
        mixedDishId: payload.mixedDishId,
        mixedDishInfo: payload.mixedDishInfo,
      };
    },
    saveMixedBetAfterDel(state, { payload }) {
      return {
        ...state,
        mixedDishId: payload.mixedDishId,
        mixedDishInfo: payload.mixedDishInfo,
      };
    },
    allDel(state, { payload }) {
      return {
        ...state,
        type: payload.type,
        choiceId: payload.choiceId,
        dishInfo: payload.dishInfo,
        mixedDishId: payload.mixedDishId,
        mixedDishInfo: payload.mixedDishInfo,
      };
    },

    changeCartStatus(state, { payload }) {
      return {
        ...state,
        showCart: payload,
      };
    },
  },
};
