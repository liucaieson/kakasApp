import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './deatil.scss';
import { calcDate2 } from '@/utils/utils';
import Loading from '@/components/LoadingMask';
import DishItem from './detailDishItem';
import CountDown from '@/components/CountDown';
import GotoTopFooter from '@/components/GotoTopFooter';
import CollapseList from '@/components/CollapseList';
import Breadcrumbs from '@/components/Breadcrumbs';

@connect(({ matchDetail, matchAllOdds, competitions, userInfo, chsDB, loading }) => ({
  matchDetail,
  competitions,
  matchAllOdds,
  userInfo,
  chsDB,
  matchDetailLoading: loading.effects['matchDetail/fetchMatchOdds'],
}))
class DetailPage extends PureComponent {
  timer = null;

  balanceTimer = null;

  state = {
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /* 10s轮询余额，60s轮询比赛列表，首次请求赔率列表 */
  componentDidMount() {
    this.fetchMatchOdds();
    this.timer = window.setInterval(
      this.fetchMatchOdds(),
       60000);
  }

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.balanceTimer);
  }

  /**
   * 根据url参数请求比赛赔率列表
    */
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

  /**
   * 倒计时结束触发
   */
  setTimeFetchMatchList = () => {
    this.fetchMatchOdds()
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  /**
   * 60s请求一次match接口
   * @returns {boolean}
   */
  refreshMatchOdds = () => {
    const { dispatch, location, matchDetailLoading } = this.props;
    /* 需要节流 */
    if (matchDetailLoading) {
      return
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

  render() {
    const {
      matchDetail: {
        matchDetail,
      },
      chsDB: { chsDB }
    } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={styles.detail}>
        {
          isLoading ? <Loading bg="rgba(0,0,0,.2)" loadingIconSize="40px" color="#30717b"/> :
            <div>
              <div className={styles['game-tab']}>
                <Breadcrumbs
                  separator="/"
                >
                  <span>足球</span>
                  <span>{matchDetail.cptName}</span>
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
                      <CollapseList
                        key={val.oddId}
                        title={val.oddName}
                        isArrow
                        titleStyle={{
                          height: '6vh',
                          lineHeight: '6vh',
                          fontSize: '3.4vw'
                        }}
                      >
                        <div className={styles['odds-item']}>
                          {
                            val.chs.map((item) => (
                                <DishItem
                                  key={item.choiceId}
                                  choiceId={item.choiceId}
                                  matchId={matchDetail.matchId}
                                  gamblingId={val.gamblingId}
                                  dishId={chsDB[item.choiceId] && chsDB[item.choiceId].dishId}
                                  dish={ chsDB[item.choiceId] && chsDB[item.choiceId].dish}
                                  name={item.name}
                                  choiceHandicap={item.choiceHandicap}
                                  oddId={val.oddId}
                                  homeName={matchDetail.homeName}
                                  awayName={matchDetail.awayName}
                                />
                              ))
                          }
                        </div>
                      </CollapseList>
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
