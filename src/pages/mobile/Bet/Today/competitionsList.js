import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import styles from './competitionsList.scss';
import CountDown from '@/components/CountDown';
import GotoTopFooter from '@/components/GotoTopFooter';
import CompetitionsNameLayout from '@/components/CompetitionsNameLayout';
import Loading from '@/components/LoadingMask';
import Breadcrumbs from '@/components/Breadcrumbs';

@connect(({ competitions, loading }) => ({
  competitions,
  competitionsLoading: loading.models.competitions,
}))
class Home extends PureComponent {
  timer = null;

  balanceTimer = null;

  defaultParams = {
    sport: '1',
    gg: '1',
    date: moment().format(),
    isOver: 0
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /* 10s轮询余额，60s轮询比赛列表，首次请求赔率列表 */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.defaultParams
      },
    });
  }

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  setTimeFetchMatchList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.defaultParams,
      },
    });
  };

  refreshMatchOdds = () => {
    const { dispatch, oddsLoading } = this.props;
    /* 需要节流 */
    if (oddsLoading) {
      return
    }
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.defaultParams
      },
      callback: () => {
        this.countRef.reset();
      },
    });
  };

  fetchMatchOdds = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.defaultParams,
      },
    });
  };

  render() {
    const {
      competitions: { areaId, competitionsObj },
      competitionsLoading,
    } = this.props;
    return (
      <div className={styles.box} key="home">
        <div className={styles.main} ref={this.mainRef}>
          <div className={styles['game-tab']}>
            <Breadcrumbs
              separator="/"
            >
              <span>足球</span>
            </Breadcrumbs>
            <div className={styles.box}>
              <span className={styles.time} onClick={this.refreshMatchOdds}>
                <CountDown
                  onCountDownRef={this.onCountDownRef}
                  time="60"
                  onEnd={this.setTimeFetchMatchList}/>
                </span>
            </div>
          </div>
          <div className={styles['play-tab']}>
            <div className={`${styles.tab} ${styles.active}`}
            >让球&大小
            </div>
            <Link to="/bet/todayMixedCompetitionsList" className={styles.tab}
            >混合过关</Link>
          </div>
          {
            competitionsLoading ?
              <Loading
                bg="rgba(0,0,0,0.1)"
                loadingIconSize="40px"
                color="#30717b"
              /> :
              <div>
                {
                  areaId.map((item) => (
                    <div className={styles['area-box']} key={item}>
                      {
                        competitionsObj[item].map((val) => (
                          <CompetitionsNameLayout
                            key={val.competitionId}
                            type="today"
                            competitionId={val.competitionId}
                            competitionName={val.competitionName}
                            matches={val.matches}
                          />
                        ))
                      }
                    </div>
                  ))
                }
                <GotoTopFooter/>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default Home;
