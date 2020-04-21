import React, { PureComponent } from 'react';
import styles from './index.scss';
import moment from 'moment';
import Link from 'umi/link';

const timeList = [];
let date = '';

for (let i = 0; i < 7; i++) {
  date = moment().subtract(i, 'day').format('YYYY-MM-DD');
  timeList.push({
      name: date,
      value: date,
    },
  );
}

const sportMap = [
  {
    name: '足球',
    id: '1',
  },
];


class Live extends PureComponent {

  state = {
    selectSport: '',
    selectTime: moment().format('YYYY-MM-DD'),
  };

  changeSport = () => {

  };

  changeTime = () => {

  };

  render() {
    const { selectSport, selectTime } = this.state;
    return (
      <div className={styles.help}>
        <div className={styles['game-tab']}>
          <div className={styles['tv-icon']}/>
          <div className={styles.name}>直播现场</div>
        </div>
        <div className={styles.main}>
          <div className={styles.selection}>
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
            <select value={selectSport} className={styles.select} onChange={this.changeSport}>
              {
                sportMap.map((item) => (
                  <option
                    value={item.id}
                    key={item.id}
                  >
                    {item.name}
                  </option>
                ))
              }
            </select>
          </div>
          <div className={styles.list}>
            <Link to='/bet/inPlayLive?match=0'>
              <div className={styles.item}>
                <span className={styles['tv-icon']} />
                <span className={styles['sport-live-icon']} />
                <span className={styles.name}>
                  巴西  VS  德国
                </span>
              </div>
            </Link>
            <Link to='/bet/inPlayLive?match=1'>
              <div className={styles.item}>
                <span className={styles['tv-icon']} />
                <span className={styles['sport-live-icon']} />
                <span className={styles.name}>
                  德国  VS  阿根廷
                </span>
              </div>
            </Link>
            <Link to='/bet/inPlayLive?match=2'>
              <div className={styles.item}>
                <span className={styles['tv-icon']} />
                <span className={styles['sport-live-icon']} />
                <span className={styles.name}>
                  尤文图斯  VS  巴塞罗娜
                </span>
              </div>
            </Link>
            <div className={styles['future-item']}>
              <span className={styles.date} >5:00</span>
              <span className={styles['no-live-icon']} />
              <span className={styles.name}>
                毕尔巴鄂经济  VS  西班牙人
              </span>
            </div>
            <div className={styles['future-item']}>
              <span className={styles.date} >5:00</span>
              <span className={styles['no-live-icon']} />
              <span className={styles.name}>
                拜仁  VS  汉堡
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Live;


