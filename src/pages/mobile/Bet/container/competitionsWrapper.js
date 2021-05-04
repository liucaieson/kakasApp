import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import styles from './index.scss';
import CountDown from '@/components/CountDown';
import GotoTopFooter from '@/components/GotoTopFooter';
import CompetitionsNameLayout from '@/components/CompetitionsNameLayout';
import Loading from '@/components/LoadingMask';
import Breadcrumbs from '@/components/Breadcrumbs';
import { debounce } from '@/utils/utils';

@connect(({ competitions, loading }) => ({
  competitions,
  competitionsLoading: loading.models.competitions,
}))
class CompetitionsWrapper extends PureComponent {
  timer = null;

  balanceTimer = null;

  state = {
    firstLoading: false,
    inputValue: '',
  };

  defaultParams = {
    sport: '1',
    gg: '1',
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.mainRef = React.createRef();
  }

  /* 10s轮询余额，60s轮询比赛列表，首次请求赔率列表 */
  componentDidMount() {
    const { dispatch, tabType } = this.props;
    this.setState({
      firstLoading: true,
    });

    if (tabType === 'today' || tabType === 'todayMixed') {
      this.defaultParams = {
        ...this.defaultParams,
        date: moment().format(),
        isOver: 0,
      };
    }
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.defaultParams,
      },
      callback: () => {
        this.setState({
          firstLoading: false,
        });
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
      return;
    }
    dispatch({
      type: 'competitions/fetch',
      payload: {
        ...this.defaultParams,
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

  search = (e) => {
    this.setState({
      inputValue: e.target.value.toLowerCase(),
    });
  };

  debounceSearch = (e) => {
    debounce(this.search(e));
  };

  renderTabs = () => {
    const { tabType } = this.props;
    switch (tabType) {
      case 'today':
        return (
          <div className={styles['play-tab']}>
            <div className={`${styles.tab} ${styles.active}`}>
              让球&大小
            </div>
            <Link to="/bet/todayMixedCompetitionsList" className={styles.tab}>
              混合过关
            </Link>
          </div>
        );
      case 'todayMixed':
        return (
          <div className={styles['play-tab']}>
            <Link to="/bet/todayCompetitionsList" className={styles.tab}>
              让球&大小
            </Link>
            <div className={`${styles.tab} ${styles.active}`}>
              混合过关
            </div>
          </div>
          );
      case 'asian':
        return (
          <div className={styles['play-tab']}>
            <div className={`${styles.tab} ${styles.active}`}>
              让球&大小
            </div>
            <Link
              to="/bet/asianMixedCompetitionsList"
              className={styles.tab}
            >
              混合过关
            </Link>
          </div>
        );
      case 'asianMixed':
        return (
          <div className={styles['play-tab']}>
            <Link to="/bet/asianCompetitionsList" className={styles.tab}>
              让球&大小
            </Link>
            <div className={`${styles.tab} ${styles.active}`}>
              混合过关
            </div>
          </div>
        );
      default:
        return '';
    }
  };

  render() {
    const {
      competitions: { competitions },
      tabType
    } = this.props;
    const { firstLoading, inputValue } = this.state;
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
          {
            this.renderTabs()
          }
          {
            firstLoading ?
              <Loading
                bg="rgba(0,0,0,0.1)"
                loadingIconSize="40px"
                color="#30717b"
              /> :
              <div className={styles.main}>
                <div className={styles.selection}>
                  <input className={styles.select} onInput={this.debounceSearch} placeholder="联赛查询"/>
                </div>
                <div className={styles['area-box']}>
                  {
                    competitions && competitions.filter(
                      (val) =>
                        (val.competitionName.toLowerCase().indexOf(inputValue) >= 0),
                    ).map(
                      (item) => (
                        <CompetitionsNameLayout
                          key={item.competitionId}
                          type={tabType}
                          competitionId={item.competitionId}
                          competitionName={item.competitionName}
                          matches={item.matches}
                        />
                      ))
                  }
                </div>
                <GotoTopFooter/>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default CompetitionsWrapper;
