import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {Toast, InputItem, Modal} from 'antd-mobile'
import BetItem from './betItem'
import styles from './index.scss';
import Loading from '../../components/PCMask';
import { dishNameMap } from '../../utils/utils';

@connect(({ betShopCart, userInfo, chsDB, loading}) => ({
  betShopCart,
  userInfo,
  chsDB,
  submitLoading: loading.effects['betShopCart/postBetOrder'],
}))
class ShopCart extends PureComponent {
  state = {
    slideIn: false,
    modal1: false,
    result: []
  };

  onClose = key => () => {
    this.setState({
      modal1: false,
    });
  };

  componentDidMount(){
    this.checkBetOrder();
  }

  checkBetOrder = () => {
    const {dispatch,  betShopCart: { shopCart } ,chsDB : {chsDB}} = this.props;
    let dishId = [];
    shopCart.ids.map((val) => {
      dishId.push(chsDB[val].dishId)
    });
    dispatch({
      type: 'betShopCart/checkBetOrder',
      payload: {
        sport: '1',
        dishId: dishId.join(','),
      },
    });
  };

  submitBets  = () => {
    const { dispatch, betShopCart: {shopCart}, chsDB: {chsDB}, userInfo: {balance}, hideCart} = this.props;
    let amount = 0;
    let params = {};
    if(shopCart.ids.length <= 0){return}
    for (let i = 0; i <shopCart.ids.length ; i++) {
      if(shopCart.list[shopCart.ids[i]].amount < 1){
        Toast.info('购物车有未投注项', 1.5);
        return false
      }
    }
    for (let i = 0; i <shopCart.ids.length ; i++) {
      amount += shopCart.list[shopCart.ids[i]].amount
    }
    if(amount > + balance.balance){
      Toast.info('提示余额不足', 1.5);
      return false;
    }
    const paramsValue = [];
    const paramsDish = [];
    /*这里传递的id为盘口id，后端返回盘口id，用来做查询购物车 */
    shopCart.ids.map((val) => {
      paramsDish.push(chsDB[val].dishId);
      paramsValue.push(shopCart.list[val].amount)
    });
    params = {
      sport: '1',
      result: [{
        betType: '1',
        dishValue: paramsValue.join(','),
        dishId: paramsDish.join(',')
       }
      ]
    };

    dispatch({
      type: 'betShopCart/postBetOrder',
      payload: params,
      callback: (data) => {
        this.setState({
          modal1: true,
          result: data
        })
      }
    });
  };

  render() {
    const  {betShopCart: { shopCart },chsDB:{ chsDB }, submitLoading,} = this.props;
    const  { modal1, result} = this.state;
    let totalBetAmount = 0;
    let totalWinAmount = 0;
    shopCart.ids.map( (val) => {
      totalBetAmount += (shopCart.list[val].amount === undefined ? 0 : shopCart.list[val].amount);
      totalWinAmount += (chsDB[val] ? chsDB[val].dish : 1) * shopCart.list[val].amount
    });

    return (
     <Fragment>
       {
         submitLoading  ? <Loading bg="rgba(0,0,0,0.3)" loadingIconSize="40px" text="投注中..." /> : ""
       }
       <div className={styles['bet-box']}>
         <ul className={styles['bet-list']}>
           {
             shopCart.ids.length > 0 ?
               shopCart.ids.map( (val,index) => (
                 <BetItem data={shopCart.list[val]} index={index} key={val}/>
               ))
               :
               (<div className={styles['bet-none']}>暂无投注</div>)
           }
         </ul>
       </div>
       {
          <div className={styles['bet-total']}>
           <div className={styles.calc}>
             <div className={styles.left}>总投注额:{Number(totalBetAmount)}</div>
             <div className={styles.right}>总收益额:<span className={styles.profit}>{totalWinAmount.toFixed(2)}</span></div>
           </div>
           <div className={styles.button}>
             <button className={styles['button-submit']} onClick={this.submitBets}>
               确定投注
             </button>
           </div>
         </div>
       }
       <Modal
         visible={modal1}
         transparent
         maskClosable={false}
         onClose={this.onClose('modal1')}
         title={null}
         footer={[{ text: '确认', onPress: () => {  this.onClose('modal1')();} }]}
         wrapProps={{ onTouchStart: this.onWrapTouchStart }}
       >
         <div className={styles['result-modal']}>
           <div className={styles['bet-result']}>
             <div className={styles.left} />
             <div className={styles.right}>
               已下注
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
                   <div className={styles.flag}>{val.typeFlag === 2 ? '待确认': '下注成功'}</div>
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
                     投注总金额
                   </div>
                   <div className={styles.right}>
                     ￥ {val.money}
                   </div>
                 </div>
                 {
                   val.typeFlag === 2 && <div className={styles.spec}>注：滚球请到历史投注中查看下注是否成功</div>
                 }
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

export default ShopCart;
