import React, { PureComponent } from 'react';

import styles from './index.scss';

export default class GotoTopFooter extends PureComponent {
  componentDidMount() {

  }


  gotoTop =  () => {
    window.scrollTo(0,1)
  };
  render() {
    return (
      <div id='to-top' className={styles['to-top']} onClick={this.gotoTop}>
        回到顶部
      </div>
    )
  }
}

