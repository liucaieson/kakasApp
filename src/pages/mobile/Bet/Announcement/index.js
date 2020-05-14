import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Pagination } from 'antd-mobile';
import styles from './index.scss';

import MbPageLoading from '@/components/LoadingMask';

@connect(({ announcement, loading }) => ({
  announcement,
  loading: loading.models.announcement,
}))
class Announcement extends PureComponent {
  state = {
    isShowLoading: true,
    current: 1,
    total: 1,
    size: 10
  };

  // 请求投注记录
  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      isShowLoading: true,
    });
    dispatch({
      type: 'announcement/fetch',
      payload: {
        page: 1,
        size: 10,
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
      return
    }
    if (flag === 'next') {
      currentPage += 1;
    } else {
      currentPage -= 1;
    }
    /* 边界处理 */
    if (currentPage < 1 || currentPage > Math.ceil(total / size)) {
      return
    }
    this.setState({
      isShowLoading: true,
    });
    dispatch({
      type: 'announcement/fetch',
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

  render() {
    const { announcement: { data } } = this.props;
    const { isShowLoading, total, size, current } = this.state;
    return (
      <div className={styles.announcement} >
        <div className={styles['game-tab']}>
          <div className={styles.name}>公告</div>
          <div className={styles.box}>
             {/* <span className={styles.search} >

                </span> */}
          </div>
        </div>
        {
          isShowLoading ? (
            <MbPageLoading
              bg="rgba(0,0,0,0.1)"
              color="#30717b"
            />) :
            (
              data && data.length > 0 ?
                <Fragment>
                  <ul className={styles['list-box']}>
                    {
                      data.map((val) => (
                        <li className={styles.item} key={val.messageId}>
                          <div className={styles.title}>
                            {val.date}
                          </div>
                          <div className={styles.detail}>
                            {val.messageText}
                          </div>
                        </li>
                      ))
                    }
                  </ul>
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
                </Fragment>
                : <div className="no-data">
                  暂无数据
                </div>
            )
        }
      </div>
    );
  }
}

export default Announcement;
