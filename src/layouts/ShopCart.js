import React, { PureComponent } from 'react';
import BetShopCart from './BetShopCart';
import MixedShopCart from './MixedShopCart'
import styles from './shopCart.scss';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

@connect(({ userInfo, betShopCart }) => ({
  userInfo,
  betShopCart
}))
class BettingSection extends PureComponent {

  state = {
    tab:'bets'
  };

  constructor(){
    super();
    const initWindowheigth = window.innerHeight;
    const warpDiv = document.querySelector('body');
    warpDiv.style.minHeight = initWindowheigth + 'px';
  }


  componentDidMount(){
    const { dispatch, location } = this.props;
    const {pathname} = location;
    if(pathname.includes('mixed')){
      this.setState({
        tab: 'mixed'
      })
    }
    dispatch({
      type: 'userInfo/fetch',
    });
  }

  toggleTabs= (tab) => {
   this.setState({
     tab
   })
  };

  hideCart = () => {
    const {hideCartFn} = this.props;
    hideCartFn()
  };

  render() {
    const { tab } = this.state;
    const { userInfo: { balance },
      betShopCart: {shopCart, mixedShopCart}
    } = this.props;
    return (
      <div className={styles.betting} >
        <div className={styles.header}>
          <span className={styles.name}>注单</span>
          <span className={styles.balance}>余额：{balance}</span>
          <span className={styles.down} onClick={this.hideCart}>返回</span>
        </div>
        <div className={styles.tabs}>
          <div
            className={tab === 'bets'? `${styles['bet-tabs']} ${styles.active}` : styles['bet-tabs']}
            onClick={() => this.toggleTabs('bets')}>单注
            {
              shopCart.ids && shopCart.ids.length !== 0
              && <span className={styles.badge}>{shopCart.ids.length}</span>
            }
          </div>
          <div
            className={tab === 'mixed'? `${styles['bet-tabs']} ${styles.active}` : styles['bet-tabs']}
            onClick={() => this.toggleTabs('mixed')} >混合过关
            { mixedShopCart.ids && mixedShopCart.ids.length !==0 && <span className={styles.badge}>{mixedShopCart.ids.length}</span>}
          </div>
        </div>
          {
            tab === 'bets' ?
              <BetShopCart /> :
              <MixedShopCart />
          }
      </div>
    );
  }
}

export default  withRouter(BettingSection);
