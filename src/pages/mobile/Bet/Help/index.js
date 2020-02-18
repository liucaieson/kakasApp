import React from 'react';
import styles from './index.scss';
import Link from 'umi/link';

const list = [
  {
    name: '详细设定',
    link: '/bet/enactment',
  },
 /* {
    name: '密码恢复',
    link: '/bet/passwordRecovery',
  },
  {
    name: '修改密码',
    link: '/bet/changePassword',
  },*/
  {
    name: '体育规则',
    link: '/bet/SportsRules',
  },
  {
    name: '规则与条款',
    link: '/bet/terms',
  },
  /*{
    name: '新功能',
    link: '/bet/newFunction',
  },*/
  {
    name: '混合过关交易指南',
    link: '/bet/mixedTradeGuide',
  },
  {
    name: '赔率计算列表',
    link: '/bet/oddsCalc',
  },
  {
    name: '在线客服27/7',
    link: '/bet/onlineService',
  },
];

export default () => (
  <div className={styles.help} >
    <div className={styles['game-tab']}>
      <div className={styles.name}>帮助</div>
    </div>
    <ul className={styles['list-box']}>
      {
        list.map((val, index) => (
          <Link to={val.link} className={styles.item} key={val.link}>
              <span className={styles.title}>
                {val.name}
              </span>
          </Link>
        ))
      }
    </ul>
  </div>
)


