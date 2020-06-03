import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './matchList.scss';
import { calcDate3 } from '@/utils/utils';
import Loading from '@/components/LoadingMask';
import DishItem from './matchDishItem';
import moment from 'moment';
import CountDown from '@/components/CountDown';
import GotoTopFooter from '@/components/GotoTopFooter';
import Breadcrumbs from '@/components/Breadcrumbs';

@connect(({ matchList, userInfo, competitions, loading }) => ({
  matchList,
  competitions,
  userInfo,
  matchListLoading: loading.effects['matchList/fetchMatchOdds'],
}))
class BetPage extends PureComponent {
  timer = null;

  state = {
    isLoading: true,
  };

  defaultParams = {
    sport: '1',
    gg: '1',
    isOver: 0,
    date: moment().format(),
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /* 10s轮询余额，60s轮询比赛列表，首次请求赔率列表 */
  componentDidMount() {
    this.fetchMatchOdds();
  }

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTimeFetchMatchList = () => {
    this.fetchMatchOdds();
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  refreshMatchOdds = () => {
    const { dispatch, location, matchListLoading } = this.props;
    /* 需要节流 */
    if (matchListLoading) {
      return
    }
    const { query } = location;
    const { competitionId } = query;
    dispatch({
      type: 'matchList/fetchMatchOdds',
      payload: {
        ...this.defaultParams,
        competitions: competitionId,
      },
      callback: () => {
        this.countRef.reset();
      },
    });
  };

  fetchMatchOdds = () => {
    const { dispatch, location } = this.props;
    const { query } = location;
    const { competitionId } = query;
    dispatch({
      type: 'matchList/fetchMatchOdds',
      payload: {
        competitions: competitionId,
        ...this.defaultParams
      },
      callback: () => {
        this.setState({
          isLoading: false,
        });
      },
    });
  };

  render() {
    const {
      location,
      competitions: { competitionsMap },
      matchList: { times, matchObj },
    } = this.props;
    const { query } = location;
    const { competitionId } = query;
    const { isLoading } = this.state;

    return (
      <div className={styles.matchList}>
        <div className={styles['game-tab']}>
          <Breadcrumbs
            separator="/"
          >
            <span>足球</span>
            <span className={styles.item}>
              {competitionsMap[competitionId] && competitionsMap[competitionId].competitionName}
            </span>
          </Breadcrumbs>
          <div className={styles.box}>
            <span className={styles.time} onClick={this.refreshMatchOdds}>
              <CountDown
                onCountDownRef={this.onCountDownRef}
                time="60"
                onEnd={this.setTimeFetchMatchList}
              />
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
          isLoading ? <Loading bg="rgba(0,0,0,0.1)" loadingIconSize="40px" color="#30717b"/> :
            <div className={styles.main} ref={this.mainRef}>
              {
                times.map((v) => (
                  <div key={v}>
                    {
                      matchObj[v].map((val) => (
                        <div className={styles['match-item']} key={val.matchId}>
                          <div className={styles['match-date']}>
                            <div className={styles.content}>
                              <div className={styles.inplay}>今日</div>
                              <div className={styles.time}>{calcDate3(val.time)}</div>
                            </div>
                            <div className={styles.text}>让球</div>
                            <div className={styles.text}>大/小</div>
                            <div />

                          </div>
                          <div className={styles['match-odds']}>
                            <div className={styles['match-info']}>
                              <div className={styles['home-name']}>{val.homeName}</div>
                              <div className={styles['away-name']}>{val.awayName}</div>
                            </div>
                            <div className={styles['match-bet']}>
                              {
                                val.odds[0].chs.map((item) => (
                                  item.name === '1' &&
                                  <DishItem
                                    key={item.choiceId}
                                    choiceId={item.choiceId}
                                    matchId={val.matchId}
                                    choiceHandicap={item.choiceHandicap}
                                    dishId={item.dishId}
                                    dish={item.dish}
                                    name={item.name}
                                  />
                                ))
                              }
                              {
                                val.odds[0].chs.map((item) => (
                                  item.name === '2' &&
                                  <DishItem
                                    key={item.choiceId}
                                    choiceId={item.choiceId}
                                    matchId={val.matchId}
                                    choiceHandicap={item.choiceHandicap}
                                    dishId={item.dishId}
                                    dish={item.dish}
                                    name={item.name}
                                  />
                                ))
                              }
                            </div>
                            <div className={styles['match-bet']}>
                              {
                                val.odds[1].chs.map((item) => (
                                  item.name === 'Over' &&
                                  <DishItem
                                    key={item.choiceId}
                                    choiceId={item.choiceId}
                                    matchId={val.matchId}
                                    choiceHandicap={item.choiceHandicap}
                                    dishId={item.dishId}
                                    dish={item.dish}
                                    name={item.name}
                                  />
                                ))
                              }
                              {
                                val.odds[1].chs.map((item) => (
                                  item.name === 'Under' &&
                                  <DishItem
                                    key={item.choiceId}
                                    choiceId={item.choiceId}
                                    choiceHandicap={item.choiceHandicap}
                                    matchId={val.matchId}
                                    dishId={item.dishId}
                                    dish={item.dish}
                                    name={item.name}
                                  />
                                ))
                              }
                            </div>
                          </div>
                          <Link to={`/bet/todayDetail?matchId=${val.matchId}`} className={styles['match-play']}>
                            <div className={styles.text}>{val.amount}</div>
                            <div className={styles.text}>玩法</div>
                            <div className={styles.arrow} />
                          </Link>

                        </div>
                      ))
                    }
                  </div>
                ))
              }
              <GotoTopFooter/>
            </div>
        }
      </div>
    );
  }
}

export default BetPage;
