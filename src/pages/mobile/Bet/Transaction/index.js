import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import Link from 'umi/link';
import { dishNameMap } from '../../../../utils/utils';
import MbPageLoading from '../../../../components/MbPageLoading';
import { Pagination } from 'antd-mobile';
import Loading from '../../../../components/PCMask';


const betTypeMap = {
  '1':'单注',
  '2':'二串一',
  '3':'三串一',
  '4':'四串一',
  '5':'五串一',
  '6':'六串一',
};

@connect(({ historyBets, loading }) => ({
  historyBets,
  loading: loading.models.historyBets,
}))
class Transaction extends PureComponent {
  state = {
    isShowLoading: true,
    total: 1,
    current: 1,
    size: 10,
    showMatch: [],
    betStatus: '',
  };

  /* 请求投注记录 */
  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      isShowLoading: true,
      betStatus:'',
    });
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        page:1,
        size:10,
        betStatus:'',
        sport: '1'
        /*start_time: +(moment(startDate).valueOf()/1000).toFixed(0),
        end_time: +(moment(moment(endDate).format('YYYY-MM-DD 23:59:59'))/1000).toFixed(0)*/
      },
      callback: response => {
        const { count, current } = response;
        this.setState({
          isShowLoading: false,
          total: count,
          current,
          size:10,
        });
      },
    });
  }

  onChange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      isShowLoading: true,
      betStatus:e
    });
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        page:1,
        size:10,
        betStatus: e,
        sport: '1'
      },
      callback: response => {
        const { count, current } = response;
        this.setState({
          isShowLoading: false,
          total: count,
          current,
          size:10,
        });
      },
    });
  };

  toggle = (id) => {
    const { showMatch } = this.state;
    const index = showMatch.indexOf(id);
    if(index === -1){
      showMatch.push(id);
      const arr = showMatch.concat();
      this.setState({
        showMatch: arr
      })
    }else{
      showMatch.splice(index, 1);
      const arr = showMatch.concat();
      this.setState({
        showMatch: arr
      })
    }
  };

  togglePage = (flag) => {
    const { dispatch, loading } = this.props;
    let { current, betStatus } = this.state;
    if (loading) {
      return false;
    }
    if (flag === 'next') {
      current = current + 1;
    } else {
      current = current - 1;
    }
    this.setState({
      isShowLoading: true,
    });
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        page: current,
        size: 10,
        sport: '1',
        betStatus
      },
      callback: response => {
        const { count, current } = response;
        this.setState({
          isShowLoading: false,
          total: count,
          current,
          size: 10,
        });
      },
    });

  };

  render() {
    const { historyBets: { data }, loading } = this.props;
    const { isShowLoading, betStatus, total, current, size} = this.state;
    return (
      <div className={styles.transaction}>
        <div className={styles['play-tab']}>
          <div className={styles.tab + ' ' + styles.active}
          >交易状况
          </div>
          <Link to="/bet/AccountHistory" className={styles.tab}
          >账户历史</Link>
        </div>
        <div className={styles['game-tab']}>
          <div className={styles.name}>账户交易记录</div>
          <div className={styles.box}>
        </div>
        </div>
        <div  className={styles.main}>
          <div className={styles['sub-title']}>
            <div className={styles['tab-box']}>
              <div className={betStatus === '' ? `${styles.tab1} ${styles.active}` : `${styles.tab1}`} onClick={() => this.onChange('')}>全部</div>
              <div className={betStatus === '0' ? `${styles.tab2} ${styles.active}` : `${styles.tab2}`} onClick={() => this.onChange('0')}>未结算</div>
              <div className={betStatus === '1' ? `${styles.tab3} ${styles.active}` : `${styles.tab3}`} onClick={() => this.onChange('1')}>已结算</div>
            </div>
          </div>
          <div className={styles.main}>
              {
                isShowLoading  ? <div className={styles.loadingBox}>
                    <Loading bg="rgba(255,255,255,.2)"  loadingIconSize="40px" color="#30717b"/>
                  </div> :
                  (
                    data.length > 0 ?
                      <ul className={styles['list-box']}>
                        {
                          data.map((val, index) => (
                            <li className={styles.item} key={val.betId} onClick={() => this.toggle(val.betId)}>
                              <div className={styles.title}>
                                <span className={styles.money}>￥{val.betMoney}</span>
                                <span className={styles.type}>{betTypeMap[val.betType]}</span>
                                {
                                  val.betStatus === '已结算' ?
                                    <span className={styles.balance}>
                                       <span className={styles.num}>
                                      {val.bonusMoney > 0 ?
                                        <i className={styles.red}>￥{val.bonusMoney}</i>
                                        : <i className={styles.gray}>￥{val.bonusMoney}</i>
                                      }
                                    </span>
                                      {val.betStatus}
                                    </span>
                                    :
                                    <span className={styles.balance}>{val.betStatus}</span>
                                }
                              </div>
                              {
                                this.state.showMatch.includes(val.betId) ?
                                  <div className={styles.detail}>
                                    {
                                      val.detailed && val.detailed.map((item) => (
                                        <div className={styles.info} key={item.betDetailId}>
                                          <div className={styles.left}>
                                            <div
                                              className={styles['dish-name']}>{dishNameMap[item.choiceContent]}{item.choiceHandicap}</div>
                                            <div className={styles['odds-name']}>{item.oddName}</div>
                                            <div className={styles.match}>{item.hostName}---{item.awayName}</div>
                                          </div>
                                          <div className={styles.right}>
                                            <div className={styles.dish}>
                                              {item.dishRate}
                                            </div>
                                            <div className={styles.win}>
                                              {
                                                item.resultFlag === '胜' ?
                                                <span className={styles.red}>{item.resultFlag}</span> :
                                                <span className={styles.green}> {item.resultFlag}</span>
                                              }
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    }
                                    <div className={styles.orderNum}>订单号：{val.betId}</div>
                                    <div className={styles.betTime}>下注时间：{val.betTime}</div>
                                    <div className={styles.money}>
                                      <div className={styles.left}>
                                        <span className={styles.text}>本金：</span>
                                        <span className={styles.num}>￥{val.betMoney}</span>
                                      </div>
                                      <div className={styles.right}>
                                        <span className={styles.text}>返还：</span>
                                        <span className={styles.num}>￥{val.bonusMoney}</span>
                                      </div>
                                    </div>
                                  </div>
                                  : ''
                              }
                            </li>
                          ))
                        }
                      </ul>
                      : <div className='no-data'>
                        暂无数据
                      </div>
                  )
              }
            {
              total > 9 ?
                <Pagination total={Math.ceil(total / size)}
                            className={styles.pagination}
                            current={current}
                            locale={{
                              prevText: (<span onClick={() => this.togglePage('prev')}>上一页</span>),
                              nextText: (<span onClick={() => this.togglePage('next')}>下一页</span>),
                            }}
                /> : ''
            }
          </div>
        </div>
      </div>

    );
  }
}

export default Transaction;
