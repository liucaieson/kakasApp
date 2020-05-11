import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './index.scss';

@connect(({ userInfo }) => ({
  userInfo,
}))
class Home extends PureComponent {
  timer = null;

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  // 10s轮询余额，60s轮询比赛列表，首次请求赔率列表
  componentDidMount() {
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

  render() {
    return (
      <div className={styles.today}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>今日赛事</div>
        </div>
        <div className={styles['game-list']}>
          <Link to="/bet/todayCompetitionsList" className={styles.item}>
            <span className={`${styles.icon} ${styles.ball}`} />
            <span className={styles.name}>足球</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
