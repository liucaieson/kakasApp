import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { Icon, ActivityIndicator } from 'antd-mobile';

import MbPageLoading from '../../../../components/MbPageLoading/index';
import ScrollWrap from '../../../../components/ScrollWrap/index';
import CountDown from '../../../../components/CountDown';

@connect(({ announcement, loading }) => ({
  announcement,
  loading: loading.models.announcement,
}))
class Announcement extends PureComponent {
  state = {
    isShowLoading: true,
    total: 1,
    current: 1,
    size: 10,
  };

  constructor(props) {
    super(props);
  }

  /* 请求投注记录 */
  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      isShowLoading: true,
    });
    dispatch({
      type: 'announcement/fetch',
      payload: {
        page: 1,
        size: 20,
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

  /* 返回首页*/
  goBack = () => {
    const { history } = this.props;
    history.go(-1);
  };

  /* 下拉事件 */
  pullUpLoad = () => {
    const { dispatch } = this.props;
    const { current } = this.state;
    dispatch({
      type: 'announcement/fetch',
      payload: {
        page: current + 1,
        size: 10,
      },
      callback: response => {
        const { count, current } = response;
        this.setState({
          total: count,
          current,
          size: 10,
        });
        this.pullLoadDone();
      },
    });
  };


  /*调用betterScroll下拉加载完毕*/
  pullLoadDone = () => {
    this.scrollWrapChild.finishPullUp();
  };

  render() {
    const { announcement: { data }, loading } = this.props;
    const { isShowLoading } = this.state;
    return (
      <div className={styles.announcement} key='announcement'>
        <div className={styles['game-tab']}>
          <div className={styles.name}>公告</div>
          <div className={styles.box}>
             {/* <span className={styles.search} >

                </span>*/}
          </div>
        </div>
        {
          isShowLoading ? (<MbPageLoading/>) :
            (
              data && data.length > 0 ?
                <ul className={styles['list-box']}>
                  {
                    data.map((val, index) => (
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
                  {
                    loading && (
                      <div
                        style={{
                          width: '100%',
                          height: '100px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <ActivityIndicator animating size="large"/>
                        </div>
                      </div>
                    )
                  }
                </ul>
                : <div className='no-data'>
                  暂无数据
                </div>
            )
        }
      </div>

    );
  }
}

export default Announcement;
