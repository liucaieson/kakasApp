import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Toast, InputItem,List, Modal } from 'antd-mobile';
import BetItem from './betItem';
import styles from './index.scss';
import { groupSplit } from '@/utils/utils';
import Loading from '../../components/PCMask';
import { dishNameMap } from '../../utils/utils';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

const betTypeArr = [
  [
    { length: 1, betType: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 2 },
    { name: '2串1', betType: 2, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 3 },
    { name: '2串1', betType: 2, length: 3 },
    { name: '3串1', betType: 3, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 4 },
    { name: '2串1', betType: 2, length: 6 },
    { name: '3串1', betType: 3, length: 4 },
    { name: '4串1', betType: 4, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 5 },
    { name: '2串1', betType: 2, length: 10 },
    { name: '3串1', betType: 3, length: 10 },
    { name: '4串1', betType: 4, length: 5 },
    { name: '5串1', betType: 5, length: 1 },
  ],
  [
    { name: '单注', betType: 1, length: 6 },
    { name: '2串1', betType: 2, length: 15 },
    { name: '3串1', betType: 3, length: 20 },
    { name: '4串1', betType: 4, length: 15 },
    { name: '5串1', betType: 5, length: 5 },
    { name: '6串1', betType: 6, length: 1 },
  ],
];

@connect(({ betShopCart, userInfo, chsDB, loading }) => ({
  betShopCart,
  userInfo,
  chsDB,
  submitLoading: loading.effects['betShopCart/postMixedOrder'],
}))
class MixedShopCart extends PureComponent {
  state = {
    showSelectOption: false,
    amount1: 0,
    amount2: 0,
    amount3: 0,
    amount4: 0,
    amount5: 0,
    amount6: 0,
    slideIn: false,
    mixedType: [],
    modal1: false
  };

  constructor(props) {
    super(props);
    this.typeRef = React.createRef();
  }

  componentDidMount(){
    const {dispatch,  betShopCart: { mixedShopCart }, chsDB : {chsDB}} = this.props;
    let dishId = [];
      mixedShopCart.ids.map((val) => {
        let choiceId = mixedShopCart.list[val].choiceId;
        dishId.push(chsDB[choiceId].dishId)
      });
      dispatch({
        type: 'betShopCart/checkMixedOrder',
        payload: {
          sport: '1',
          dishId: dishId.join(','),
        },
      });
  }

  onClose = key => () => {
    this.setState({
      modal1: false,
    });
  };

  submitBets = () => {
    const { dispatch, betShopCart: { mixedShopCart }, chsDB: { chsDB }, userInfo: { balance } } = this.props;
    for(let i=1; i<mixedShopCart.ids.length; i++) {
      if(mixedShopCart.list[mixedShopCart.ids[i]].code !== '200') {
        Toast.info('请删除投注单中不可投注的选项', 1.5);
        return;
      }
    }
    const { amount1, amount2, amount3, amount4, amount5, amount6 } = this.state;
    let params = [];
    let dishParams = [];
    let amountTotal = amount1 + amount2 + amount3 + amount4 + amount5 + amount6;
    if (amountTotal <= balance.balance) {
      Toast.info('余额不足',1.5);
      return false;
    }
    /* 注意mix事宜比赛ID为key的 */
    if (amount1 >= 1 || amount2 >= 1 || amount3 >= 1 || amount4 >= 1 || amount5 >= 1 && amount6 >= 1) {
      mixedShopCart.ids.map((item) => {
        dishParams.push(chsDB[mixedShopCart.list[item].choiceId].dishId);
      });
      betTypeArr[mixedShopCart.ids.length - 1].map((item) => {
        if (this.state['amount' + item.betType] >= 1) {
          if (item.betType === 1) {
            let dishValue = [];
            for (let i = 0; i < mixedShopCart.ids.length; i++) {
              dishValue.push(this.state.amount1);
            }
            params.push({
              betType: item.betType,
              dishValue: dishValue.join(','),
              dishId: dishParams.join(','),
            });
          } else {
            params.push({
              betType: item.betType,
              dishValue: this.state['amount' + item.betType],
              dishId: dishParams.join(','),
            });
          }
        }
      });
    } else {
      Toast.info("至少要投一注", 1.5);
      return false;
    }
    const param = {
      sport: '1',
      result: params,
    };
    dispatch({
      type: 'betShopCart/postMixedOrder',
      payload: param,
      callback: (data) => {
        this.setState({
          modal1: true,
          result: data
        })
      }
    });
  };

  setAmount = (e, betType) => {
    if (e.match(/[^\d]/g)) {
      return false;
    }
    e = +e;
    if (e > 9999999) {
      return false;
    }
    this.setState({
      [`amount${betType}`]: e,
    });
  };

  renderInput(betType) {
    if (betType === 1) {
      return (
        <InputItem
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={styles.input}
          value={this.state.amount1}
          type='digit'
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          onChange={e => this.setAmount(e, 1)}
          moneyKeyboardHeader={<div style={{color: 'red'}}>1111</div>}
        />
      );
    }
    if (betType === 2) {
      return (
        <InputItem
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={styles.input}
               value={this.state.amount2}
          type='digit'
                   moneyKeyboardWrapProps={moneyKeyboardWrapProps}
               onChange={e => this.setAmount(e, 2)}
        />
      );
    }
    if (betType === 3) {
      return (
        <InputItem className={styles.input}
               value={this.state.amount3}
                   type='digit'
                   moneyKeyboardWrapProps={moneyKeyboardWrapProps}
               onChange={e => this.setAmount(e, 3)}
        />
      );
    }
    if (betType === 4) {
      return (
        <InputItem
          className={styles.input}
               value={this.state.amount4}
          type='digit'
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
               onChange={e => this.setAmount(e, 4)}
        />
      );
    }
    if (betType === 5) {
      return (
        <InputItem className={styles.input}
               value={this.state.amount5}
                   type='digit'
                   moneyKeyboardWrapProps={moneyKeyboardWrapProps}
               onChange={e => this.setAmount(e, 5)}
        />
      );
    }
    if (betType === 6) {
      return (
        <InputItem className={styles.input}
               value={this.state.amount6}
                   type='digit'
                   moneyKeyboardWrapProps={moneyKeyboardWrapProps}
               onChange={e => this.setAmount(e, 6)}
        />
      );
    }
  }

  delItem = () => {
    const { betShopCart: { mixedShopCart } } = this.props;
    const length = mixedShopCart.ids.length;
    this.setState({
      [`amount${length}`]: 0,
    });
  };

  render() {
    const { betShopCart: { mixedShopCart }, chsDB: { chsDB }, submitLoading } = this.props;
    const { result, modal1 } = this.state
    let minProfit = 0;
    let maxProfit = 0;
    let totalAmount = 0;
    let dishArr = [];
    /* 组合讲各种玩法组合，和对象的金额相乘加入dishArr数组中 */
    if (mixedShopCart.ids.length - 1 >= 0) {
      betTypeArr[mixedShopCart.ids.length - 1].map((val) => {
        let r = groupSplit(mixedShopCart.ids, val.betType);
        for (let i = 0; i < r.length; i++) {
          let c1 = 1;
          let c2 = 0;
          for (let j = 0; j < r[i].length; j++) {
            c1 *= chsDB[mixedShopCart.list[r[i][j]].choiceId].dish;
          }
          c2 = c1 * this.state['amount' + val.betType];
          if (c2 !== 0) {
            dishArr.push(c2);
          }
        }
      });

      if (dishArr.length !== 0) {
        minProfit = Math.min.apply(null, dishArr);
        maxProfit = dishArr.reduce((prev, cur) => {
          return prev + cur;
        });
      }
      betTypeArr[mixedShopCart.ids.length - 1].map((item) => {
        totalAmount += item.length * this.state['amount' + item.betType];
      });
    }

    return (
      <Fragment>
        {
          submitLoading ? <Loading bg="rgba(0,0,0,0.3)" loadingIconSize="40px" text="投注中..." /> : ""
        }
        <div className={styles['bet-box']}>
          <ul className={styles['bet-list']}>
            {
              mixedShopCart.ids.length > 0 ?
                mixedShopCart.ids.map((val, index) => (
                  <BetItem data={mixedShopCart.list[val]} index={index} key={val} delItem={this.delItem}/>
                ))
                :
                (<div className={styles['bet-none']}>暂无投注</div>)
            }
          </ul>
        </div>
        <div className={styles['mixed-total']}>
          <div className={styles.type} ref={this.typeRef}>
            <div className={styles.title}>
              <div className={styles.left}>投注类型</div>
              <div className={styles.right}>单位本金</div>
            </div>
            {
              mixedShopCart.ids.length >= 2 ?
                betTypeArr[mixedShopCart.ids.length - 1].map((val, index) => (
                  <List key={val.betType}  >
                    <div className={styles.row} >
                      <div className={styles.name}>{val.name}</div>
                      <div className={styles.length}>{val.length}<span className={styles.x}>X</span></div>
                      {this.renderInput(val.betType)}
                    </div>
                  </List>
                ))
                : <div className={styles.row}>至少要选择2场比赛</div>
            }
          </div>
          <div className={styles.calc}>
            <div className={styles.left}>
              <div className={styles.text}>
                总投注额:
              </div>
              <div className={styles.amount}>
                {totalAmount}
              </div>
            </div>
            <div className={styles.right}>预计收益:
              <span className={styles.profit}>{minProfit.toFixed(2)}~{maxProfit.toFixed(2)}</span>
            </div>
          </div>
          <div className={styles.button}>
            <button className={styles['button-submit']} onClick={this.submitBets}>
              确定投注
            </button>
          </div>
        </div>
        <Modal
          visible={modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title={null}
          footer={[{ text: '确认', onPress: () => {  this.onClose('modal1')();} }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div className={styles['result-mixed-modal']}>
            <div className={styles['bet-result']}>
              <div className={styles.left} />
              <div className={styles.right}>
                混合过关已下注
              </div>
            </div>
            {
              result && result.map((val) => (
                val.code === '208' ? (
                  <div className={styles['result-item']} key={val.choiceId}>

                    <div className={styles['result-item-header']}>
                      <div className={styles.left}>
                        <div className={styles.title}>
                          <div className={styles.logo}/>
                        </div>
                      </div>
                      <div className={styles.text}>
                        {val.homeName}---{val.awayName}
                      </div>
                      <div className={styles.flag}>成功</div>
                    </div>
                    <div className={styles['result-item-content']}>
                      <div className={styles['odds-name']}>
                        {val.oddName}
                      </div>
                      <div className={styles.handicap}>
                        {dishNameMap[val.name]}{val.choiceHandicap}
                      </div>
                      <div className={styles.odds}>
                        {val.dish}
                      </div>
                    </div>
                  </div>
                ) :(
                  <div className={styles['result-item']} key={val.choiceId}>
                    <div className={styles['result-item-header']}>
                      <div className={styles.left}>
                        <div className={styles.title}>
                          <div className={styles.logo}/>
                        </div>
                      </div>
                      <div className={styles.text}>
                        {val.homeName}---{val.awayName}
                      </div>
                      <div className={styles.loss}>失败</div>
                    </div>
                    <div className={styles['result-item-content']}>
                      <div className={styles['odds-name']}>
                        {val.oddName}
                      </div>
                      <div className={styles.handicap}>
                        {dishNameMap[val.name]}{val.choiceHandicap}
                      </div>
                      <div className={styles.odds}>
                        {val.dish}
                      </div>
                    </div>
                    <div className={styles['result-item-winInfo']}>
                      <div className={styles.left}>
                        下注失败{val.message}
                      </div>
                    </div>
                  </div>
                )
              ))
            }
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default MixedShopCart;
