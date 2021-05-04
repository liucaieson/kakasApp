import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import { Pagination } from 'antd-mobile';
import styles from './index.scss';
import Loading from '@/components/LoadingMask';
import NoMatch from '@/components/NoMatch';

@connect(({ accountStatement, loading }) => ({
  accountStatement,
  loading: loading.models.accountStatement,
}))
class Announcement extends PureComponent {
  state = {
    isShowLoading: true,
    total: 10,
    current: 1,
    size: 10,
  };

  /* 请求投注记录 */
  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      isShowLoading: true,
    });
    dispatch({
      type: 'accountStatement/fetch',
      payload: {
        page: 1,
        size: 10,
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

  togglePage = (flag) => {
    const { dispatch, loading } = this.props;
    const { size, total } = this.state;
    let currentPage = this.state.current;
    if (loading) {
      return;
    }
    if (flag === 'next') {
      currentPage += 1;
    } else {
      currentPage -= 1;
    }
    /* 边界处理 */
    if (currentPage < 1 || currentPage > Math.ceil(total / size)) {
      return;
    }
    this.setState({
      isShowLoading: true,
    });
    dispatch({
      type: 'accountStatement/fetch',
      payload: {
        page: currentPage,
        size: 10,
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

  renderTable() {
    const { accountStatement: { data } } = this.props;
    if (data.length > 0) {
      return (
        <Fragment>
          {
            data.map((val, index) => (
              <tr className={styles.line} key={index}>
                <td className="his_date">
                  {moment(val.date).local().format('YYYY-MM-DD HH:mm')}
                </td>
                <td>{val.money}</td>
                <td>{val.balance}</td>
                <td>
                  {val.type}
                </td>
              </tr>
            ))
          }
        </Fragment>
      );
    }
      return (
        <NoMatch />
      );
  }

  render() {
    const { total, current, size, isShowLoading } = this.state;
    return (
      <div className={styles.accountHistory}>
        <div className={styles['play-tab']}>
          <div className={`${styles.tab} ${styles.active}`}
          >账户历史
          </div>
          <Link to="/bet/transaction" className={styles.tab}
          >交易状况
          </Link>
        </div>
        <div className={styles['game-tab']}>
          <div className={styles.name}>账户历史摘要</div>
          <div className={styles.box}/>
        </div>
        <div className={styles.main}>
          <table width="100%" border="0" cellSpacing="0" cellPadding="0" className={styles.table}>
            <tbody>
            <tr className={styles.title}>
              <td>日期</td>
              <td>账变金额</td>
              <td>余额</td>
              <td>账变来源</td>
            </tr>
            {
              isShowLoading ?
                <div className={styles.loadingBox}>
                  <Loading bg="rgba(255,255,255,.2)" loadingIconSize="40px" color="#30717b"/>
                </div>
                :
                this.renderTable()
            }
            </tbody>
          </table>
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
              /> : ''
          }
        </div>
      </div>
    );
  }
}

export default Announcement;
