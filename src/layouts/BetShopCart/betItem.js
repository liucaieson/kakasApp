import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { InputItem , List} from 'antd-mobile';
import styles from './index.scss';
import { dishNameMap } from '../../utils/utils';
import { createForm } from 'rc-form';
import DishItem from './dishItem';
import Loading from '../../components/MbPageLoading';


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

@connect(({ chsDB, betShopCart,  loading }) => ({
  chsDB,
  betShopCart,
  checkLoading: loading.effects['betShopCart/checkBetOrder'],
}))
class BetItem extends PureComponent {
  state = {
    slideIn: false,
    showSelectOption: false,
    amount: 0,
    type: 'money',
  };
  timeout = null;

  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
   /* this.setAmount = throttle(this.setAmount.bind(this),1000)*/
  }

  delShopCartItem = (id, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'betShopCart/delBetShopCart',
      payload: id,
    });
  };

  setAmount = (e, id) => {
    let value = +e;
    if (value > 9999999) {
      return false;
    }
    this.setState({
      amount: value,
    });

    if(this.timeout){clearTimeout(this.timeout)}
      this.timeout = setTimeout(() => {
        const {dispatch} = this.props;
        dispatch({
          type: 'betShopCart/addShopCartItemAmount',
          payload: { id, amount: value },
      })} , 500);
  };


  renderTemplate() {
    const { data, chsDB: { chsDB }, }  = this.props;
    if(data.code === '200'){
      return (
        <Fragment>
          <div className={styles['bet-item-header']}>
            <div className={styles.left}>
              <div className={styles.title}>
                <div className={styles.logo}/>
                {
                  data.typeFlag === 2 ?
                    <div className={styles.gunqiu}/>:
                    <div className={styles.zaopan}/>
                }
                <div className={styles.text}>
                  【{data.cptName}】{data.homeName}---{data.awayName}
                </div>
              </div>
              <div className={styles['odds-name']}>
                {data.oddName}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.del} onClick={() => this.delShopCartItem(data.choiceId)}>X</div>
            </div>
          </div>
          <div className={styles['bet-item-content']}>
            <div className={styles.handicapInfo}>
              <div className={styles.handicap}>
                {dishNameMap[chsDB[data.choiceId].name]}{chsDB[data.choiceId].choiceHandicap}
              </div>
              <DishItem dish={chsDB[data.choiceId].dish}/>
            </div>
            <div className={styles.winInfo}>
              <div className={styles['bet-select']} ref={this.selectRef}>
                <InputItem
                  className={styles['bet-input']}
                  value={this.state.amount}
                  type='digit'
                  placeholder="请输入金额"
                  onChange={e => this.setAmount(e, data.choiceId)}
                />
              </div>
              <span className={styles.money}>￥{(chsDB[data.choiceId].dish * this.state.amount).toFixed(2)}</span>
            </div>
          </div>
        </Fragment>
      )
    }
    if(data.code === '2110' || data.code === '3004'){
      return (
        <Fragment>
          <div className={styles['no-bet']}>
            <div className={styles.left}>
              注意：<span className={styles.result}>{data.message}</span>
            </div>
            <div className={styles.right}>
              <div className={styles.del} onClick={() => this.delShopCartItem(data.choiceId)}>X</div>
            </div>
          </div>
          <div className={styles['bet-item-header']}>
            <div className={styles.left}>
              <div className={styles.title}>
                <div className={styles.logo}/>
                {
                  data.typeFlag === 2 ?
                    <div className={styles.gunqiu}/>:
                    <div className={styles.zaopan}/>
                }
                <div className={styles.text}>
                  【{data.cptName}】{data.homeName}---{data.awayName}
                </div>
              </div>
              <div className={styles['odds-name']}>
                {data.oddName}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.del} onClick={() => this.delShopCartItem(data.choiceId)}>X</div>
            </div>
          </div>
          <div className={styles['bet-item-content']}>
            <div className={styles.handicapInfo}>
              <div className={styles.handicap}>
                {dishNameMap[chsDB[data.choiceId].name]}{chsDB[data.choiceId].choiceHandicap}
              </div>
              <DishItem dish={chsDB[data.choiceId].dish}/>
            </div>
            <div className={styles.winInfo}>
              <div className={styles['bet-select']} ref={this.selectRef}>
                <InputItem
                  className={styles['bet-input']}
                  value={this.state.amount}
                  type='digit'
                  placeholder="请输入金额"
                  onChange={e => this.setAmount(e, data.choiceId)}
                />
              </div>
              <span className={styles.money}>￥{(chsDB[data.choiceId].dish * this.state.amount).toFixed(2)}</span>
            </div>
          </div>
        </Fragment>
        )
    }
    if(data.code === '3001' || data.code === '2111' ){
      return (
        <Fragment>
          <div className={styles['no-bet']}>
            <div className={styles.left}>
              该投注项当前不可投注：<span className={styles.result}>{data.message}</span>
            </div>
            <div className={styles.right}>
              <div className={styles.del} onClick={() => this.delShopCartItem(data.choiceId)}>X</div>
            </div>
          </div>
          <div className={styles['bet-item-header']}>
            <div className={styles.left}>
              <div className={styles.title}>
                <div className={styles.logo}/>
                {
                  data.typeFlag === 2 ?
                    <div className={styles.gunqiu}/>:
                    <div className={styles.zaopan}/>
                }
                <div className={styles.text}>
                  【{data.cptName}】{data.homeName}---{data.awayName}
                </div>
              </div>
              <div className={styles['odds-name']}>
                {data.oddName}
              </div>
            </div>
          </div>
          <div className={styles['bet-item-content']}>
            <div className={styles.handicapInfo}>
              <div className={styles.handicap}>
                {dishNameMap[chsDB[data.choiceId].name]}{chsDB[data.choiceId].choiceHandicap}
              </div>
            </div>
          </div>
        </Fragment>
      )
    }
  }

  render() {
    const {
      data,
      checkLoading,
    } = this.props;

    return (
      <li className={styles['bet-item']} key={data.choiceId}>
        {
          checkLoading ? <Loading/> :
           this.renderTemplate()
        }
      </li>
    );
  }
}

export default createForm()(BetItem);
