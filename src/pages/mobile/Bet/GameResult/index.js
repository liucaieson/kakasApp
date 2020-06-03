import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Pagination } from 'antd-mobile';
import moment from 'moment';
import Loading from '@/components/LoadingMask';
import styles from './index.scss';

const timeList = [];
let date = '';

for (let i = 0; i < 7; i += 1) {
  date = moment().subtract(i, 'day').format('YYYY-MM-DD');
  timeList.push({
      name: date,
      value: date
    }
  )
}

@connect(({ gameResult, loading }) => ({
  gameResult,
  loading: loading.models.gameResult,
}))
class GameResult extends PureComponent {
  state = {
    selectCpt: null,
    selectTime: '7天内'
  };

  defaultParams = {
    sport: '1',
    page: 1,
    size: 10,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gameResult/fetchAllCompetitions',
      payload: {
        ...this.defaultParams,
      }
    });
    this.getGameResult(1)
  }

  getGameResult = (page) => {
    const { dispatch } = this.props;
    const { selectTime, selectCpt } = this.state;
    let start = '';
    let end = '';
    if (selectTime === '7天内') {
      const today = moment().format('YYYY-MM-DD');
      const elDay = moment().subtract(7, 'day').format('YYYY-MM-DD');
      start = moment(`${elDay} 00:00:00`).format();
      end = moment(`${today} 23:59:59`).format();
    } else {
      start = moment(`${selectTime} 00:00:00`).format();
      end = moment(`${selectTime} 23:59:59`).format();
    }
    dispatch({
      type: 'gameResult/fetch',
      payload: {
        ...this.defaultParams,
        competitions: selectCpt,
        page,
        size: 10,
        start,
        end
      },
      callback: (current) => {
        this.defaultParams = {
          ...this.defaultParams,
          page: current
        }
      }
    });
  };

  /**
   * 赛果分页切换
   * @param flag 为上一个或者下一页 标记
   * @returns {boolean}
   */
  togglePage = (flag) => {
    const { loading, gameResult: { count, current } } = this.props;
    let newCurrent = 1;
    if (loading) {
      return
    }
    if (flag === 'next') {
      newCurrent = current + 1;
    } else {
      newCurrent = current - 1;
    }
    /* 边界处理 */
    if (current < 1 || current > Math.ceil(count / 10)) {
      return
    }
    this.getGameResult(newCurrent)
  };

  /**
   *  切换select中的联赛
   *  @param e
   */
  changeCpt = (e) => {
    this.setState({
      selectCpt: e.target.value
    }, () => {
      this.getGameResult(1)
    });
  };

  /**
   * 切换select中时间
   * @param e
   */
  changeTime = (e) => {
    this.setState({
      selectTime: e.target.value
    }, () => {
      this.getGameResult(1)
    });
  };

  renderMatch() {
    const { gameResult: { data }, } = this.props;
    if (data) {
      if (data.length > 0) {
        return data.map((val) => (
          <div className={styles.content}>
            <div className={styles.cptName}>{val.competitionName}</div>
            <div className={styles.line}>
              <div className={styles.time}>{moment.utc(val.matchTime).local().format('YYYY-MM-DD HH:mm')}</div>
              <div className={styles.team}>
                <div className={styles.item}>{val.hostName}</div>
                <div className={styles.item}>{val.awayName}</div>
              </div>
              <div className={styles.all}>
                <div className={styles.item}>{val.hostGoals}</div>
                <div className={styles.item}>{val.awayGoals}</div>
              </div>
              <div className={styles.half}>
                <div className={styles.item}>{val.hostHalf}</div>
                <div className={styles.item}>{val.awayHalf}</div>
              </div>
            </div>
          </div>
          ))
      }
        return <div style={{ width: '100%', height: '40px', textAlign: 'center', lineHeight: '40px' }}>无比赛</div>
    }
    return null
  }

  render() {
    const { gameResult: { count, current },
      gameResult: { competitions },
      loading } = this.props;
    const { selectCpt, selectTime } = this.state;
    return (
      <div className={styles.help}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>赛果</div>
        </div>
        <div className={styles.main}>
          <div className={styles.selection}>
            <select value={selectCpt} className={styles.select} onChange={this.changeCpt}>
              <option value="null" >全部</option>
              {
                competitions.map((item) => (
                  <option
                    value={item.competitionId}
                    key={item.competitionId}
                  >
                    {item.competitionName}
                  </option>
                ))
              }
            </select>
            <select value={selectTime} className={styles.select} onChange={this.changeTime}>
              <option value="7天内" >7天内</option>
              {
                timeList.map((item) => (
                  <option
                    value={item.value}
                    key={item.value}
                  >
                    {item.name}
                  </option>
                ))
              }
            </select>
          </div>
          <div className={styles.title}>
            <div className={styles.b1} />
            <div className={styles.b2}>全场</div>
            <div className={styles.b3}>上半场</div>
          </div>
          <div className={styles['content-box']}>
          {
            loading ?
              <div className={styles.loadingBox}>
                <Loading bg="rgba(255,255,255,.2)" loadingIconSize="40px" color="#30717b" />
              </div>
                :
              this.renderMatch()
          }
          </div>
          {
            count > 9 ?
              <Pagination
                total={Math.ceil(count / 10)}
                className={styles.pagination}
                current={current}
                locale={{
                  prevText: (<span onClick={() => this.togglePage('prev')}>上一页</span>),
                  nextText: (<span onClick={() => this.togglePage('next')}>下一页</span>),
                  }}
              /> : null
          }
        </div>
      </div>
    );
  }
}

export default GameResult;
