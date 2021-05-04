import React, { Component } from 'react';
import { connect } from 'dva';

export const MixedDishItemHoc = (Wrapper) => {
  @connect(({ shopCart }) => ({
    shopCart,
  }))
  class MixedHoc extends Component {
    addMixedShopCart = (type, matchId, gamblingId, choiceId, id) => {
      const { dispatch, shopCart: { mixedDishId, mixedDishInfo } } = this.props;
      if (mixedDishId.includes(matchId) && mixedDishInfo[matchId].choiceId === choiceId) {
        dispatch({
          type: 'shopCart/delOneMixedBet',
          payload: matchId,
        });
      } else {
        /* 如果混合过关的购物车不包含这个matchId说明是选择混合过关的比赛场次增加，添加水波纹动画 */
        if (!mixedDishId.includes(matchId)) {
          const hooker1 = document.getElementById('betAnimateHooker1');
          const hooker2 = document.getElementById('betAnimateHooker2');
          hooker1.classList.add('bet-wave-animate1');
          hooker2.classList.add('bet-wave-animate2');
          setTimeout(() => {
            hooker1.classList.remove('bet-wave-animate1');
            hooker2.classList.remove('bet-wave-animate2');
          }, 800)
        }
        dispatch({
          type: 'shopCart/addMixedBetShopCart',
          payload: {
            type,
            sport: '1',
            dishId: id,
            matchId,
            gamblingId,
            choiceId,
          }
        });
      }
    };

    render() {
      return (
        <Wrapper {...this.props} addShopCart={this.addMixedShopCart} />
      );
    }
  }

  return MixedHoc;
};
