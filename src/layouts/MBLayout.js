import React, { PureComponent, Fragment } from 'react';
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import '@/layouts/nprogress.less';
import { LocaleProvider } from 'antd-mobile';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import styles from './index.scss';
import Slide from '../components/slideAnimate';
import { dishNameMap } from '../utils/utils';

NProgress.configure({ showSpinner: false });

// 底部有bar菜单
let currHref = '';

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
};

@connect(({ loading, userInfo, shopCart, chsDB }) => ({
  userInfo,
  shopCart,
  chsDB,
}))
class BasicLayout extends PureComponent {

  state = {
    isLogin: false,
    showCart: false,
  };

  timer = null;
  timer1 = null;

  componentDidMount() {
    const { dispatch, location } = this.props;
    const { query } = location;
    const { accessCode } = query;
    const code = sessionStorage.getItem('accessCode');
    if (code && code !== 'faeb2ead70b74948ae3b7c4cd73243f1') {
      /* Modal.alert(
          '亚冠体育',
          '欢迎来到亚冠体育'
       );*/
      this.timer = setInterval(this.getUserInfo, 30000);
    } else if (accessCode !== undefined) {
      sessionStorage.setItem('accessCode', accessCode);
      /* Modal.alert(
         '亚冠体育',
         '欢迎来到亚冠体育'
       );*/
      this.timer = setInterval(this.getUserInfo, 30000);
    } else {
      sessionStorage.setItem('accessCode', 'faeb2ead70b74948ae3b7c4cd73243f1');
      /* Modal.alert(
         '亚冠体育',
        '欢迎来到亚冠体育,当前为试玩账号'
       );*/
      this.getUserInfo();
    }

  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  /*请求用户余额接口*/
  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  };

  closeShopCart = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shopCart/closeCart',
    });
  };

  hideCart = () => {
    this.setState({
      showCart: false,
    });
  };


  render() {
    const {
      children, location, loading,
      userInfo: { userName, balance },
      shopCart: { showCart, mixedDishId, mixedDishInfo, type, dishInfo },
      chsDB: { chsDB },
    } = this.props;
    const { href } = window.location; // 浏览器地址栏中地址
    if (currHref !== href) {
      // currHref 和 href 不一致时说明进行了页面跳转
      NProgress.start(); // 页面开始加载时调用 start 方法
      if (!loading.global) {
        // loading.global 为 false 时表示加载完毕
        NProgress.done(); // 页面请求完毕时调用 done 方法
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }

    return (
      <LocaleProvider locale={zh_CN}>
        <div className={styles.index} key='home'>
          <div className={styles.topUnderContent}>
            <div className={styles.main}>
              <div style={{ overflowX: 'hidden', height: '100%' }}>
                {children}
              </div>
            </div>
          </div>
          {
            showCart ? (<div className={styles['mask-layer']}/>) : ''
          }
          <Slide come={showCart}
                 clsName="downSlides"
          >
            <div className={styles['bet-order']}>
              {
                type === 1 ?
                  <div className={styles['money-wrap']}>
                    <div className={styles.header}>
                      <div className={styles['trade-name']}>竞猜单</div>
                      <div className={styles.balance}>
                        余额：{balance}
                      </div>
                      <div className={styles.close} onClick={this.closeShopCart}>
                        <Icon type='cross' className={styles.closeBet}/>
                      </div>
                    </div>
                    <div className={styles.content}>
                      <div className={styles['bet-info']}>
                        <div className={styles.info}>
                          <div className={styles.type}>
                            <span className={styles.name}>足球</span>
                            <span className={styles.score}>（{dishInfo.oddName}）</span>
                          </div>
                          <div className={styles.competitions}>
                            {dishInfo.cptName}
                          </div>
                          <div className={styles.team}>
                            <span className={styles.name}>{dishInfo.homeName} vs {dishInfo.awayName}</span>

                          </div>
                        </div>
                        <div className={styles.choose}>
                          {chsDB[dishInfo.choiceId] && dishNameMap[chsDB[dishInfo.choiceId].name]}
                          <span className={styles.handicap}>{dishInfo.choiceHandicap}</span>
                          @
                          <span className={styles.odds}>
                        {dishInfo.choiceId &&
                        chsDB[dishInfo.choiceId].dish}
                      </span>
                        </div>
                        {
                          dishInfo.code === '3001' || dishInfo.code === '2111' ?
                            <div className={styles['bet-input']}>
                              该投注项当前不可投注：{dishInfo.message}
                            </div> :
                            <div className={styles['bet-input']}>
                              <div className={styles.left}>
                                <div className={styles.num}>11</div>
                                <div className={styles.clearNum}/>
                              </div>
                              <div className={styles.right}>
                                <div className={styles.high}>最低投注:<i>50</i></div>
                                <div className={styles.high}>最大投注:<i>30000</i></div>
                              </div>
                            </div>
                        }
                      </div>
                    </div>
                    <div className={styles.winMoney}>
                      <div className={styles['line-box']}>
                        <div className={styles.line}>
                          <div className={styles.text}>可赢金额</div>
                          <div className={styles.money}>20.00</div>
                        </div>
                      </div>
                    </div>
                    {
                      dishInfo.code !== '200' && <div className={styles.warning}>
                        <div className={styles['line-box']}>
                          <div className={styles.line}>
                            {dishInfo.message}
                          </div>
                        </div>
                      </div>
                    }
                    <div className={styles.bottom}>
                      <div className={styles.del}>全删除</div>
                      <div className={styles.setting}/>
                      <div className={styles.button}>
                        <div className={styles.text}>0.00</div>
                        <div className={styles.text}>投注</div>
                      </div>
                    </div>
                  </div> :
                  <div className={styles['money-wrap']}>
                    <div className={styles.header}>
                      <div className={styles['trade-name']}>竞猜单</div>
                      <div className={styles.balance}>
                        余额：{balance}
                      </div>
                      <div className={styles.close} onClick={this.closeShopCart}>
                        <Icon type='cross' className={styles.closeBet}/>
                      </div>
                    </div>
                    <div className={styles.content}>
                      <div className={styles['bet-info']}>
                        {
                          mixedDishId.map((val) => (
                            <Fragment key={val}>
                              <div className={styles.info}>
                                <div className={styles.type}>
                                  <span className={styles.name}>足球</span>
                                  <span className={styles.score}>（{val.oddName}）</span>
                                </div>
                                <div className={styles.competitions}>
                                  {val.cptName}
                                </div>
                                <div className={styles.team}>
                                  <span className={styles.name}>{val.homeName} vs {val.awayName}</span>
                                </div>
                              </div>
                              <div className={styles.choose}>
                                {chsDB[val.choiceId] && dishNameMap[chsDB[val.choiceId].name]}
                                <span className={styles.handicap}>{val.choiceHandicap}</span>
                                @
                                <span className={styles.odds}>
                                {val.choiceId &&
                                chsDB[val.choiceId].dish}
                              </span>
                              </div>
                            </Fragment>
                          ))
                        }
                      {/*  {
                          dishInfo.code === '3001' || dishInfo.code === '2111' ?
                            <div className={styles['bet-input']}>
                              该投注项当前不可投注：{dishInfo.message}
                            </div> :
                            <div className={styles['bet-input']}>
                              <div className={styles.left}>
                                <div className={styles.num}>11</div>
                                <div className={styles.clearNum}/>
                              </div>
                              <div className={styles.right}>
                                <div className={styles.high}>最低投注:<i>50</i></div>
                                <div className={styles.high}>最大投注:<i>30000</i></div>
                              </div>
                            </div>
                        }*/}
                      </div>
                    </div>
                    <div className={styles.winMoney}>
                      <div className={styles['line-box']}>
                        <div className={styles.line}>
                          <div className={styles.text}>可赢金额</div>
                          <div className={styles.money}>20.00</div>
                        </div>
                      </div>
                    </div>
                    {
                      dishInfo.code !== '200' && <div className={styles.warning}>
                        <div className={styles['line-box']}>
                          <div className={styles.line}>
                            {dishInfo.message}
                          </div>
                        </div>
                      </div>
                    }
                    <div className={styles.bottom}>
                      <div className={styles.del}>全删除</div>
                      <div className={styles.setting}/>
                      <div className={styles.button}>
                        <div className={styles.text}>0.00</div>
                        <div className={styles.text}>投注</div>
                      </div>
                    </div>
                  </div>
              }


            </div>
          </Slide>
        </div>
      </LocaleProvider>
    );
  }
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(BasicLayout));
