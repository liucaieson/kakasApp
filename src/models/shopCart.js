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

    * addBetShopCart({ payload, callback }, { call, put, select }) {
      if (payload.dishId === '') {
        return;
      }
      const oldShopCart = yield select(state => state.shopCart);
      let data = yield call(checkMatchStatus, {
        sport: payload.sport,
        dishId: payload.dishId,
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

      if (payload.type === 1) {
        let choiceId = '';
        let dishInfo = {};

        data.forEach((val) => {
          choiceId = val.choiceId;
          dishInfo = { ...val, amount: 0 };
        });

        yield put({
          type: 'save',
          payload: {
            type: payload.type,
            choiceId,
            dishInfo,
          },
        });
      } else {
        let choiceId = [];
        let dishInfo = {};
        data.forEach((val) => {
          choiceId.push(val.choiceId);
          dishInfo.push({ ...val, amount: 0 });
        });

        yield put({
          type: 'save',
          payload: {
            type: payload.type,
            choiceId,
            dishInfo,
          },
        });
      }
    },
    * addMixedBetShopCart({ payload, callback }, { call, put, select }) {
      if (payload.dishId === '') {
        return;
      }
      let mixedDishId = yield select(state => state.shopCart.mixedDishId);
      let mixedDishInfo = yield select(state => state.shopCart.mixedDishInfo);
      /* 储存以choiceId为key的盘口竟猜项数据 */
      const chsDB = yield select(state => state.chsDB.chsDB);
      if(mixedDishId.includes(payload.matchId)){
        mixedDishId.push(payload.matchId);
        mixedDishInfo[payload.matchId]= {
            ...chsDB[payload.choiceId],
        };
      }else{
        mixedDishInfo[payload.matchId] = {
          ...chsDB[payload.choiceId],
          matchId:payload.matchId,
          gamblingId:payload.gamblingId,
          choiceId:payload.choiceId,
        }
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
    changeCartStatus(state, { payload }) {
      return {
        ...state,
        showCart: payload,
      };
    },
  },
};
