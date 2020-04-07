import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './matchList.scss';

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
      },
    });
  };

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
  }*/

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

    const cartChoiceId = this.props.shopCart.choiceId;

    return (
      <div
        className={styles.item}
        key={choiceId}
        onClick={() => this.addShopCart(1, matchId, gamblingId, choiceId, dishId)}
      >
        <span
          className={choiceId === cartChoiceId ? `${styles.price} ${styles.active}` : styles.price}
        >
          {choiceHandicap ? this.renderHandicap() : ''}
          <span className={styles.mun}>
            {dish}
          </span>
          </span>
    {/*    {this.renderUp()}*/}
      </div>
    );
  }
}

export default IndexDishItem;
