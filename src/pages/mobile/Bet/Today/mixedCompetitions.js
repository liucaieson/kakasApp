import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './competitionsList.scss';
import moment from 'moment';
import CountDown from '@/components/CountDown';
import Loading from '@/components/LoadingMask';
import CompetitionsNameLayout from '@/components/CompetitionsNameLayout';
import GotoTopFooter from '@/components/GotoTopFooter';
import Breadcrumbs from '@/components/Breadcrumbs';

@connect(({ area, matchAllOdds, competitions, loading }) => ({
  matchAllOdds,
  competitions,
  area,
  competitionsLoading: loading.models.competitions,
}))
class Home extends PureComponent {
  timer = null;

  balanceTimer = null;

  defaultParams = {
    sport: '1',
    gg: '1',
    isOver: 0,
    date: moment().format(''),
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /* 10s轮询余额，60s轮询比赛列表，首次请求赔率列表 */
  componentDidMount() {
    this.fetchArea();
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.defaultParams
      },
    });
  }

  fetchArea = () => {
    const params = {
      sport: '1',
      gg: '1',
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'area/fetch',
      payload: params,
    });
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  setTimeFetchMatchList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.globalParams,
      },
    });
  };

  refreshMatchOdds = () => {
    const { dispatch, competitionsLoading } = this.props;
    /* 需要节流 */
    if (competitionsLoading) {
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

  render() {
    const {
      competitions: { areaId, competitionsObj },
      competitionsLoading
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
            <Link to="/bet/todayCompetitionsList" className={styles.tab}>
              让球&大小
            </Link>
            <div className={`${styles.tab} ${styles.active}`}>
              混合过关
            </div>
          </div>
          {
            competitionsLoading ?
              <Loading
                bg="rgba(0,0,0,0.1)"
                color="#30717b"
              />
              :
              <div>
                {
                  areaId.map((item) => (
                    <div className={styles['area-box']} key={item}>
                      {
                        competitionsObj[item].map((val) => (
                          <CompetitionsNameLayout
                            key={val.competitionId}
                            type="todayMixed"
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
