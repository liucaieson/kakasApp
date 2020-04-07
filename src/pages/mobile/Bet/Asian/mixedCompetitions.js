import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './competitionsList.scss';
import CountDown from '../../../../components/CountDown';
import Loading from '../../../../components/PCMask';
import GotoTopFooter from '../../../../components/GotoTopFooter';

@connect(({ area, competitions, loading }) => ({
  competitions,
  area,
  competitionsLoading:loading.effects['competitions/fetch']
}))
class Home extends PureComponent {

  timer = null;
  balanceTimer = null;
  state = {
    showMatch: [],
    tab: '1',
    selectArea:'all'
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

  setTimeFetchMatchList = () => {
    this.fetchMatchOdds()
  };

  /* 获取倒计时组件的this */
  onCountDownRef = (ref) => {
    this.countRef = ref;
  };

  refreshMatchOdds = () => {
    const { dispatch, competitionsLoading } = this.props;
    /* 需要节流 */
    if(competitionsLoading){
      return false
    }
    dispatch({
      type: 'competitions/fetch',
      payload: {
        sport: '1',
        gg: '1',
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
        sport: '1',
        gg: '1',
      },
    });
  };

  change = () => {
    let mySelect = document.getElementById('area');
    let index = mySelect.selectedIndex;
    let value = mySelect.options[index].value;
    this.setState({
      selectArea: value
    })
  };

  render() {
    const {
      competitions: { areaId, competitionsObj },
      competitionsLoading
    } = this.props;
    const { selectArea } = this.state;
    return (
      <div className={styles.box} >
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
            <Link to='/bet/asianCompetitionsList' className={styles.tab}>
              让球&大小
            </Link>
            <div className={styles.tab + ' ' + styles.active}>
              混合过关
            </div>
          </div>
          {
            competitionsLoading ? <Loading bg="rgba(0,0,0,0.1)" loadingIconSize="40px" color="#30717b"/> :
              <div>
                <div className={styles.selection}>
                  <select id='area' name='sports' value={selectArea} className={styles.select} onChange={this.change}>
                    <option value={'all'} >全部</option>
                    {
                      areaId.map((item) => (
                        <option
                          value={competitionsObj[item][0].areaId}
                          key={competitionsObj[item][0].areaId}
                        >{competitionsObj[item][0].areaName}</option>
                      ))
                    }
                  </select>
                </div>
                {
                  selectArea === 'all' ?
                    areaId.map((item) => (
                      <div className={styles['area-box']} key={item}>
                        {
                          competitionsObj[item].map((val) => (
                            <Link key={val.competitionId} className={styles['competition-box']}
                                  to={`/bet/asianMixedMatchList?competitionId=${val.competitionId}`}>
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
                    :  competitionsObj[selectArea].map((val) => (
                      <div className={styles['area-box']} key={val.competitionId} >
                        <Link key={val.competitionId} className={styles['competition-box']}
                              to={`/bet/asianMatchList?competitionId=${val.competitionId}`}>
                          <div className={styles['name-box']}>
                            <div className={styles.name}>
                              {val.competitionName}
                            </div>
                            <div className={styles.count}>
                              {val.matches}
                            </div>
                          </div>
                        </Link>
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
