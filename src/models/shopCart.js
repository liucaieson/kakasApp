import { postBetOrder, checkMatchStatus } from '@/services/api';
/* 集中保存比赛数据，盘口数据，和竟猜项数据 */
export default {
  namespace: 'shopCart',

  /*
  * showCart 是否打开购物车
  * type1为单注 2混合过关
  * dishInfo为投注项信息
  * choiceId投注项固定id
  * mixedDishId 为混合过关比赛id
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
    * openCart(_, { call, put }) {
      yield put({
        type: 'changeCartStatus',
        payload: true,
      });
    },
    * closeCart(_, { call, put }) {
      yield put({
        type: 'changeCartStatus',
        payload: false,
      });
    },
    /* 检查是否有过期比赛 */
    * checkBetOrder({ payload, callback }, { call, put, select }) {
      if (payload.dishId === '') {
        return;
      }
      let data = yield call(checkMatchStatus, payload);
      const chsListObj = {};
      let dishInfo = {};
      data.forEach(v => {
        dishInfo = v;
        chsListObj[v.choiceId] = v;
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
    * checkMixedOrder({ payload, callback }, { call, put, select }) {
      if (payload.dishId === '') {
        return;
      }
      let data = yield call(checkMatchStatus, payload);
      let mixedDishId = [];
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
    * postBetOrder({ payload, callback }, { call, put, select }) {
      let data = yield call(postBetOrder, payload);
      const shopCartData = yield select(state => state.betShopCart.shopCart);
      /* 200为投注成功 */
      if (data.code === 200) {
        // 更新赔率
        const chsListObj = {};
        const chsDB = yield select(state => state.chsDB.chsDB);

        let ids = [];
        const list = {};
        data.data.map((val) => {
          // 不等于208标识错误交给购物车,并更新赔率
          if (val.code !== '208') {
            chsListObj[val.choiceId] = val;
            ids.push(val.choiceId);
            list[val.choiceId] = {
              ...shopCartData.list[val.choiceId],
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
        yield put({
          type: 'save',
          payload: {
            ids,
            list,
          },
        });
        /* 将返回的数据给视图层处理*/
        if (callback) callback(data.data);
      } else if (data.code === 3002) {
        Toast.info('余额不足', 2);
      } else {
        Toast.info(data.message, 2);
      }
    },

    *addBetShopCart({ payload, callback }, { call, put, select }) {
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
    },
    *addMixedBetShopCart({ payload, callback }, { call, put, select }) {
      if (payload.dishId === '') {
        return;
      }
      let mixedDishId = yield select(state => state.shopCart.mixedDishId);
      let mixedDishInfo = yield select(state => state.shopCart.mixedDishInfo);
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
    },
    *delAllShopCart({ payload }, { call, put, select }) {
      yield put({
        type: 'allDel',
        payload:{
          type: 1,
          choiceId: 0,
          mixedDishId: [],
          dishInfo: {},
          mixedDishInfo: {},
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
