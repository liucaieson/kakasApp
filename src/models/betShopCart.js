/* 购物车逻辑 */
import { Toast } from 'antd-mobile';
import { postBetOrder,checkMatchStatus } from '@/services/api';

export default {
  namespace: 'betShopCart',
  // 购物车数据ids为盘口项的choiceId，list为以盘口项为key的obj。
  state: {
    shopCart: {
      ids:[],
      list:{}
    },
    // 混合过关的购物车数据ids为比赛的id，list为以比赛为key的obj。
    mixedShopCart:{
      ids:[],
      list:[]
    }
  },

  effects: {
    /* 检查是否有过期比赛 */
    *checkBetOrder({ payload, callback }, { call, put, select }) {
      if(payload.dishId === ''){
        return
      }
      let data = yield call(checkMatchStatus, payload);
      let ids = [];
      const list = {};
      data.forEach((val) => {
        ids.push(val.choiceId);
        list[val.choiceId] = {...val,amount:0}
      });
      const shopCartData = {
        ids,
        list
      };
      const chsListObj = {};
      data.forEach( v => {
        chsListObj[v.choiceId] = v;
      });
      /* 储存以choiceId为key的盘口竟猜项数据 */
      const chsDB = yield select( state => state.chsDB.chsDB);

      const newChsDB = {
        ...chsDB,
        ...chsListObj
      };

      yield put({
        type: 'chsDB/saveChsData',
        payload: newChsDB
      });

      yield put({
        type: 'save',
        payload:shopCartData
      });
    },
    /* 检查是否有过期比赛 */
    *checkMixedOrder({ payload, callback }, { call, put, select }) {
      if(payload.dishId === ''){
        return
      }
      let data = yield call(checkMatchStatus, payload);
      let ids = [];
      const list = {};
      data.forEach((val) => {
        ids.push(val.matchId);
        list[val.matchId] = {...val,amount:0}
      });
      const shopCartData = {
        ids,
        list
      };
      const chsListObj = {};
      data.forEach( v => {
        chsListObj[v.choiceId] = v;
      });
      /* 储存以choiceId为key的盘口竟猜项数据 */
      const chsDB = yield select( state => state.chsDB.chsDB);
      const newChsDB = {
        ...chsDB,
        ...chsListObj
      };
      yield put({
        type: 'chsDB/saveChsData',
        payload: newChsDB
      });

      yield put({
        type: 'saveMixed',
        payload:shopCartData
      });
    },

    /* 提交购物车投注单 */
    *postBetOrder({ payload, callback }, { call, put, select }) {
      let data = yield call(postBetOrder, payload);
      const shopCartData = yield select( state => state.betShopCart.shopCart);
      /* 200为投注成功 */
      if(data.code === 200){
        // 更新赔率
        const chsListObj = {};
        const chsDB = yield select( state => state.chsDB.chsDB);

        let ids = [];
        const list = {};
        data.data.map((val) => {
          // 不等于208标识错误交给购物车,并更新赔率
          if(val.code !== '208') {
            chsListObj[val.choiceId] = val;
            ids.push(val.choiceId);
            list[val.choiceId] = {
              ...shopCartData.list[val.choiceId],
              ...val
            }
          }
        });
        const newChsDB = {
          ...chsDB,
          ...chsListObj
        };
        yield put({
          type: 'chsDB/saveChsData',
          payload: newChsDB
        });
        yield put({
          type: 'save',
          payload: {
            ids,
            list
          }
        });
      /* 将返回的数据给视图层处理*/
        if(callback) callback(data.data)
      }else if(data.code === 3002){
        Toast.info('余额不足', 2);
      }else{
        Toast.info(data.message, 2);
      }
    },
    /* 提交购物车投注单 */
    *postMixedOrder({ payload, callback }, { call, put, select }) {
      let data = yield call(postBetOrder, payload);
      /* 200为投注成功 */
      if(data.code === 200){
        // 更新赔率
        let ids = [];
        const list = {};
        yield put({
          type: 'saveMixed',
          payload: {
            ids,
            list
          }
        });
        /* 将返回的数据给视图层处理*/
        if(callback) callback(data.data)
      }else if(data.code === 3002){
        Toast.info('余额不足', 2);
      }else{
        Toast.info(data.message, 2);
      }
    },
    /* 添加盘口项到购物车，购物车数据ids为盘口竞猜项的ids，list为以盘口竞猜项为key的obj。
     * 如果ids没有该盘口直接添加到购物车
     * 如果ids有该盘口，说明是一个盘口替换其中的盘口项
      * */
    *addBetShopCart({ payload, callback }, { call, put, select }) {
      const shopCartData = yield select( state => state.betShopCart.shopCart);
      if(shopCartData.ids.length > 5){
        Toast.success('购物车满了。。。请投注', 2);
        return
      }
      shopCartData.ids.push(payload.choiceId);
      shopCartData.list[payload.choiceId] = {
        amount:0,
        ...payload
      };
      yield put({
        type: 'save',
        payload:shopCartData
      });
      if(callback) callback()
    },
    /* 添加混合过关到购物车
    *  购物车数据ids为这场比赛的id，list为以比赛id为key的obj。
    */
    *addMixedShopCart({ payload, callback }, { call, put, select }) {
      const shopCartData = yield select( state => state.betShopCart.mixedShopCart);
      const firstIds = payload.matchId;
      const firstInfo = payload;
      if(shopCartData.ids.length === 6 && !shopCartData.ids.includes(firstIds)){
        Toast.info('最多选择6场', 2);
        return
      }
      // 判断ids里面是否含有比赛的id，没有就加入购物车，有就进行替换
      if(!shopCartData.ids.includes(firstIds)){
        shopCartData.ids.push(firstIds);
        shopCartData.list[firstIds] = {
          ...firstInfo,
        }
      }else{
        shopCartData.list[firstIds] = {
          matchId:firstInfo.matchId,
          gamblingId:firstInfo.gamblingId,
          choiceId:firstInfo.choiceId,
        }
      }
      yield put({
        type: 'saveMixed',
        payload:shopCartData
      });
      if(callback) callback()
    },
    /* 删除购物车的其中一项 删除过程中应该清除盘口列表中的高亮效果，这个写在了views层调用的函数中*/
    *delBetShopCart({ payload }, { call, put, select }) {
      const data = yield select( state => state.betShopCart.shopCart);
      const index = data.ids.indexOf(payload);
      if (index > -1) {
        delete data.list[payload];
        data.ids.splice(index, 1);
      }
      yield put({
        type: 'save',
        payload:data
      })
    },
    /* 删除混合过关购物车的其中一项 删除过程中应该清除盘口列表中的高亮效果*/
    *delMixedShopCart({ payload }, { call, put, select }) {
      const data = yield select( state => state.betShopCart.mixedShopCart);
      const index = data.ids.indexOf(payload);
      if (index > -1) {
        delete data.list[payload];
        data.ids.splice(index, 1);
      }
      yield put({
        type: 'saveMixed',
        payload:data
      })
    },
    /*修改投注金额,只有单注有*/
    *addShopCartItemAmount({ payload }, { call, put, select }) {
      const data = yield select( state => state.betShopCart.shopCart);
      data.list[payload.id].amount = payload.amount;
      yield put({
        type: 'save',
        payload:data
      })
    },
    /*清除购物车，并清除盘口列表的高亮效果*/
    *clearShopCart( _, { call, put,select }) {
      const data = yield select( state => state.betShopCart.shopCart);
      const newData = {
        ids:[],
        list:{}
      };
      yield put({
        type: 'save',
        payload:newData
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        shopCart: payload,
      };
    },
    saveMixed(state, { payload }) {
      return {
        ...state,
        mixedShopCart: payload,
      };
    },
  },
};
