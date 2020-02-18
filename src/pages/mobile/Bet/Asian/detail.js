import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './deatil.scss';
import { Icon } from 'antd-mobile';
import { calcDate2 } from '@/utils/utils';
import Loading from '../../../../components/PCMask';
import DishItem from './detailDishItem';
import CountDown from '../../../../components/CountDown';
import GotoTopFooter from '../../../../components/GotoTopFooter';

@connect(({ matchDetail, matchAllOdds, competitions, userInfo, loading }) => ({
  matchDetail,
  competitions,
  matchAllOdds,
  userInfo,
  matchDetailLoading: loading.effects['matchDetail/fetchMatchOdds'],
}))
class DetailPage extends PureComponent {

  timer = null;
  balanceTimer = null;
  state = {
    showOdds: [],
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /*10s轮询余额，60s轮询比赛列表，首次请求赔率列表*/
  componentDidMount() {
    this.fetchMatchOdds();
    this.timer = window.setInterval(
      this.fetchMatchOdds()
      , 60000);
  }

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.balanceTimer);
  }

  fetchMatchOdds = () => {
    const { dispatch, location } = this.props;
    const { query } = location;
    const { matchId } = query;

    dispatch({
      type: 'matchDetail/fetchMatchOdds',
      payload: {
        sport: '1',
        gg: '1',
        match: matchId,
      },
      callback: () => {
        this.setState({
          isLoading: false,
        });
      },
    });
  };

  setTimeFetchMatchList = () => {
    this.fetchMatchOdds()
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  refreshMatchOdds = () => {
    const { dispatch, location, matchDetailLoading } = this.props;
    /* 需要节流 */
    if(matchDetailLoading){
      return false
    }
    const { query } = location;
    const { matchId } = query;
    dispatch({
      type: 'matchDetail/fetchMatchOdds',
      payload: {
        sport: '1',
        gg: '1',
        match: matchId,
      },
      callback: () => {
        this.countRef.reset();
      },
    });
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
      matchDetail: {
        matchDetail,
      },
    } = this.props;
    const { showOdds, isLoading } = this.state;
    return (
      <div className={styles.detail}>
        {
          isLoading ? <Loading bg="rgba(0,0,0,.2)" loadingIconSize="40px" color="#30717b"/> :
            <div>
              <div className={styles['game-tab']}>
                <div className={styles['game-tab']}>
                  <div className={styles.item}>足球</div>
                  <div className={styles.line}>/</div>
                  <div
                    className={styles.item}>{matchDetail.cptName}
                  </div>
                  <div className={styles.box}>
                    <span className={styles.time} onClick={this.refreshMatchOdds}>
                        <CountDown
                          onCountDownRef={this.onCountDownRef}
                          time='60'
                          onEnd={this.setTimeFetchMatchList}/>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.main} ref={this.mainRef}>
                <div className={styles.content}>
                  <div className={styles.date}>
                    {matchDetail.time && calcDate2(matchDetail.time)}
                  </div>
                  <div className={styles.team}>
                    <div className={styles['home-name']}>{matchDetail.homeName}</div>
                    <div className={styles.vs}>|</div>
                    <div className={styles['away-name']}>{matchDetail.awayName}</div>
                  </div>
                </div>
                <div className={styles['all-odds']}>
                  {
                    matchDetail.odds && matchDetail.odds.map((val) => (
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
                                  matchId={matchDetail.matchId}
                                  gamblingId={val.gamblingId}
                                  dishId={item.dishId}
                                  dish={item.dish}
                                  name={item.name}
                                  choiceHandicap={item.choiceHandicap}
                                  oddId={val.oddId}
                                  homeName={matchDetail.homeName}
                                  awayName={matchDetail.awayName}
                                />
                              ))
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <GotoTopFooter/>
            </div>
        }

      </div>
    );
  }
}

export default DetailPage;
