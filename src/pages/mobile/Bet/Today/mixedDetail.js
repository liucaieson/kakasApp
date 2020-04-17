import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './deatil.scss';
import { Icon } from 'antd-mobile';
import { calcDate2 } from '@/utils/utils';
import Loading from '../../../../components/PCMask';
import DishItem from './mixedDetailDishItem';
import CountDown from '../../../../components/CountDown';
import GotoTopFooter from '../../../../components/GotoTopFooter';
import CollapseList from '../../../../components/CollapseList';

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
    this.fetchMatchOdds();
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  refreshMatchOdds = () => {
    const { dispatch, location, matchDetailLoading } = this.props;
    /* 需要节流 */
    if (matchDetailLoading) {
      return false;
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

  render() {
    const {
      matchDetail: {
        matchDetail,
      },
    } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={styles.detail} key='matchList'>
        {
          isLoading ? <Loading bg="rgba(0,0,0,.2)" loadingIconSize="40px" color="#30717b"/> :
            <div>
              <div className={styles['game-tab']}>
                <div className={styles['game-tab']}>
                  <div className={styles.item}>足球</div>
                  <div className={styles.line}>/</div>
                  <div className={styles.item}>混合过关</div>
                  <div className={styles.line}>/</div>
                  <div
                    className={styles.item}>{matchDetail.cptName}</div>
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
                      <CollapseList
                        key={val.oddId}
                        title={val.oddName}
                        isArrow={true}
                        titleStyle={{
                          height: '6vh',
                          lineHeight: '6vh',
                          fontSize: '3.4vw',
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
