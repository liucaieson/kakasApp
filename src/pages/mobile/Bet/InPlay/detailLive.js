import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './deatil.scss';
import CountDown from '@/components/CountDown';
import CollapseList from '@/components/CollapseList';

@connect(({ inPlay, loading }) => ({
  inPlay,
  oddsLoading: loading.effects['inPlay/fetchMatchAllOdds'],
}))
class InPlayDetailPage extends PureComponent {
  timer = null;

  balanceTimer = null;

  state = {
    host: '',
    hostScore: 0,
    away: '',
    awayScore: 0,
  };

  globalParams = {
    sport: '1',
    gg: '1',
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /* 10s轮询余额，60s轮询比赛列表，首次请求赔率列表 */
  componentDidMount() {
    const { location } = this.props;
    const { query } = location;
    const { match } = query;
    if (match === '0') {
      window.frames.videoIFrame.location.href = 'https://player.youku.com/embed/XNDUxMzU0ODg2OA==';
      this.setState({
        host: '德国',
        hostScore: 7,
        away: '巴西',
        awayScore: 1,
      });
    }
    if (match === '1') {
      window.frames.videoIFrame.location.href = 'https://player.youku.com/embed/XMTczMzk0ODQ3Mg==';
      this.setState({
        host: '德国',
        hostScore: 1,
        away: '阿根廷',
        awayScore: 0,
      });
    }

    if (match === '2') {
      window.frames.videoIFrame.location.href = 'https://player.youku.com/embed/XMjc5NDU3NjIyOA==';
      this.setState({
        host: '尤文图斯',
        hostScore: 0,
        away: '巴塞罗娜',
        awayScore: 3,
      });
    }
  }

  setTimeFetchMatchList = () => {

  };

  refreshMatchOdds = () => {

  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /* 请求比赛所有玩法的赔率赔率 */
  fetchMatchOdds = () => {

  };

  render() {
    const { host, hostScore, away, awayScore } = this.state;
    return (
      <div className={styles.detail} key="matchList">
        {
          (
            <div>
              <div className={styles['game-tab']}>
                <div className={styles['game-tab']}>
                  <div className={styles.item}>足球</div>
                  <div className={styles.line}>/</div>
                  <div className={styles.item}>
                    世界杯
                  </div>
                  <div className={styles.box}>
                    <span className={styles.time} onClick={this.refreshMatchOdds}>
                      <CountDown
                        onCountDownRef={this.onCountDownRef}
                        time="10"
                        onEnd={this.setTimeFetchMatchList}/>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.main} ref={this.mainRef}>
                <div className={styles.content}>
                  <div className={styles.date}>
                    2014-6-2
                  </div>
                  <div className={styles.score}>
                    <div className={styles['home-score']}>{hostScore}</div>
                    <div className={styles.vs}>|</div>
                    <div className={styles['away-score']}>{awayScore}</div>
                  </div>
                  <div className={styles.team}>
                    <div className={styles['home-name']}>{host}</div>
                    <div className={styles.vs}/>
                    <div className={styles['away-name']}>{away}</div>
                  </div>
                </div>
                <div className={styles.liveBox}>
                  <iframe className={styles.iframe} name="videoIFrame" width="100%" height="100%"
                          src="https://player.youku.com/embed/XNDUxMzU0ODg2OA==" frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen/>
                </div>
                <div className={styles['all-odds']}>
                  <CollapseList
                    key={1}
                    title="相关信息"
                    isArrow
                    titleStyle={{
                      height: '6vh',
                      lineHeight: '6vh',
                      fontSize: '3.4vw',
                    }}
                  >
                    <div className={styles.info}>
                      此赛事暂时停止收注或已关闭
                    </div>
                  </CollapseList>
                </div>
              </div>
            </div>

          )
        }

      </div>
    );
  }
}

export default InPlayDetailPage;
