import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './matchList.scss';
import { MixedDishItemHoc } from '../Hoc/mixedDishItemHoc';


@MixedDishItemHoc
@connect(({ shopCart }) => ({
  shopCart,
}))
class IndexDishItem extends PureComponent {

  state = {
    up: 0,
    prevDish: 0,
  };

  /*static getDerivedStateFromProps(props, state) {
    if (state.prevDish === 0) {
      return {
        up: 0,
        prevDish: props.dish,
      };
    }
    if (props.dish > state.prevDish) {
      return {
        up: 1,
        prevDish: props.dish,
      };
    }
    if (props.dish < state.prevDish) {
      return {
        up: -1,
        prevDish: props.dish,
      };
    }
    return null;
  }*/

  /* 添加投注单到购物车
   * type =1 为单注， 2位混合过关
    * */
 /* addMixedShopCart = (type, matchId, gamblingId, choiceId, id) => {
    const { dispatch, shopCart : { mixedDishId, mixedDishInfo }  } = this.props;
    if (mixedDishId.includes(matchId) && mixedDishInfo[matchId].choiceId === choiceId ) {
      dispatch({
        type: 'shopCart/delOneMixedBet',
        payload: matchId
      });
    }else{
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
  };*/

 /* renderUp() {
    const { up } = this.state;
    if (up === 0) {
      return '';
    }
    if (up === 1) {
      return <div className={styles.up}/>;
    }
    if (up === -1) {
      return <div className={styles.down}/>;
    }
  }
*/
  renderHandicap() {
    const {
      choiceHandicap,
      name,
    } = this.props;
    if (name === 'Over') {
      return (<span className={styles.handicap}> <i className={styles.i}>大</i>{choiceHandicap}</span>);
    } else if (name === 'Under') {
      return (<span className={styles.handicap}> <i className={styles.i}>小</i>{choiceHandicap}</span>);
    } else {
      return (<span className={styles.handicap}> {choiceHandicap}</span>);
    }
  }

  render() {
    const {
      matchId,
      choiceId,
      gamblingId,
      choiceHandicap,
      dishId,
      dish,
    } = this.props;

    const {shopCart : { mixedDishId, mixedDishInfo }, addShopCart } = this.props;

    return (
      <div
        className={styles.item}
        key={choiceId}
        onClick={() => addShopCart( 2 , matchId, gamblingId, choiceId, dishId)}
      >
        <span
          className={( mixedDishInfo[matchId] &&  mixedDishInfo[matchId].choiceId === choiceId) ? `${styles.price} ${styles.active}` : styles.price}
        >
          {choiceHandicap ? this.renderHandicap() : ''}
          <span className={styles.mun}>
            {dish}
          </span>
        </span>
       {/* {this.renderUp()}*/}
      </div>
    );
  }
}

export default IndexDishItem;
