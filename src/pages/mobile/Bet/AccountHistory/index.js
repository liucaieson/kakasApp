import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import Link from 'umi/link';



@connect(({ accountStatement, loading }) => ({
  accountStatement,
  loading: loading.models.accountStatement,
}))
class Announcement extends PureComponent {
  state = {
    isShowLoading: true,
    total: 1,
    current: 1,
    size: 10,
  };

  /* 请求投注记录 */
  componentDidMount() {
    const { dispatch } = this.props;
    const { startDate, endDate} = this.state;
    this.setState({
      isShowLoading: true
    });
    dispatch({
      type: 'accountStatement/fetch',
      payload: {
        page:1,
        size:20,
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
          size:20,
        });
      },
    });
  }

  /* 返回首页*/
  goBack = () => {
    const { history } = this.props;
    history.go(-1);
  };


  render() {
    const { accountStatement: {data} , loading } = this.props;
    return (
      <div className={styles.accountHistory}>

        <div className={styles['play-tab']}>
          <Link to='/bet/transaction' className={styles.tab}
          >交易状况
          </Link>
          <div  className={styles.tab + ' ' + styles.active}
          >账户历史</div>
        </div>
        <div className={styles['game-tab']}>
          <div className={styles.name}>账户历史摘要</div>
          <div className={styles.box}>

          </div>
        </div>
        <div  className={styles.main}>
          <table width="100%" border="0" cellSpacing="0" cellPadding="0" className={styles.table}>
            <tbody>
            <tr className={styles.title}>
              <td >日期</td>
              <td >账变金额</td>
              <td >余额</td>
              <td >账变来源</td>
            </tr>
            {
              data.length > 0 ?
                (
                  <Fragment>
                    {
                      data.map((val) => (
                        <tr  className={styles.line} key={val.balance}>
                          <td className="his_date">
                            {val.date}
                          </td>
                          <td >{val.money}</td>
                          <td >{val.balance}</td>
                          <td >
                           {val.type}
                          </td>
                        </tr>
                      ))
                    }
                  </Fragment>
                )
                :
                <div className={styles['no-data']}>
                  暂无数据
                </div>
            }
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default Announcement;
