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
        dispatch({
          type: 'shopCart/addMixedBetShopCart',
          payload: {
            type,
            sport: '1',
            dishId: id,
            matchId,
            gamblingId,
            choiceId,
          },
        });
      }
    };

    render() {
      return (
        <Wrapper {...this.props} addShopCart={this.addMixedShopCart}/>
      );
    }
  }

  return MixedHoc;
};

