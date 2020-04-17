import React, { PureComponent } from 'react';
import styles from './index.scss';
import { connect } from 'dva';
import Loading from '../../../../components/PCMask';
import { Pagination } from 'antd-mobile';
import moment from 'moment';

const timeList = [];
let date = '';

for (let i = 0; i < 7; i++) {
  date = moment().subtract(i, 'day').format('YYYY-MM-DD');
  timeList.push({
      name:date,
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
    selectTime: moment().format('YYYY-MM-DD')
  };

  defaultParams = {
    sport: '1'
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { selectTime } = this.state;
    dispatch({
      type: 'gameResult/fetchAllCompetitions',
      payload: {
        ...this.defaultParams,
      }
    });
    dispatch({
      type: 'gameResult/fetch',
      payload: {
        ...this.defaultParams,
        page:1,
        size:10,
        start:selectTime,
        end:selectTime
      },
    });
  }

  /**
   * 赛果分页切换
   * @param flag 为上一个或者下一页 标记
   * @returns {boolean}
   */
  togglePage = (flag) => {
    const { dispatch, loading, gameResult: { count, current } } = this.props;
    const { selectTime, selectCpt } = this.state;
    let newCurrent = 1;
    if (loading) {
      return false;
    }
    if (flag === 'next') {
      newCurrent = current + 1;
    } else {
      newCurrent = current - 1;
    }
    /* 边界处理 */
    if(current < 1 || current > Math.ceil(count / 10) ){
      return false
    }
    dispatch({
      type: 'gameResult/fetch',
      payload: {
        page: newCurrent,
        size: 10,
        sport: '1',
        competitions: selectCpt,
        start: selectTime,
        end: selectTime
      },
    });
  };

  /**
   *  切换select中的联赛
   *  @param e
   */
  changeCpt = (e) => {
    this.setState({
      selectCpt: e.target.value
    })
  };

  /**
   * 切换select中时间
   * @param e
   */
  changeTime = (e) => {
    this.setState({
      selectTime: e.target.value
    })
  };

  search = () => {
    const { dispatch } = this.props;
    const { selectTime, selectCpt } = this.state;
    dispatch({
      type: 'gameResult/fetch',
      payload: {
        ...this.defaultParams,
        page:1,
        size:10,
        competitions: selectCpt,
        start: selectTime,
        end: selectTime
      },
    });
  };

  render() {
    const { gameResult: { data, count, current },
      gameResult: { competitions },
      loading } = this.props;
    const {selectCpt, selectTime} = this.state;
    return (
      <div className={styles.help}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>赛果</div>
        </div>
        <div  className={styles.main}>
          <div className={styles.selection}>
            <select  value={selectCpt} className={styles.select} onChange={this.changeCpt}>
              <option value='null' >全部</option>
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
            <div className={styles.search} onClick={this.search}>
              搜索
            </div>
          </div>
          <div className={styles.title}>
            <div className={styles.b1} />
            <div className={styles.b2}>全场</div>
            <div className={styles.b3}>上半场</div>
          </div>
          <div className={styles['content-box']}>
          {
            loading ?  <div className={styles.loadingBox}>
              <Loading bg="rgba(255,255,255,.2)"  loadingIconSize="40px" color="#30717b" />
            </div>  :(
                data && data.length > 0 ? data.map( (val) => (
                <div className={styles.content}>
                  <div className={styles.cptName}>{val.competitionName}</div>
                  <div className={styles.line}>
                    <div className={styles.time}>{val.matchTime}</div>
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
                )) : <div style={{width: '100%', height: '40px',textAlign: 'center', lineHeight: '40px'}}>无比赛</div>
            )
          }
          </div>
          {
            count > 9 ?
              <Pagination total={Math.ceil(count / 10)}
                          className={styles.pagination}
                          current={current}
                          locale={{
                            prevText: (<span onClick={() => this.togglePage('prev')}>上一页</span>),
                            nextText: (<span onClick={() => this.togglePage('next')}>下一页</span>),
                          }}
              /> : ''
          }
        </div>
      </div>
    );
  }
}

export default GameResult;


