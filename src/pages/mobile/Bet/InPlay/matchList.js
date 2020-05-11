import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { calcDate4 } from '@/utils/utils';
import styles from './matchList.scss';
import Loading from '@/components/PCMask';
import CountDown from '@/components/CountDown/index';
import DishItem from './matchListDishItem';
import GotoTopFooter from '@/components/GotoTopFooter';

@connect(({ inPlay, loading }) => ({
  inPlay,
  oddsLoading: loading.effects['inPlay/fetchMatchOdds'],
}))
class RoundPage extends PureComponent {
  timer = null;

  state = {
    firstLoading: true,
  };

  /* 存储全局的参数 */
  globalParams = {
    sport: '1',
    gg: '1',
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /* 10s轮询余额，10s轮询比赛列表，首次请求赔率列表 */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'inPlay/fetchMatchOdds',
      payload: { ...this.globalParams },
      callback: () => {
        this.setState({
          firstLoading: false,
        });
      },
    });
  }

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /* 请求比赛赔率 */
  fetchMatchOdds = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'inPlay/fetchMatchOdds',
      payload: { ...this.globalParams },
    });
  };

  setTimeFetchMatchList = () => {
    this.fetchMatchOdds();
  };

  refreshMatchOdds = () => {
    const { dispatch, oddsLoading } = this.props;
    /* 需要节流 */
    if (oddsLoading) {
      return false;
    }
    dispatch({
      type: 'inPlay/fetchMatchOdds',
      payload: { ...this.globalParams },
      callback: () => {
        this.countRef.reset();
      },
    });
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  goBack = () => {
    const { history } = this.props;
    history.go(-1);
  };

  render() {
    const {
      inPlay: { cptIds, matchListObj },
    } = this.props;
    const { firstLoading } = this.state;

    return (
      <div className={styles.matchList} >
        <div className={styles['game-tab']}>
          <div className={styles.item}>足球</div>
          <div className={styles.line}>/</div>
          <div className={styles.item}>滚球</div>
          <div className={styles.box}>
          <span className={styles.time} onClick={this.refreshMatchOdds}>
            <CountDown
              onCountDownRef={this.onCountDownRef}
              time="10"
              onEnd={this.setTimeFetchMatchList}/>
          </span>
          </div>
        </div>
        {
          firstLoading ? <Loading
              bg="rgba(0,0,0,0.1)"
              loadingIconSize="40px"
              color="#30717b"
            /> :
            <div className={styles.main} ref={this.mainRef}>
              {
                cptIds.length === 0 ?
                  <div className={styles.none}>
                    <div className={styles.noimg}/>
                    <h3 className={styles.a1}>
                      当前没有可以显示的滚球赛事
                    </h3>
                    <h4 className={styles.a2}>
                      您可以选择其他的玩法
                    </h4>
                  </div>
                  :
                  cptIds.map((val) => (
                    <div key={val}>
                      {
                        matchListObj[val].map((val) => (
                          <div className={styles['match-item']} key={val.matchId}>
                            <div className={styles['match-date']}>
                              <div className={styles.content}>
                                <div className={styles.inplay}>
                                  {val.soccer}
                                </div>
                                <div className={styles.time}>
                                  {
                                    val.period >= 0 ?
                                      <div className={styles['round-time']}>
                                      <span className={styles.in}>
                                       {calcDate4(val.period)}
                                      </span>
                                      </div>
                                      : <div
                                        className={styles.time}>
                                      <span
                                        className={styles.day}>{val.time.substring(8, 10)}:{val.time.substring(10, 12)}</span>
                                      </div>
                                  }</div>
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
                                  val.odds[0].chs.length === 0 ?
                                    <Fragment>
                                      <div className={styles.lock}>
                                        <span className={styles.icon}/>
                                      </div>
                                      <div className={styles.lock}>
                                        <span className={styles.icon}/>
                                      </div>
                                    </Fragment>
                                    :
                                    <Fragment>
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
                                    </Fragment>
                                }
                              </div>
                              <div className={styles['match-bet']}>
                                {
                                  val.odds[1].chs.length === 0 ?
                                    <Fragment>
                                      <div className={styles.lock}>
                                        <span className={styles.icon}/>
                                      </div>
                                      <div className={styles.lock}>
                                        <span className={styles.icon}/>
                                      </div>
                                    </Fragment>
                                    :
                                    <Fragment>
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
                                    </Fragment>
                                }

                              </div>
                            </div>
                            <Link to={`/bet/inPlayDetail?matchId=${val.matchId}`} className={styles['match-play']}>
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

export default RoundPage;
