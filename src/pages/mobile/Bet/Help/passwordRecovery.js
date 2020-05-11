import React from 'react';
import styles from './index.scss';

export default () => (
  <div className={styles.help}>
    <div className={styles['game-tab']}>
      <div className={styles.name}>密码恢复</div>
    </div>
    <div className={styles.main}>
      <p className={styles.p}>
        请输入您要使用于密码恢复的电子邮件。
      </p>
      <div className={styles.pswBox}>
        <span>电子邮件</span>
        <input />
      </div>
    </div>
  </div>
)
