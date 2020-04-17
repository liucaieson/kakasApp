import React, { PureComponent } from 'react';
import { connect } from 'dva';
import  { Accordion } from 'antd-mobile';
import Link from 'umi/link';
import styles from './index.scss';

@connect(({  loading, userInfo, }) => ({
  userInfo,
}))
class Home extends PureComponent {

  timer = null;
  balanceTimer = null;
  state = {
    showId: 1
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /*10s轮询余额，60s轮询比赛列表，首次请求赔率列表*/
  componentDidMount() {
    this.fetchArea();
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        sport: '1',
        gg: '1'
      }
    });
  }

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.balanceTimer);
  }

  /**
   * 请求联赛区域接口
   */
  fetchArea = () => {
    let params = {
      sport: '1',
      gg: '1'
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'area/fetch',
      payload: params,
    });
  };

  render() {
    return (
      <div className={styles.asian}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>早盘赛事</div>
        </div>
        <div className={styles['game-list']}>
          <Link to='/bet/asianCompetitionsList' className={styles.item}>
            <span className={styles.icon + ' ' + styles.ball}  />
            <span className={styles.name}>足球</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
