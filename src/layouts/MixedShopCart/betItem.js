import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { dishNameMap } from '../../utils/utils';
import DishItem from './dishItem';
import Loading from '../../components/MbPageLoading';

@connect(({ chsDB, betShopCart, loading }) => ({
  chsDB,
  betShopCart,
  loading,
  checkLoading: loading.effects['betShopCart/checkMixedOrder'],
}))
class MixedItem extends PureComponent {
  state = {
    slideIn: false,
    showSelectOption: false,
    amount: '',
  };

  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  delMixedShopCartItem = (id, index) => {
    const { dispatch, delItem } = this.props;
    delItem();
    dispatch({
      type: 'betShopCart/delMixedShopCart',
      payload: id,
    });
  };

  render() {
    const {
      data,
      chsDB: { chsDB },
      checkLoading,
    } = this.props;
    return (
      <li className={styles['mixed-item']} key={data.matchId}>
        {
          checkLoading ? <Loading/> :
            (
              data.code && (
              data.code === '200' ?
                <Fragment>
                  <div className={styles['mixed-header']}>
                    <div className={styles.left}>
                      <div className={styles.title}>
                        <div className={styles.logo}/>
                        <div className={styles.title}>
                          【{data.cptName}】{data.homeName}---{data.awayName}
                        </div>
                      </div>

                      <div className={styles['odds-name']}>
                        <div className={styles.odds}>
                          {data.oddName}
                        </div>
                        <div className={styles.tiem}>
                          {data.time.substring(0, 4)}-{data.time.substring(4, 6)}-{data.time.substring(6, 8)}
                        </div>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.del} onClick={() => this.delMixedShopCartItem(data.matchId)}>X</div>
                    </div>
                  </div>
                  <div className={styles['item-content']}>
                    <div className={styles.winInfo}>
                      <div
                        className={styles.handicap}>{dishNameMap[chsDB[data.choiceId].name]}{chsDB[data.choiceId].choiceHandicap}</div>
                      <DishItem
                        dish={chsDB[data.choiceId].dish}
                      />
                    </div>
                  </div>
                </Fragment> :
                <Fragment>
                  <div className={styles['no-bet']}>
                    <div className={styles.left}>
                      该投注项当前不可投注：<span className={styles.result}>{data.message}</span>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.del} onClick={() => this.delMixedShopCartItem(data.matchId)}>X</div>
                    </div>
                  </div>
                  <div className={styles['mixed-header']}>
                    <div className={styles.left}>
                      <div className={styles.title}>
                        <div className={styles.logo}/>
                        <div className={styles.title}>
                          【{data.cptName}】{data.homeName}---{data.awayName}
                        </div>
                      </div>
                      <div className={styles['odds-name']}>
                        <div className={styles.odds}>
                          {data.oddName}
                        </div>
                        <div
                          className={styles.handicap}>{dishNameMap[chsDB[data.choiceId].name]}{chsDB[data.choiceId].choiceHandicap}</div>
                        <div className={styles.tiem}>
                          {data.time.substring(0, 4)}-{data.time.substring(4, 6)}-{data.time.substring(6, 8)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )
            )
        }
      </li>
    );
  }
}

export default MixedItem;
