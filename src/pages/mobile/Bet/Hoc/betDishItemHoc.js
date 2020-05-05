import React, { PureComponent } from 'react';
import { connect } from 'dva';

export const BetDishItemHoc = (Wrapper) => {

  @connect(({ shopCart }) => ({
    shopCart
  }))
  class DishHoc extends PureComponent {
    /* 添加投注单到购物车 */
    addShopCart = (type, matchId, gamblingId, choiceId, id) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'shopCart/openCart',
      });
      dispatch({
        type: 'shopCart/addBetShopCart',
        payload: {
          type,
          sport: '1',
          dishId: id,
          matchId,
          gamblingId,
          choiceId,
        }
      });
    };

    render() {
      return (
        <Wrapper {...this.props} addShopCart={this.addShopCart}/>
      );
    }
  }

  return DishHoc

}
