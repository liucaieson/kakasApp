import React from 'react';
import Link from 'umi/link';
import styles from './index.scss';

const list = [
  {
    name: '入门指南',
    link: '/bet/help/guide',
  },
  {
    name: '详细设定',
    link: '/bet/help/enactment',
  },
  /* {
     name: '密码恢复',
     link: '/bet/passwordRecovery',
   },
   {
     name: '修改密码',
     link: '/bet/changePassword',
   }, */
  {
    name: '体育规则',
    link: '/bet/help/SportsRules',
  },
  {
    name: '规则与条款',
    link: '/bet/help/terms',
  },
  /* {
    name: '新功能',
    link: '/bet/newFunction',
  }, */
  {
    name: '混合过关交易指南',
    link: '/bet/help/mixedTradeGuide',
  },
  {
    name: '赔率计算列表',
    link: '/bet/help/oddsCalc',
  },
  {
    name: '在线客服24/7',
    link: '/bet/help/onlineService',
  },
];

export default () => (
  <div className={styles.help}>
    <div className={styles['game-tab']}>
      <div className={styles.name}>帮助</div>
    </div>
    <ul className={styles['list-box']}>
      {
        list.map((val) => (
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
