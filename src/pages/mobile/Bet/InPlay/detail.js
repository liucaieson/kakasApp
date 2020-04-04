import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './deatil.scss';
import { Icon } from 'antd-mobile';
import { calcDate4 } from '@/utils/utils';
import Loading from '../../../../components/PCMask';
import DishItem from './detailDishItem';
import CountDown from '../../../../components/CountDown';
import GotoTopFooter from '../../../../components/GotoTopFooter';

@connect(({ inPlay, loading }) => ({
  inPlay,
  oddsLoading: loading.effects['inPlay/fetchMatchAllOdds'],
}))
class InPlayDetailPage extends PureComponent {

  timer = null;
  balanceTimer = null;
  state = {
    showOdds: [],
    firstLoading: true,
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

  /*10s轮询余额，60s轮询比赛列表，首次请求赔率列表*/
  componentDidMount() {
    const { dispatch, location } = this.props;
    const { query } = location;
    const { matchId } = query;
    this.globalParams = {
      ...this.globalParams,
      match: matchId
    };
    dispatch({
      type: 'inPlay/fetchMatchAllOdds',
      payload: { ...this.globalParams, match: matchId },
      callback: () => {
        this.setState({
          firstLoading: false,
        });
      },
    });
  }

  setTimeFetchMatchList = () => {
    this.fetchMatchOdds();
  };

  refreshMatchOdds = () => {
    const { dispatch, oddsLoading } = this.props;
    /* 需要节流 */
    if(oddsLoading){
      return false
    }
    dispatch({
      type: 'inPlay/fetchMatchAllOdds',
      payload: {...this.globalParams},
      callback: () => {
        this.countRef.reset();
      },
    });
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
    const { dispatch, location } = this.props;
    const { query } = location;
    const { matchId } = query;
    dispatch({
      type: 'inPlay/fetchMatchAllOdds',
      payload: {
        ...this.globalParams,
        match: matchId,
      },
    });
  };

  /*获取better-scroll的this，赋值给scrollWrapChild
  * */
  onScrollWrapRef = (ref) => {
    this.scrollWrapChild = ref;
  };

  goBack = () => {
    const { history } = this.props;
    history.go(-1);
  };

  /* 控制盘口显示隐藏 */
  showArea = (id) => {
    const { showOdds } = this.state;
    showOdds.push(id);
    const arr = showOdds.concat();
    this.setState({
      showArea: arr,
    });
  };

  closeArea = (id) => {
    const { showOdds } = this.state;
    const index = showOdds.indexOf(id);
    showOdds.splice(index, 1);
    const arr = showOdds.concat();
    this.setState({
      showArea: arr,
    });
  };

  render() {
    const {
      inPlay: {
        inPlayAllOdds,
      },
    } = this.props;
    const { showOdds, firstLoading } = this.state;
    return (
      <div className={styles.detail} key='matchList'>
        {
          firstLoading ? <Loading bg="rgba(0,0,0,.2)" loadingIconSize="40px" color="#30717b"/> :
            (
              inPlayAllOdds[0] ?
                <div>
                  <div className={styles['game-tab']}>
                    <div className={styles['game-tab']}>
                      <div className={styles.item}>足球</div>
                      <div className={styles.line}>/</div>
                      <div
                        className={styles.item}>
                          {inPlayAllOdds[0].cptName}
                        </div>
                      <div className={styles.box}>
                        <span className={styles.time} onClick={this.refreshMatchOdds}>
                          <CountDown
                            onCountDownRef={this.onCountDownRef}
                            time='10'
                            onEnd={this.setTimeFetchMatchList}/>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.main} ref={this.mainRef}>
                    <div className={styles.content}>
                      <div className={styles.date}>
                        {inPlayAllOdds[0].period && calcDate4(inPlayAllOdds[0].period)}
                      </div>
                      <div className={styles.score}>
                        <div className={styles['home-score']}>{inPlayAllOdds[0].soccer && inPlayAllOdds[0].soccer.split('-')[0]}</div>
                        <div className={styles.vs}>|</div>
                        <div className={styles['away-score']}>{inPlayAllOdds[0].soccer && inPlayAllOdds[0].soccer.split('-')[1]}</div>
                      </div>
                      <div className={styles.team}>
                        <div className={styles['home-name']}>{inPlayAllOdds[0].homeName}</div>
                        <div className={styles.vs} />
                        <div className={styles['away-name']}>{inPlayAllOdds[0].awayName}</div>
                      </div>
                    </div>
                    <div className={styles['all-odds']}>
                      {
                        inPlayAllOdds[0].odds && inPlayAllOdds[0].odds.map((val) => (
                          <div className={styles['odds-box']} key={val.oddId}>
                            <div className={styles['odds-name']}>
                              {
                                showOdds.includes(val.oddId) ?
                                  <div className={styles.arrow} onClick={() => this.closeArea(val.oddId)}>
                                    <Icon type="down"/>
                                  </div> :
                                  <div className={styles.arrow} onClick={() => this.showArea(val.oddId)}>
                                    <Icon type="up"/>
                                  </div>
                              }
                              <div className={styles.name}>{val.oddName}</div>
                            </div>
                            <div className={styles['odds-item']}>
                              {
                                showOdds.includes(val.oddId) ? ''
                                  : val.chs.map((item) => (
                                    <DishItem
                                      key={item.choiceId}
                                      choiceId={item.choiceId}
                                      matchId={inPlayAllOdds[0].matchId}
                                      gamblingId={val.gamblingId}
                                      dishId={item.dishId}
                                      dish={item.dish}
                                      name={item.name}
                                      choiceHandicap={item.choiceHandicap}
                                      oddId={val.oddId}
                                      homeName={inPlayAllOdds[0].homeName}
                                      awayName={inPlayAllOdds[0].awayName}
                                    />
                                  ))
                              }
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <GotoTopFooter />
                </div>
                :
                <div className={styles.main}>
                  <div className={styles['game-tab']}>
                    <div className={styles.item}>足球</div>
                    <div className={styles.line}>/</div>
                    <div className={styles.item}>滚球</div>
                    <div className={styles.line}>/</div>
                    <div className={styles.team}>无比赛</div>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.stop}>
                      滚球结束
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
