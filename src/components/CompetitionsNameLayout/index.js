import React from 'react';
import Link from 'umi/link';
import styles from './index.scss'

const linkMap = {
  today: '/bet/todayMatchList?competitionId=',
  todayMixed: '/bet/todayMixedMatchList?competitionId=',
  asian: '/bet/asianMatchList?competitionId=',
  asianMixed: '/bet/asianMixedMatchList?competitionId='
};

// type1代表今日2代表早盘
export default ({ type, competitionId, competitionName, matches }) => (
  <Link key={competitionId} className={styles['competition-box']}
        to={`${linkMap[type]}${competitionId}`}>
    <div className={styles['name-box']}>
      <div className={styles.name}>
        {competitionName}
      </div>
      <div className={styles.count}>
        {matches}
      </div>
    </div>
  </Link>
)
