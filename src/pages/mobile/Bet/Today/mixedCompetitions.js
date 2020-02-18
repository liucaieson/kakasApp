import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './competitionsList.scss';
import moment from 'moment';
import CountDown from '../../../../components/CountDown';
import Loading from '../../../../components/PCMask';
import GotoTopFooter from '../../../../components/GotoTopFooter';

@connect(({ area, matchAllOdds, competitions, loading }) => ({
  matchAllOdds,
  competitions,
  area,
  competitionsLoading: loading.models.competitions,
}))
class Home extends PureComponent {

  timer = null;
  balanceTimer = null;
  state = {
    showMatch: [],
    tab: '1',
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
        gg: '1',
        date: moment().format('YYYY-MM-DD'),
      },
    });
  }

  fetchArea = () => {
    let params = {
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
      return false;
    }
    dispatch({
      type: 'competitions/fetch',
      payload: {
        sport: '1',
        gg: '1',
        date: moment().format('YYYY-MM-DD'),
      },
      callback: () => {
        this.countRef.reset();
      },
    });
  };

  gotoTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const {
      competitions: { areaId, competitionsObj },
      competitionsLoading
    } = this.props;
    return (
      <div className={styles.box} key='home'>
        <div className={styles.main} ref={this.mainRef}>
          <div className={styles['game-tab']}>
            <div className={styles.name}>足球</div>
            <div className={styles.box}>
              <span className={styles.time} onClick={this.refreshMatchOdds}>
                  <CountDown
                    onCountDownRef={this.onCountDownRef}
                    time='60'
                    onEnd={this.setTimeFetchMatchList}/>
                </span>
            </div>
          </div>
          <div className={styles['play-tab']}>
            <Link to='/bet/todayCompetitionsList' className={styles.tab}>
              让球&大小
            </Link>
            <div className={styles.tab + ' ' + styles.active}>
              混合过关
            </div>
          </div>
          {
            competitionsLoading ? <Loading bg="rgba(0,0,0,0.1)" loadingIconSize="40px" color="#30717b"/> :
              <div>
                {
                  areaId.map((item) => (
                    <div className={styles['area-box']} key={item}>
                      {
                        competitionsObj[item].map((val) => (
                          <Link key={val.competitionId} className={styles['competition-box']}
                                to={`/bet/todayMixedMatchList?competitionId=${val.competitionId}`}>
                            <div className={styles['name-box']}>
                              <div className={styles.name}>
                                {val.competitionName}
                              </div>
                              <div className={styles.count}>
                                {val.matches}
                              </div>
                            </div>
                          </Link>
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
