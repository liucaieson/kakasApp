import React, { PureComponent } from 'react';
import styles from './index.scss';
import Link from 'umi/link';

export default class passwordRecovery extends PureComponent {

  onChange = (val) => {
    console.log(val);
  };

  render() {
    return (
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
    );
  }
}


