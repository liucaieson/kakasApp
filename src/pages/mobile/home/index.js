import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd-mobile';
import Link from 'umi/link';
import styles from './index.scss';

@connect(({ loading, userInfo, shopCart }) => ({
  userInfo,
  shopCart,
}))
class Home extends PureComponent {

  timer = null;
  balanceTimer = null;
  state = {
    showId: 1,
    data: ['1', '2', '3'],
    imgHeight: 176,
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /*10s轮询余额，60s轮询比赛列表，首次请求赔率列表*/
  componentDidMount() {
    this.fetchArea();
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
    setTimeout(() => {
      this.setState({
        data: ['https://res.cloudinary.com/dwgybue2t/image/upload/v1581682664/ad_pw_05_cn_vdndya.jpg',
          'https://res.cloudinary.com/dwgybue2t/image/upload/v1581682659/ad_pw_03_cn_nr7gir.jpg',
          'https://res.cloudinary.com/dwgybue2t/image/upload/v1581682651/ad_pw_01_cn_svn8qh.jpg'],
      });
    }, 100);
  }

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.balanceTimer);
  }

  fetchArea = () => {
    let params = {
      sport: '1',
      gg: '1',
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'area/fetch',
      payload: params,
    });
  };

  /*获取better-scroll的this，赋值给scrollWrapChild
  * */
  onScrollWrapRef = (ref) => {
    this.scrollWrapChild = ref;
  };

  /* 控制盘口显示隐藏 */
  showArea = (id) => {
    const { showOdds } = this.state;
    showOdds.push(id);
    const arr = showOdds.concat();
    this.setState({
      showArea: arr,
    });
  };

  toggleGame = (id) => {
    this.setState({
      showId: id,
    });
  };

  openCart = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shopCart/openCart',
    });
  };


  render() {
    const {
      userInfo: { userName, balance },
      shopCart: { type, mixedDishId, choiceId },
    } = this.props;

    const { showId } = this.state;

    return (
      <div className={styles.home}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div className={styles.name}>您好</div>
            <div className={styles['acc-name']}>
              {userName}
            </div>
          </div>
          <div className={styles.right}>
            <span className={styles.rmb}>RMB</span>
            <span className={styles.balance}>{balance}</span>
          </div>
        </div>
        <Carousel
          autoplay={false}
          infinite
        >
          {this.state.data.map(val => (
            <a
              key={val}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>

        <div className={styles.main} ref={this.mainRef}>
          <div className={styles['game-tab']} onClick={() => this.toggleGame(1)}>
            <div className={styles.name}>
              滚球赛事
            </div>
          </div>
          {
            showId === 1 ? (
              <Link to='/bet/inPlay' className={styles['game-list']}>
                <div className={styles.item}>
                  <span className={styles.icon + ' ' + styles.ball}/>
                  <span className={styles.name}>足球</span>
                </div>
              </Link>
            ) : ''
          }
          <div className={styles['game-tab']} onClick={() => this.toggleGame(2)}>
            <div className={styles.name}>
              今日赛事
            </div>
          </div>
          {
            showId === 2 ? (
              <Link to='/bet/today' className={styles['game-list']}>
                <div className={styles.item}>
                  <span className={styles.icon + ' ' + styles.ball}/>
                  <span className={styles.name}>足球</span>
                </div>
              </Link>
            ) : ''
          }
          <div className={styles['game-tab']} onClick={() => this.toggleGame(3)}>
            <div className={styles.name}>
              早盘赛事
            </div>
          </div>
          {
            showId === 3 ? (
              <Link to='/bet/asian' className={styles['game-list']}>
                <div className={styles.item}>
                  <span className={styles.icon + ' ' + styles.ball}/>
                  <span className={styles.name}>足球</span>
                </div>
              </Link>
            ) : ''
          }
        </div>
        <div className={styles['line-box']}>
          <Link to='/bet/gameResult'>
            <div className={styles.line}>
              <div className={styles.name}>
                赛果
              </div>
            </div>
          </Link>
          <div className={styles.line}>
            <div className={styles.item}>亚洲盘</div>
            <Link to='/bet/announcement' className={styles.item}>公告</Link>
          </div>
          <div className={styles.line}>
            <Link to='/bet/help' className={styles.item}>帮助</Link>
            <div className={styles.item}>登出</div>
          </div>
        </div>

        <div className={styles.menu}>
          <div className={styles.nav}>
            <ul>
              <Link to='/' className={styles.item}>
                <i className={styles['icon-active'] + ' ' + styles.home}/>
                <span className={styles['text-active']}>首页</span>
              </Link>
              <Link to='/bet/live' className={styles.item}>
                <i className={styles.icon + ' ' + styles.live}/>
                <span className={styles.text}>直播表</span>
              </Link>

              <li
                className={(choiceId > 110 ? 1 : 0) + mixedDishId.length > 0 ? styles['item-bet'] + ' ' + styles.betActive
                  : styles['item-bet']}
                onClick={this.openCart}
              >
                  <span className={styles.cartNum}>{
                    type === 1 ? (choiceId > 110 ? '1' : 0) : mixedDishId.length
                  }</span>
                <span className={styles.text2}>交易单</span>
              </li>
              <Link to='/bet/accountHistory' className={styles.item}>
                <i className={styles.icon + ' ' + styles.history}/>
                <span className={styles.text}>账户历史</span>
              </Link>
              <Link to='/bet/transaction' className={styles.item}>
                <i className={styles.icon + ' ' + styles.accountRunning}/>
                <span className={styles.text}>交易状况</span>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
