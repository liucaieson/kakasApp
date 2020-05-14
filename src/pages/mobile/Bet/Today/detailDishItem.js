import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './deatil.scss';
import { dishNameMap } from '@/utils/utils';

@connect(({ shopCart }) => ({
  shopCart
}))
class DetailDishItem extends PureComponent {
  state = {
    up: 0,
    prevDish: 0,
  };

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
      },
    });
  };

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

  renderTeamName() {
    const {
      name,
      homeName,
      awayName
    } = this.props;
    if (name === '1') {
      return homeName
    } if (name === '2') {
      return awayName
    }
      return dishNameMap[name]
  }

  render() {
    const {
      matchId,
      choiceId,
      gamblingId,
      dishId,
      dish,
      choiceHandicap,
      oddId,
      name
    } = this.props;

    const cartChoiceId = this.props.shopCart.choiceId;

    if (oddId === '15' || oddId === '16' || oddId === '3') {
      return (
        <div key={choiceId}
             className={styles.item1}
             onClick={() => this.addShopCart(1, matchId, gamblingId, choiceId, dishId)}
        >
          <div className={styles.name}>
            {
              this.renderTeamName()
            }
          </div>
          <div
            className={choiceId === cartChoiceId ? `${styles.dish} ${styles.active}` : styles.dish}
          >
             <span className={styles.handicap}>
            {choiceHandicap && `${choiceHandicap}`}
          </span>
            <span className={styles.mun}>
              {dish}
            </span>
          </div>
          {this.renderUp()}
        </div>
      );
    } if (oddId === '2' || oddId === '6') {
      return (
        <div key={choiceId}
             className={styles.item2}
             onClick={() => this.addShopCart(1, matchId, gamblingId, choiceId, dishId)}
        >

          <div className={choiceId === cartChoiceId ? `${styles.dish} ${styles.active}` : styles.dish}
          >
            <div className={styles.handicap}>
              {name}
            </div>
            <span className={styles.mun}>
              {dish}
            </span>
          </div>
          {this.renderUp()}
        </div>
      );
    }
      return (
        <div key={choiceId}
             className={styles.item3}
             onClick={() => this.addShopCart(1, matchId, gamblingId, choiceId, dishId)}
        >
          <div className={styles.name}>
            {
              this.renderTeamName()
            }
          </div>
          <div className={choiceId === cartChoiceId ? `${styles.dish} ${styles.active}` : styles.dish}
          >
             <span className={styles.handicap}>
            {choiceHandicap && `${choiceHandicap}`}
          </span>
            <span className={styles.mun}>
              {dish}
            </span>
          </div>
          {this.renderUp()}
        </div>
      );
  }
}

export default DetailDishItem;
