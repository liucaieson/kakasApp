import React, { PureComponent } from 'react';
import styles from './index.scss';

export default class enactment extends PureComponent {
  state = {
    type: '1'
  };

  change = (e) => {
    this.setState({
      type: e.target.value
    })
  };

  renderTable() {
    const { type } = this.state;
    if (type === '1') {
      return (
        <table className={styles.table}>
          <tbody>
          <tr className={styles.title}>
            <td >投注类型</td>
            <td >单场最高</td>
            <td >单注最高</td>
          </tr>
          <tr className={styles.line}>
            <td >让球,大小,单双</td>
            <td >1,100,000</td>
            <td >330,000</td>
          </tr>
          <tr className={styles.line}>
            <td >
              滚球让球,滚球<br />大小,滚球单双
            </td>
            <td>1,100,000</td>
            <td>330,000</td>
          </tr>
          <tr className={styles.line}>
            <td >独赢,滚球独赢</td>
            <td >1,100,000</td>
            <td >330,000</td>
          </tr>
          <tr className={styles.line}>
            <td >其他</td>
            <td >220,000</td>
            <td >55,000</td>
          </tr>
          <tr className={styles.line}>
            <td >滚球其他</td>
            <td >220,000</td>
            <td >55,000</td>
          </tr>
          </tbody>

        </table>
      )
    }
    if (type === '2') {
      return (
        <table className={styles.table}>
          <tbody>
          <tr className={styles.title}>
            <td >投注类型</td>
            <td >单场最高</td>
            <td >单注最高</td>
          </tr>
          <tr className={styles.line}>
            <td >让球,大小,单双</td>
            <td >220,000</td>
            <td >110,000</td>
          </tr>
          <tr className={styles.line}>
            <td >
              滚球让球,滚球<br />大小,滚球单双
            </td>
            <td>220,000</td>
            <td>110,000</td>
          </tr>
          <tr className={styles.line}>
            <td >独赢,滚球独赢</td>
            <td >110,000</td>
            <td >110,000</td>
          </tr>
          <tr className={styles.line}>
            <td >其他</td>
            <td >110,000</td>
            <td >55,000</td>
          </tr>
          </tbody>
        </table>
      )
    }
    if (type === '3') {
      return (
        <table className={styles.table}>
          <tbody>
          <tr className={styles.title}>
            <td >投注类型</td>
            <td >单场最高</td>
            <td >单注最高</td>
          </tr>
          <tr className={styles.line}>
            <td >让球,大小,单双</td>
            <td >220,000</td>
            <td >110,000</td>
          </tr>
          <tr className={styles.line}>
            <td >
              滚球让球,滚球<br />大小,滚球单双
            </td>
            <td>220,000</td>
            <td>110,000</td>
          </tr>
          <tr className={styles.line}>
            <td >独赢,滚球独赢</td>
            <td >100,000</td>
            <td >50,000</td>
          </tr>
          <tr className={styles.line}>
            <td >其他</td>
            <td >50,000</td>
            <td >10,000</td>
          </tr>
          </tbody>
        </table>
      )
    }
    if (type === '4') {
      return (
        <table className={styles.table}>
          <tbody>
          <tr className={styles.title}>
            <td >投注类型</td>
            <td >单场最高</td>
            <td >单注最高</td>
          </tr>
          <tr className={styles.line}>
            <td >冠军</td>
            <td >110,000</td>
            <td >55,000</td>
          </tr>
          </tbody>

        </table>
      )
    }
    return null
  }


  render() {
    return (
      <div className={styles.help}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>详细设定</div>
        </div>
        <div className={styles.main}>
          <div className={styles.selection}>
          <select value={this.state.type} className={styles.select} onChange={this.change}>
            <option value="1">足球</option>
            <option value="2">篮球/美式足球</option>
            <option value="3">其他</option>
            <option value="4">冠军</option>
          </select>
          </div>
          {this.renderTable()}
        </div>
      </div>
    );
  }
}
