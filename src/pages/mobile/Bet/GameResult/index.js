import React, { PureComponent } from 'react';
import styles from './index.scss';
import { connect } from 'dva';
import Loading from '../../../../components/PCMask';
import { Pagination } from 'antd-mobile';


@connect(({ gameResult, loading }) => ({
  gameResult,
  loading: loading.models.gameResult,
}))
class GameResult extends PureComponent {

  defaultParams={
    sport: '1'
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'gameResult/fetchCompetitions',
      payload: {
        gg:'1',
        ...this.defaultParams,
      }
    });
    dispatch({
      type: 'gameResult/fetch',
      payload: {
        ...this.defaultParams,
        page:1,
        size:10,
        /*start:this.start,
        end:this.end*/
      },
    });

  }

  togglePage = (flag) => {
    const { dispatch, loading, gameResult: { count, current } } = this.props;
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
      },
    });

  };

  render() {
    const { gameResult: { data, count, current }, loading } = this.props;
    return (
      <div className={styles.help}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>赛果</div>
        </div>
        <div  className={styles.main}>
          <div className={styles.title}>
            <div className={styles.b1} />
            <div className={styles.b2}>全场</div>
            <div className={styles.b3}>上半场</div>
          </div>
          <div className={styles['content-box']}>
          {
            loading ?  <div className={styles.loadingBox}>
              <Loading bg="rgba(255,255,255,.2)"  loadingIconSize="40px" color="#30717b"/>
            </div>  :
                data && data.map( (val) => (
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
              ))

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


