import React, { PureComponent } from 'react';
import styles from './index.scss';

export default class onlineService extends PureComponent {

  render() {
    return (
      <div className={styles.help}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>规则与条款</div>
        </div>
        <div  className={styles.main}>
          <div className="contact_content">
            <h1>我们的客户服务人员将通过电话或电子邮件为您提供24小时全天服务。</h1>

            <ul className="phoneBox">
              <li><i className="iconPhone"></i></li>
              <li>
                <div>联络电话:</div>
                <a id="tel01" href="tel:+85258089063">+852 5808 9063</a>
                <a id="tel02" href="tel:+85258088664">+852 5808 8664</a>
                <a id="tel03" href="tel:+639151950193">+63 915 195 0193</a>
                <a id="tel04" href="tel:+639151955533">+63 915 195 5533</a>
              </li>
            </ul>
            <ul className="mailBox">
              <li><i className="iconMail"></i></li>
              <li>
                <div>电子信箱:</div>
                <a id="email" href="mailto:royal888crown@hotmail.com">royal888crown@hotmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


