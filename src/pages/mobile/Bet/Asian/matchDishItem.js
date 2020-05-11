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

  /* 根据传入的dish判断赔率变化 */
  static getDerivedStateFromProps(props, state) {
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
  }


  /**
   * 添加投注单到购物车
   * @param type type 1为单注 type2位混个过关
   * @param matchId 比赛id
   * @param gamblingId 盘口id
   * @param choiceId 竟猜项id
   * @param id 赔率id
   */
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

  /**
   * 渲染赔率变化
   * @returns {*}
   */
  renderUp() {
    const { up } = this.state;
    if (up === 1) {
      return <div className={styles.up}/>;
    }
    if (up === -1) {
      return <div className={styles.down}/>;
    }
    return null
  }

  /**
   * 对于大小盘口的名称做额外处理
   * @returns {*}
   */
  renderHandicap() {
    const {
      choiceHandicap,
      name,
    } = this.props;
    if (name === 'Over') {
      return (
        <span className={styles.handicap}>
          <i className={styles.i}>大</i>{choiceHandicap}
        </span>
      );
    } if (name === 'Under') {
      return (
        <span className={styles.handicap}>
          <i className={styles.i}>小</i>{choiceHandicap}
        </span>
      );
    }
      return (
        <span className={styles.handicap}>
          {choiceHandicap}
        </span>);
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
        {this.renderUp()}
      </div>
    );
  }
}

export default IndexDishItem;
