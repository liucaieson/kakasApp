import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import styles from './index.scss';
import { dishNameMap } from '../../utils/utils';
import { Toast } from 'antd-mobile';
import Loading from '../../components/MbPageLoading';

@connect(({ loading, userInfo, shopCart, chsDB }) => ({
  userInfo,
  shopCart,
  chsDB,
  submitBetLoading: loading.effects['shopCart/postBetOrder'],
  submitMixedLoading: loading.effects['shopCart/postMixedOrder'],
  checkBetLoading: loading.effects['shopCart/checkBetOrder'],
  checkMixedLoading: loading.effects['shopCart/checkBetOrder'],
}))
class ShopCart extends PureComponent {

  state = {
    isLogin: false,
    showCart: false,
    showKeyboard: false,
    money: '',
    modal1: false,
    resData: [],
    showFinishBets: false,
    showSetting: false
  };

  timer = null;

  componentDidMount() {
    this.checkBetOrder();
  }

  checkBetOrder = () => {
    /* 单注传一个dishID,混合传多个dishId组成字符串 */
    const { dispatch, shopCart: { type, choiceId, mixedDishId, mixedDishInfo }, chsDB: { chsDB } } = this.props;
    if (choiceId < 100 && mixedDishId.length < 1) {
      return;
    }
    let dishId = [];
    if (type === 1) {
      dispatch({
        type: 'shopCart/checkBetOrder',
        payload: {
          sport: '1',
          dishId: chsDB[choiceId].dishId,
        },
      });
    } else {
      mixedDishId.map((val) => {
        let choiceId = mixedDishInfo[val].choiceId;
        dishId.push(chsDB[choiceId].dishId);
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

  componentWillUnmount() {

  }

  /*请求用户余额接口*/

  closeShopCart = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shopCart/closeCart',
    });
    this.setState({
      showFinishBets: false,
    })
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

  addMoney = (num) => {
    let { money } = this.state;
    if (money.length >= 6) {
      return;
    }
    money = money + num + '';
    this.setState({
      money,
    });
  };

  delMoney = () => {
    this.setState({
      money: '',
    });
  };

  backMoney = () => {
    let { money } = this.state;
    if (money <= 0) {
      return;
    }
    money = money + '';
    money = money.substring(0, money.length - 1);
    this.setState({
      money,
    });
  };

  setMoney = (num) => {
    let { money } = this.state;
    if (money.length >= 7) {
      return;
    }
    this.setState({
      money: +money + num,
    });
  };

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
      payload: matchId

    });
  };

  toggleSetting = () => {
    this.setState({
      showSetting : !this.state.showSetting
    })
  };

  postBet = () => {
    const { dispatch } = this.props;
    const { money } = this.state;
    if( money >= 50 && money <= 30000){
      dispatch({
        type: 'shopCart/postBetOrder',
        payload: money,
        callback: (data) => {
          this.setState({
            showKeyboard: false,
            money: ''
          });
          if(data[0].code === '208') {
           /* this.closeShopCart();*/
            Toast.info('投注成功', 1.5);
            this.setState({
              showFinishBets: true,
              resData: data
            })
          }
        }
      });
    } else if(money > 30000){
      Toast.info('超过最大投注限额', 1.5);
    }else{
      Toast.info('最少投注50元', 1.5);
    }
  };

  postMixedBet= () => {
    const { dispatch } = this.props;
    const { money } = this.state;
    if( money >= 50 && money <= 30000){
      dispatch({
        type: 'shopCart/postMixedOrder',
        payload: money,
        callback: (data) => {
          this.setState({
            showKeyboard: false,
            money: ''
          });
          if(data.code === 200) {
           /* this.closeShopCart();*/
            Toast.info('投注成功', 1.5);
            this.setState({
              showFinishBets: true,
              resData: data.data
            })
          }
        }
      });
    } else if(money > 30000){
      Toast.info('超过最大投注限额', 1.5);
    }else{
      Toast.info('最少投注50元', 1.5);
    }
  };

  renderSetting(){
    return (
      <div className={styles.setting}>
        <div className={styles.icon} />系统将接受服务器最新赔率
      </div>
    )
  }

  renderBetOrMixed(){
    const {
      shopCart: { mixedDishId, mixedDishInfo, type, dishInfo },
      chsDB: { chsDB },
    } = this.props;
    const { showKeyboard, money, showSetting } = this.state;
    let mixedAllOdds = 0;
    mixedDishId.map((val) => {
      mixedAllOdds += +chsDB[mixedDishInfo[val].choiceId].dish
    });
    if(type ===1){
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
                    <span className={styles.name}>{dishInfo.homeName} vs {dishInfo.awayName}</span>
                  </div>
                </div>
              </div>
              <div className={styles.choose}>
                {chsDB[dishInfo.choiceId] && dishNameMap[chsDB[dishInfo.choiceId].name]}
                <span className={styles.handicap}>{dishInfo.choiceHandicap}</span>
                @
                <span className={styles.odds}>
                             {dishInfo.choiceId && chsDB[dishInfo.choiceId] &&
                             chsDB[dishInfo.choiceId].dish}
                          </span>
              </div>
              {
                dishInfo.code === '3001' || dishInfo.code === '2111' ?
                  '' :
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
              }
            </div>
          </div>
          {dishInfo.code === '3001' || dishInfo.code === '2111' ?
            '' :
            <div className={styles.winMoney} onClick={this.hideKeyboard}>
              <div className={styles['line-box']}>
                <div className={styles.line}>
                  <div className={styles.text}>可赢金额</div>
                  <div className={styles.money}>
                    {chsDB[dishInfo.choiceId] && (chsDB[dishInfo.choiceId].dish * money).toFixed(2)}</div>
                </div>
              </div>
            </div>
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
      )
    }
    else{
      return (
        <div className={styles.betsBox}>
          <div className={styles.content} onClick={this.hideKeyboard}>
            <div className={styles['bet-info']}>
              {
                mixedDishId.map((val) => (
                  <div key={val} className={styles.infoBox}
                       style={{ marginBottom: '14px', borderBottom: 'solid 1px #e0dddd' }}>
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
                      {chsDB[mixedDishInfo[val].choiceId] && dishNameMap[chsDB[mixedDishInfo[val].choiceId].name]}
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
              {
                mixedDishId.length > 1 ? (
                  dishInfo.code === '3001' || dishInfo.code === '2111' ?
                    <div className={styles['error-box']}>
                      注意：{dishInfo.message}
                    </div> :
                    <div className={styles['bet-input']}>
                      <div className={styles.left} onClick={this.openKeyboard}>
                        <div className={styles.num}>{money}</div>
                        <div className={styles.clearNum}/>
                      </div>
                      <div className={styles.right}>
                        <div className={styles.high}>最低投注:<i>50</i></div>
                        <div className={styles.high}>最大投注:<i>30000</i></div>
                      </div>
                    </div>) : <div className={styles['error-box']}>
                  <div className={styles.error}/>
                  <div className={styles.message}>
                    混合过关-需要选择最少2个投注
                  </div>
                </div>
              }
            </div>
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
                    }*/}
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
      )
    }
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

    const { resData,  showFinishBets } = this.state;

    return (
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
        {
          submitBetLoading || submitMixedLoading || checkBetLoading || checkMixedLoading ?
            <div style={{width:'100%',height: '40vh'}}>
              <Loading bg="rgba(0,0,0,0.1)" loadingIconSize="40px" color="#30717b"/>
            </div>:
            (
              (choiceId > 110 ? 1 : 0) + mixedDishId.length > 0 ?
                this.renderBetOrMixed()
                 :
                (
                  <div className={styles.betsBox}>
                    {
                      showFinishBets? '' : <div className={styles.content}>
                        <div className={styles.noBet}>
                          <i className={styles.iconFlag}/>
                          <div className={styles.text}>请把选项加入在您的投注单</div>
                        </div>
                      </div>
                    }
                    <div className={styles.success}>
                    {
                      showFinishBets ?
                        <Fragment>{
                          resData && resData.map((val) => (

                              <div className={styles['bet-info']}>
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
                                      <span className={styles.name}>{val.homeName} vs {val.awayName}</span>
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
                                <div className={styles.money}>
                                  投注额：{val.money}
                                </div>
                              </div>

                            )
                          )
                        }
                        <div className={styles.button} onClick={this.closeShopCart}>
                          继续投注
                        </div>
                        </Fragment>
                       : ''
                    }
                    </div>
                  </div>
                )
            )
        }
      </div>
    );
  }
}

export default connect(({ app, loading }) => ({ app, loading }))(ShopCart);
