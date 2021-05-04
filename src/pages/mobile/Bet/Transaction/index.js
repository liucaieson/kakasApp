import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Pagination } from 'antd-mobile';
import moment from 'moment';
import styles from './index.scss';
import { dishNameMap, betStatusMap, betResultMap } from '@/utils/utils';
import Loading from '@/components/LoadingMask';
import Accordion from '@/components/Accordion';


const betTypeMap = {
  1: '单注',
  2: '二串一',
  3: '三串一',
  4: '四串一',
  5: '五串一',
  6: '六串一',
};

@connect(({ historyBets, loading }) => ({
  historyBets,
  loading: loading.models.historyBets,
}))
class Transaction extends PureComponent {
  /**
   *
   * @type {{isShowLoading: boolean 请求接口的loading效果 ,
   * total: number 请求数据的总数,
   * current: number 当前页码,
   * size: number 每页条数,
   * betStatus: string 请求的历史记录的状态结算或者未结算}}
   */
  state = {
    isShowLoading: true,
    total: 1,
    current: 1,
    size: 10,
    betStatus: '',
  };

  /* 请求投注记录 */
  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      isShowLoading: true,
      betStatus: '',
    });
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        page: 1,
        size: 10,
        betStatus: '',
        sport: '1',
        /* start_time: +(moment(startDate).valueOf()/1000).toFixed(0),
        end_time: +(moment(moment(endDate).format('YYYY-MM-DD 23:59:59'))/1000).toFixed(0) */
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
  }

  onChange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      isShowLoading: true,
      betStatus: e,
    });
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        page: 1,
        size: 10,
        betStatus: e,
        sport: '1',
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

  togglePage = (flag) => {
    const { dispatch, loading } = this.props;
    const { size, total, betStatus } = this.state;
    let currentPage = this.state.current;
    if (loading) {
      return;
    }

    // 判断向前还是向后翻页
    if (flag === 'next') {
      currentPage += 1;
    } else {
      currentPage -= 1;
    }
    // 边界处理
    if (currentPage < 1 || currentPage > Math.ceil(total / size)) {
      return;
    }
    this.setState({
      isShowLoading: true,
    });
    dispatch({
      type: 'historyBets/fetch',
      payload: {
        page: currentPage,
        size: 10,
        sport: '1',
        betStatus,
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

  renderTable() {
    const { historyBets: { data } } = this.props;
    if (data.length > 0) {
      return (
        <ul className={styles['list-box']}>
          {
            data.map((val) => (
              <li className={styles.item} key={val.betId}>
                <Accordion>
                  <div className={styles.title}>
                    <span className={styles.money}>￥{val.betMoney}</span>
                    <span className={styles.type}>{betTypeMap[val.betType]}</span>
                    {
                      val.betStatus === 1 ?
                        <span className={styles.balance}>
                          <span className={styles.num}>
                            {
                              val.bonusMoney > 0 ?
                              <i className={styles.red}>￥{val.bonusMoney}</i>
                              :
                                <i className={styles.gray}>￥{val.bonusMoney}</i>
                            }
                          </span>
                          {betStatusMap[val.betStatus]}
                       </span>
                        :
                        <span className={styles.balance}>{betStatusMap[val.betStatus]}</span>
                    }
                  </div>
                  <div className={styles.detail}>
                    {
                      val.bizBetDetailVOList && val.bizBetDetailVOList.map((item) => (
                        <div className={styles.info} key={`${item.betId}${item.dishRate}`}>
                          <div className={styles.left}>
                            <div
                              className={styles['dish-name']}>
                              {dishNameMap[item.choiceContent]}{item.choiceHandicap}
                            </div>
                            <div className={styles['odds-name']}>{item.typeName}</div>
                            <div className={styles.match}>{item.hostTeam}---{item.awayTeam}</div>
                          </div>
                          <div className={styles.right}>
                            <div className={styles.dish}>
                              {item.dishRate}
                            </div>
                            <div className={styles.win}>
                              {
                                item.resultFlag === 1 ?
                                  <span className={styles.red}>
                                    {betResultMap[item.resultFlag]}
                                  </span>
                                  :
                                  <span className={styles.green}>
                                    {betResultMap[item.resultFlag]}
                                  </span>
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    }
                    <div className={styles.orderNum}>订单号：{val.betId}</div>
                    <div className={styles.betTime}>下注时间：
                      {moment.utc(val.betTime).local().format('YYYY-MM-DD HH:mm:ss')}
                    </div>
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
                </Accordion>
              </li>
            ))
          }
        </ul>
      );
    }
    return (
      <div className="no-data">
        暂无数据
      </div>
    );
  }

  render() {
    const { isShowLoading, betStatus, total, current, size } = this.state;
    return (
      <div className={styles.transaction}>
        <div className={styles['play-tab']}>
          <Link to="/bet/accountHistory" className={styles.tab}
          >账户历史</Link>
          <div className={`${styles.tab} ${styles.active}`}
          >交易状况
          </div>
        </div>
        <div className={styles['game-tab']}>
          <div className={styles.name}>账户交易记录</div>
          <div className={styles.box}/>
        </div>
        <div className={styles.main}>
          <div className={styles['sub-title']}>
            <div className={styles['tab-box']}>
              <div className={betStatus === '' ? `${styles.tab1} ${styles.active}` : `${styles.tab1}`}
                   onClick={() => this.onChange('')}>全部
              </div>
              <div className={betStatus === '0' ? `${styles.tab2} ${styles.active}` : `${styles.tab2}`}
                   onClick={() => this.onChange('0')}>未结算
              </div>
              <div className={betStatus === '1' ? `${styles.tab3} ${styles.active}` : `${styles.tab3}`}
                   onClick={() => this.onChange('1')}>已结算
              </div>
            </div>
          </div>
          <div className={styles.main}>
            {
              isShowLoading ?
                <div className={styles.loadingBox}>
                  <Loading bg="rgba(255,255,255,.2)" loadingIconSize="40px" color="#30717b"/>
                </div> :
                this.renderTable()
            }
            {
              total > 9 ?
                <Pagination
                  total={Math.ceil(total / size)}
                  className={styles.pagination}
                  current={current}
                  locale={{
                    prevText: (<span onClick={() => this.togglePage('prev')}>上一页</span>),
                    nextText: (<span onClick={() => this.togglePage('next')}>下一页</span>),
                  }}
                />
                :
                null
            }
          </div>
        </div>
      </div>

    );
  }
}

export default Transaction;
