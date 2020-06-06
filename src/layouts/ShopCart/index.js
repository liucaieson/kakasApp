import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, Toast } from 'antd-mobile';
import styles from './index.scss';
import { dishNameMap, betTypeMap } from '../../utils/utils';

import Loading from '@/components/LoadingMask';

@connect(({ loading, userInfo, shopCart, chsDB }) => ({
  userInfo,
  shopCart,
  chsDB,
  submitBetLoading: loading.effects['shopCart/postBetOrder'],
  submitMixedLoading: loading.effects['shopCart/postMixedOrder'],
  checkBetLoading: loading.effects['shopCart/checkBetOrder'],
  checkMixedLoading: loading.effects['shopCart/checkMixedOrder'],
}))
class ShopCart extends PureComponent {
  /**
   * @type {{showCart: boolean 购物撤隐藏显示,
   * showKeyboard: boolean 模拟键盘的隐藏显示,
   * money: string 输入的金额,
   * resData: Array 返回的订单详细信息是一个数组,
   * showFinishBets: boolean 下注完毕展示注单的详细信息,
   * showSetting: boolean 展示按照最新赔率的提示信息}}
   */
  state = {
    showKeyboard: false,
    money: '',
    resData: [],
    showFinishBets: false,
    showSetting: false,
    betType: 1,
    orderText: '下注成功',
  };

  timer = null;

  componentDidMount() {
    this.checkBetOrder();
  }

  checkBetOrder = () => {
    /* 单注传一个dishID,混合传多个dishId组成字符串 */
    const {
      dispatch,
      shopCart: { type, choiceId, mixedDishId, mixedDishInfo },
      chsDB: { chsDB },
    } = this.props;
    if (choiceId < 100 && mixedDishId.length < 1) {
      return;
    }
    const dishId = [];
    if (type === 1) {
      dispatch({
        type: 'shopCart/checkBetOrder',
        payload: {
          sport: '1',
          dishId: chsDB[choiceId].dishId,
        },
      });
    } else {
      mixedDishId.forEach((val) => {
        const choice = mixedDishInfo[val].choiceId;
        dishId.push(chsDB[choice].dishId);
      });
      dispatch({
        type: 'shopCart/checkMixedOrder',
        payload: {
          sport: '1',
          dishId: dishId.join(','),
        },
      });
    }
  };

  /* 请求用户余额接口 */
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
    this.setState({
      showFinishBets: false,
    });
  };

  hideKeyboard = () => {
    this.setState({
      showKeyboard: false,
    });
  };

  openKeyboard = (e) => {
    e.stopPropagation();
    this.setState({
      showKeyboard: true,
    });
  };

  /*
   *输入软键盘的1-9
   */
  addMoney = (num) => {
    let { money } = this.state;
    if (money.length >= 6) {
      return;
    }
    money = `${money + num}`;
    this.setState({
      money,
    });
  };

  /**
   * 充值money
   */
  delMoney = () => {
    this.setState({
      money: '',
    });
  };

  /**
   * 回退键，回退money
   */
  backMoney = () => {
    let { money } = this.state;
    if (money <= 0) {
      return;
    }
    money += '';
    money = money.substring(0, money.length - 1);
    this.setState({
      money,
    });
  };

  /**
   * 输入软键盘大额数字设置金额
   * @param num
   */
  setMoney = (num) => {
    const { money } = this.state;
    if (money.length >= 7) {
      return;
    }
    this.setState({
      money: +money + num,
    });
  };

  /**
   * 删除所有投注单
   */
  allDel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shopCart/delAllShopCart',
    });
  };

  delOneMixedBet = (matchId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shopCart/delOneMixedBet',
      payload: matchId,
    });
  };

  /**
   * 切换展示信息
   */
  toggleSetting = () => {
    const { showSetting } = this.state;
    this.setState({
      showSetting: !showSetting,
    });
  };

  /**
   * 投注单注
   */
  postBet = () => {
    const { dispatch } = this.props;
    const { money } = this.state;
    if (money >= 50 && money <= 30000) {
      dispatch({
        type: 'shopCart/postBetOrder',
        payload: money,
        callback: (data) => {
          this.getUserInfo();
          this.setState({
            showKeyboard: false,
            money: '',
          });
          if (data[0].code === '208') {
            /* this.closeShopCart(); */
            Toast.info('投注成功', 1);
            this.setState({
              showFinishBets: true,
              resData: data,
              orderText: '下注成功',
            });
          }
        },
      });
    } else if (money > 30000) {
      Toast.info('超过最大投注限额', 1.5);
    } else {
      Toast.info('最少投注50元', 1.5);
    }
  };

  /**
   * 投注混合过关
   */
  postMixedBet = () => {
    const {
      dispatch, shopCart: { mixedDishId, mixedDishInfo },
    } = this.props;
    const { money } = this.state;
    for (let i = 0; i < mixedDishId; i += 1) {
      if (mixedDishInfo[mixedDishId[i]].code !== '208' &&
        mixedDishInfo[mixedDishId[i]].code !== '200') {
        Toast.info('请删除无法下注的比赛', 2);
        return;
      }
    }
    if (money >= 50 && money <= 30000) {
      const betType = mixedDishId.length;
      dispatch({
        type: 'shopCart/postMixedOrder',
        payload: money,
        callback: (data) => {
          this.getUserInfo();
          let successOrderNum = 0;
          data.forEach((item) => {
            if (item.code === '208') {
              successOrderNum += 1;
            }
          });

          if (successOrderNum === data.length) {
            this.setState({
              showFinishBets: true,
              resData: data,
              betType,
              orderText: '下注成功',
              showKeyboard: false,
              money: '',
            });
            Toast.info('投注成功', 1.5);
          } else {
            this.setState({
              showFinishBets: false,
              resData: data,
              betType,
              orderText: '下注失败',
              showKeyboard: false,
              money: '',
            });
            Toast.info('投注失败', 1.5);
          }

          /* this.closeShopCart(); */

        },
      });
    } else if (money > 30000) {
      Toast.info('超过最大投注限额', 1.5);
    } else {
      Toast.info('最少投注50元', 1.5);
    }
  };

  /* 渲染提示文字 */
  renderSetting = () => (
    <div className={styles.setting}>
      <div className={styles.icon}/>
      系统将接受服务器最新赔率
    </div>
  );

  renderBetOrMixed() {
    const {
      shopCart: { mixedDishId, mixedDishInfo, type, dishInfo },
      chsDB: { chsDB },
    } = this.props;
    const { showKeyboard, money, showSetting } = this.state;
    let mixedAllOdds = 0;
    let mixErrTips = false;
    mixedDishId.forEach((val) => {
      mixedAllOdds += +chsDB[mixedDishInfo[val].choiceId].dish;
      if (mixedDishInfo[val].code !== '208' && mixedDishInfo[val].code !== '200') {
        mixErrTips = true;
      }
    });
    if (type === 1) {
      return (
        <div className={styles.betsBox}>
          <div className={styles.content} onClick={this.hideKeyboard}>
            <div className={styles['bet-info']}>
              <div className={styles.infoBox}>
                <div className={styles.info}>
                  <div className={styles.type}>
                    <span className={styles.name}>足球</span>
                    <span className={styles.score}>（{dishInfo.oddName}）</span>
                  </div>
                  <div className={styles.competitions}>
                    {dishInfo.cptName}
                  </div>
                  <div className={styles.team}>
                    <span className={styles.name}>
                      {dishInfo.homeName} vs {dishInfo.awayName}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.choose}>
                {chsDB[dishInfo.choiceId] && dishNameMap[chsDB[dishInfo.choiceId].name]}
                <span className={styles.handicap}>
                  {dishInfo.choiceHandicap}
                </span>
                @
                <span className={styles.odds}>
                   {dishInfo.choiceId && chsDB[dishInfo.choiceId] &&
                   chsDB[dishInfo.choiceId].dish}
                </span>
              </div>
            </div>
          </div>
          {
            dishInfo.code === '3001' || dishInfo.code === '2111' ?
              null :
              <Fragment>
                <div className={styles['input-container']}>
                  <div className={styles['bet-input']}>
                    <div className={styles.left} onClick={this.openKeyboard}>
                      <div className={styles.num}>{money}</div>
                      <div className={styles.clearNum} onClick={this.delMoney}/>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.high}>最低投注:<i>50</i></div>
                      <div className={styles.high}>最大投注:<i>30000</i></div>
                    </div>
                  </div>
                </div>
              <div className={styles.winMoney} onClick={this.hideKeyboard}>
                <div className={styles['line-box']}>
                  <div className={styles.line}>
                    <div className={styles.text}>可赢金额</div>
                    <div className={styles.money}>
                      {chsDB[dishInfo.choiceId] &&
                      (chsDB[dishInfo.choiceId].dish * money).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              </Fragment>
          }
          {
            dishInfo.code !== '200' && <div className={styles.warning}>
              <div className={styles['line-box']}>
                <div className={styles.line}>
                  注意：{dishInfo.message}
                </div>
              </div>
            </div>
          }
          {
            showKeyboard ?
              <div className={styles.betKeyboard}>
                <div className={styles.numBox}>
                  <div className={styles.num} onClick={() => this.addMoney(1)}>1</div>
                  <div className={styles.num} onClick={() => this.addMoney(2)}>2</div>
                  <div className={styles.num} onClick={() => this.addMoney(3)}>3</div>
                  <div className={styles.num} onClick={() => this.addMoney(4)}>4</div>
                  <div className={styles.num} onClick={() => this.addMoney(5)}>5</div>
                  <div className={styles.num} onClick={() => this.addMoney(6)}>6</div>
                  <div className={styles.num} onClick={() => this.addMoney(7)}>7</div>
                  <div className={styles.num} onClick={() => this.addMoney(8)}>8</div>
                  <div className={styles.num} onClick={() => this.addMoney(9)}>9</div>
                  <div className={styles.num} />
                  <div className={styles.num} onClick={() => this.addMoney(0)}>0</div>
                  <div className={styles.delNum} onClick={this.backMoney}/>
                </div>
                <div className={styles.quickBox}>
                  <div className={styles.add} onClick={() => this.setMoney(100)}>+100</div>
                  <div className={styles.add} onClick={() => this.setMoney(200)}>+200</div>
                  <div className={styles.add} onClick={() => this.setMoney(500)}>+500</div>
                  <div className={styles.add} onClick={() => this.setMoney(1000)}>+1000</div>
                </div>
            </div> : ''
          }
          {
            showSetting ?
              this.renderSetting()
              : ''
          }
          <div className={styles.bottom}>
            <div className={styles.del} onClick={this.allDel}>全删除</div>
            <div className={styles.setting} onClick={this.toggleSetting}/>
            <div className={styles.button} onClick={this.postBet}>
              <div className={styles.text}>{money}</div>
              <div className={styles.text}>投注</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.betsBox}>
        <div className={styles.content} onClick={this.hideKeyboard}>
          <div className={styles['bet-info']}>
            {
              mixedDishId.map((val) => (
                <div
                  key={val.dishId}
                  className={(mixedDishInfo[val].code === '200' || mixedDishInfo[val].code === '208') ?
                    styles.infoBox :
                    `${styles.infoBox} ${styles['err-match']}`
                  }
                >
                  <div className={styles.info}>
                    <div className={styles.type}>
                      <span className={styles.name}>足球</span>
                      <span className={styles.score}>（{mixedDishInfo[val].oddName}）</span>
                    </div>
                    <div className={styles.competitions}>
                      {mixedDishInfo[val].cptName}
                    </div>
                    <div className={styles.team}>
                        <span className={styles.name}>
                          {mixedDishInfo[val].homeName} vs {mixedDishInfo[val].awayName}
                        </span>
                    </div>
                  </div>
                  <div className={styles.delMixed} onClick={() => this.delOneMixedBet(val)}/>
                  <div className={styles.choose}>
                    {
                      chsDB[mixedDishInfo[val].choiceId] &&
                      dishNameMap[chsDB[mixedDishInfo[val].choiceId].name]
                    }
                    <span className={styles.handicap}>{mixedDishInfo[val].choiceHandicap}</span>
                    @
                    <span className={styles.odds}>
                        {
                          mixedDishInfo[val].choiceId &&
                          chsDB[mixedDishInfo[val].choiceId].dish
                        }
                      </span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className={styles['input-container']}>
          {
            mixedDishId.length > 1 ? (
                mixErrTips ?
                  <div className={styles['error-box']}>
                    <div className={styles.error}/>
                    <div className={styles.message}>
                      注意：部分比赛无法投注
                    </div>
                  </div>
                  :
                  <div className={styles['bet-input']}>
                    <div className={styles.left} onClick={this.openKeyboard}>
                      <div className={styles.num}>{money}</div>
                      <div className={styles.clearNum} onClick={this.delMoney}/>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.high}>最低投注:<i>50</i></div>
                      <div className={styles.high}>最大投注:<i>30000</i></div>
                    </div>
                  </div>
              )
              : <div className={styles['error-box']}>
                <div className={styles.error}/>
                <div className={styles.message}>
                  混合过关-需要选择最少2个投注
                </div>
              </div>
          }
        </div>
        <div className={styles.winMoney} onClick={this.hideKeyboard}>
          <div className={styles['line-box']}>
            <div className={styles.line}>
              <div className={styles.text}>可赢金额</div>
              <div className={styles.money}>{(mixedAllOdds * money).toFixed(2)}</div>
            </div>
          </div>
        </div>
        {
          showKeyboard ? <div className={styles.betKeyboard}>
            <div className={styles.numBox}>
              <div className={styles.num} onClick={() => this.addMoney(1)}>1</div>
              <div className={styles.num} onClick={() => this.addMoney(2)}>2</div>
              <div className={styles.num} onClick={() => this.addMoney(3)}>3</div>
              <div className={styles.num} onClick={() => this.addMoney(4)}>4</div>
              <div className={styles.num} onClick={() => this.addMoney(5)}>5</div>
              <div className={styles.num} onClick={() => this.addMoney(6)}>6</div>
              <div className={styles.num} onClick={() => this.addMoney(7)}>7</div>
              <div className={styles.num} onClick={() => this.addMoney(8)}>8</div>
              <div className={styles.num} onClick={() => this.addMoney(9)}>9</div>
              <div className={styles.num}/>
              <div className={styles.num} onClick={() => this.addMoney(0)}>0</div>
              <div className={styles.delNum} onClick={this.backMoney}/>
            </div>
            <div className={styles.quickBox}>
              <div className={styles.add} onClick={() => this.setMoney(100)}>+100</div>
              <div className={styles.add} onClick={() => this.setMoney(200)}>+200</div>
              <div className={styles.add} onClick={() => this.setMoney(500)}>+500</div>
              <div className={styles.add} onClick={() => this.setMoney(1000)}>+1000</div>
            </div>
          </div> : ''
        }
        {/*  {
                      dishInfo.code !== '200' &&
                      <div className={styles.warning}>
                        <div className={styles['line-box']}>
                          <div className={styles.line}>
                            {dishInfo.message}
                          </div>
                        </div>
                      </div>
                    } */}
        {
          showSetting ? this.renderSetting() : ''
        }
        <div className={styles.bottom}>
          <div className={styles.del} onClick={this.allDel}>全删除</div>
          <div className={styles.setting} onClick={this.toggleSetting}/>
          <div className={styles.button} onClick={this.postMixedBet}>
            <div className={styles.text}>{money}</div>
            <div className={styles.text}>投注</div>
          </div>
        </div>
      </div>
    );
  }

  renderFinish() {
    const { shopCart: { type } } = this.props;
    const { resData, showFinishBets, betType, orderText } = this.state;
    if (showFinishBets) {
      if (type === 1) {
        return (
          <div className={styles.success}>
            {
              resData && resData.map((val) => (
                  <div className={styles['bet-info']} key={val.dishId}>
                    <div className={styles.infoBox}>
                      <div className={styles.flag}>
                        <i className={styles.icon}/>
                        {
                          val.typeFlag === 2 ? '注单待确认（滚球请到交易记录确认是否下注成功）' : '下注成功'
                        }
                      </div>
                      <div className={styles.info}>
                        <div className={styles.type}>
                          <span className={styles.name}>足球</span>
                          <span className={styles.score}>（{val.oddName}）</span>
                        </div>
                        <div className={styles.competitions}>
                          {val.cptName}
                        </div>
                        <div className={styles.team}>
                                          <span className={styles.name}>
                                            {val.homeName} vs {val.awayName}
                                            </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.choose}>
                      <span className={styles.handicap}>{val.choiceHandicap}</span>
                      @
                      <span className={styles.odds}>
                                        {val.dish}
                                      </span>
                    </div>
                  </div>
                ),
              )
            }
            <div className={styles['bet-amount']}>
              总投注额：{resData[0].money}
            </div>
            <div className={styles.button} onClick={this.closeShopCart}>
              继续投注
            </div>
          </div>
        );
      }
      if (type === 2) {
        return (
          <div className={styles.success}>
            <div className={styles['finish-title']}>
              <i className={styles.icon}/>
              <div className={styles.text1}>{betTypeMap[betType]}</div>
              <div className={styles.text1}>
                {orderText}
              </div>
            </div>
            {
              resData && resData.map((val) => (
                  <div className={styles['bet-info']} key={val.dishId}>
                    <div className={styles.infoBox}>
                      <div className={styles.info}>
                        <div className={styles.type}>
                          <span className={styles.name}>足球</span>
                          <span className={styles.score}>（{val.oddName}）</span>
                        </div>
                        <div className={styles.competitions}>
                          {val.cptName}
                        </div>
                        <div className={styles.team}>
                          <span className={styles.name}>
                             {val.homeName} vs {val.awayName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.choose}>
                      <span className={styles.handicap}>{val.choiceHandicap}</span>
                      @
                      <span className={styles.odds}>
                        {val.dish}
                        </span>
                    </div>
                  </div>
                ),
              )
            }
            <div className={styles['bet-amount']}>
              总投注额：{resData[0].money}
            </div>
            <div className={styles.button} onClick={this.closeShopCart}>
              继续投注
            </div>
          </div>
        );
      }
    }
    return null;
  }

  render() {
    const {
      userInfo: { balance },
      shopCart: { choiceId, mixedDishId },
      submitBetLoading,
      submitMixedLoading,
      checkBetLoading,
      checkMixedLoading,
    } = this.props;

    const { showFinishBets } = this.state;

    return (
      <div className={styles['bet-order']}>
        <div className={styles['money-wrap']}>
          <div className={styles.header} onClick={this.closeShopCart}>
            <div className={styles['trade-name']}>竞猜单</div>
            <div className={styles.balance}>
              余额：{balance}
            </div>
            <div className={styles.close}>
              <Icon type="cross" className={styles.closeBet}/>
            </div>
          </div>
          {
            submitBetLoading || submitMixedLoading || checkBetLoading || checkMixedLoading ?
              <div style={{ width: '100%', height: '40vh' }}>
                <Loading bg="rgba(0,0,0,0.1)" loadingIconSize="40px" color="#30717b"/>
              </div>
              :
              (
                (choiceId > 110 ? 1 : 0) + mixedDishId.length > 0 ?
                  this.renderBetOrMixed()
                  :
                  <div className={styles.betsBox}>
                    {
                      !showFinishBets && <div className={styles.content}>
                        <div className={styles.noBet}>
                          <i className={styles.iconFlag}/>
                          <div className={styles.text}>请把选项加入在您的投注单</div>
                        </div>
                      </div>
                    }
                    {
                      this.renderFinish()
                    }
                  </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default connect(({ app, loading }) => ({ app, loading }))(ShopCart);
