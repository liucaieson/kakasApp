import React, { PureComponent } from 'react';
import styles from './index.scss';

class Live extends PureComponent {

  render() {
    return (
      <div className={styles.help}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>直播表</div>
        </div>
        <div  className={styles.main}>
          暂无直播
        </div>
      </div>
    );
  }
}

export default Live;


