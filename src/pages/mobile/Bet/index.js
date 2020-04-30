import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './index.scss';

@connect(({ loading, userInfo, shopCart }) => ({
  userInfo,
  shopCart,
}))
class Home extends PureComponent {

  timer = null;
  balanceTimer = null;

  /**
   * 是否展示顶部的header的菜单，是否展示注单显示区域的波浪动画，混合过关的注单数量（用来决定波浪动画是否显示）
   * @type {{showMenu: boolean, showAnimate: boolean, preMixedLength: number}}
   */
  state = {
    showMenu: false,
    showAnimate: false,
    preMixedLength: 0,
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /*10s轮询余额，60s轮询比赛列表，首次请求赔率列表*/
  componentDidMount() {
    const { location, history } = this.props;
    const { pathname } = location;
    if (pathname.includes('inPlay')) {
      this.setState({
        tab: 'inPlay',
      });
    }
    if (pathname.includes('today')) {
      this.setState({
        tab: 'today',
      });
    }
    if (pathname.includes('asian')) {
      this.setState({
        tab: 'asian',
      });
    }
    if (pathname.includes('accountHistory')) {
      this.setState({
        tab: 'accountHistory',
      });
    }
    if (pathname.includes('transaction')) {
      this.setState({
        tab: 'transaction',
      });
    }
    if (pathname.includes('transaction')) {
      this.setState({
        tab: 'live',
      });
    }

    history.listen((location, action) => {
      const { pathname } = location;
      if (pathname.includes('inPlay')) {
        this.setState({
          tab: 'inPlay',
        });
      }
      if (pathname.includes('today')) {
        this.setState({
          tab: 'today',
        });
      }
      if (pathname.includes('asian')) {
        this.setState({
          tab: 'asian',
        });
      }
      if (pathname.includes('accountHistory')) {
        this.setState({
          tab: 'accountHistory',
        });
      }
      if (pathname.includes('transaction')) {
        this.setState({
          tab: 'transaction',
        });
      }
      if (pathname.includes('live')) {
        this.setState({
          tab: 'live',
        });
      }
    });
    this.requestBalance();
  }

  /*  static getDerivedStateFromProps(props, state) {
      if (props.shopCart.mixedDishId.length > state.preMixedLength) {
        return {
          showAnimate: true,
          preMixedLength: props.shopCart.mixedDishId.length
        };
      }else{
        return {
          showAnimate: false,
          preMixedLength: props.shopCart.mixedDishId.length
        };
      }
    }*/

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.balanceTimer);
  }

  /* fetchArea = () => {
     let params = {
       sport: '1',
       gg: '1'
     };
     const { dispatch } = this.props;
     dispatch({
       type: 'area/fetch',
       payload: params,
     });
   };*/

  requestBalance = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  };

  goBack = () => {
    const { history } = this.props;
    history.go(-1);
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  openCart = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shopCart/openCart',
    });
  };

  renderAnimate() {

  }

  render() {
    const { tab, showMenu, showAnimate } = this.state;
    const {
      userInfo: { userName, balance },
      shopCart: { type, mixedDishId, choiceId },
      children,
    } = this.props;
    return (
      <div className={styles.bet} id='betContainer'>
        <div className={styles.header}>
          <div className={styles.back}
               onClick={this.goBack}
          >
            <div className={styles['back-icon']}/>
          </div>
          <Link to='/bet/inPlay'
                className={tab === 'inPlay' ? `${styles['header-tab']} ${styles.active}` : styles['header-tab']}
          >
            滚球
          </Link>
          <Link to='/bet/today'
                className={tab === 'today' ? `${styles['header-tab']} ${styles.active}` : styles['header-tab']}
          >
            今日
          </Link>
          <Link to='/bet/asian'
                className={tab === 'asian' ? `${styles['header-tab']} ${styles.active}` : styles['header-tab']}
          >
            早盘
          </Link>
          <div className={styles['header-menu-icon']} onClick={this.toggleMenu}>
            <span className={styles['menu-icon']}/>
          </div>
        </div>
        {
          showMenu ? (
            <div className={styles['header-menu']}>
              <div className={styles.info}>
                <div className={styles.left}>{userName}</div>
                <div className={styles.right}>
                  <span className={styles.rmb}>RMB</span>
                  <span className={styles.balance}>
                  {balance}
                  </span>
                  <span className={styles.icon} onClick={this.requestBalance}/>
                </div>
              </div>
              <div className={styles.line}>
                <div className={styles.item}>亚洲盘</div>
                <Link to='/bet/announcement' className={styles.item}>公告</Link>
              </div>
              <div className={styles.line}>
                <Link to='/bet/help' className={styles.item}>帮助</Link>
                <div className={styles.item}>登出</div>
              </div>
            </div>
          ) : ''
        }
        <div className={styles.main} ref={this.mainRef}>
          {children}
        </div>
        <div className={styles.menu}>
          <div className={styles.nav}>
            <ul>
              <Link to='/' className={styles.item}>
                <i className={styles.icon + ' ' + styles.home}/>
                <span className={styles.text}>首页</span>
              </Link>
              <Link to='/bet/live' className={styles.item}>
                {
                  tab === 'live' ?
                    <Fragment>
                      <i className={`${styles.live} ${styles.icon} ${styles.active}`}/>
                      <span className={styles.text + ' ' + styles.active}>直播表</span>
                    </Fragment>
                    :
                    <Fragment>
                      <i className={`${styles.icon} ${styles.live}`}/>
                      <span className={styles.text}>直播表</span>
                    </Fragment>
                }
              </Link>
              <li
                className={(choiceId > 110 ? 1 : 0) + mixedDishId.length > 0 ? styles['item-bet'] + ' ' + styles.betActive : styles['item-bet']}
                onClick={this.openCart}
              >
                <span className={styles.cartNum}>
                  {type === 1 ? (choiceId > 110 ? '1' : 0) : mixedDishId.length}
                </span>
                <span className={styles.text2}>交易单</span>
                <div className={styles['item-bet-animate']} >
                  <div className={styles.circle1} id='betAnimateHooker1' />
                  <div className={styles.circle2} id='betAnimateHooker2' />
                </div>
              </li>
              <Link to='/bet/accountHistory' className={styles.item}>
                <i
                  className={tab === 'accountHistory' ? `${styles.icon} ${styles.history} ${styles.active}` : styles.icon + ' ' + styles.history}/>
                <span className={tab === 'accountHistory' ? styles.text + ' ' + styles.active : styles.text}>账户历史</span>
              </Link>
              <Link to='/bet/transaction' className={styles.item}>
                <i
                  className={tab === 'transaction' ? `${styles.icon} ${styles.accountRunning} ${styles.active}` : styles.icon + ' ' + styles.accountRunning}/>
                <span className={tab === 'transaction' ? styles.text + ' ' + styles.active : styles.text}>交易状况</span>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
