import React, { PureComponent } from 'react';
import styles from './index.scss';
import Link from 'umi/link';

export default class oddsCalc extends PureComponent {

  render() {
    return (
      <div className={styles.help}>
        <div className={styles['game-tab']}>
          <div className={styles.name}>赔率计算列表</div>
        </div>
        <div className={styles.main}>
          <table width="100%" border="0" cellSpacing="0" cellPadding="0" className={styles.table}>
            <tbody>
            <tr className={styles.title}>
              <td>赔率盘</td>
              <td>投注金额</td>
              <td>赔率</td>
              <td>赢</td>
              <td>输</td>
            </tr>

            <tr className={styles.line}>
              <td rowSpan="2">香港盘</td>
              <td>1,000</td>
              <td>0.800</td>
              <td>800</td>
              <td>-1000</td>
            </tr>
            <tr className={styles.line}>
              <td>&nbsp;</td>
              <td>1.130</td>
              <td>1130</td>
              <td>-1000</td>
            </tr>
            <tr className={styles.line}>
              <td rowSpan="2">马来盘</td>
              <td>1,000</td>
              <td>0.800</td>
              <td>800</td>
              <td>-1000</td>
            </tr>
            <tr className={styles.line}>
              <td>&nbsp;</td>
              <td>-0.880</td>
              <td>1000</td>
              <td>-800</td>
            </tr>
            <tr className={styles.line}>
              <td rowSpan="2">印尼盘</td>
              <td>1,000</td>
              <td>1.130</td>
              <td>1130</td>
              <td>-1000</td>
            </tr>
            <tr className={styles.line}>
              <td>&nbsp;</td>
              <td className="help_td_odd f_red">-1.250</td>
              <td>1000</td>
              <td className="help_td_odd f_red">-1250</td>
            </tr>
            <tr className={styles.line}>
              <td rowSpan="2">欧洲盘</td>
              <td>1,000</td>
              <td>1.800</td>
              <td>800</td>
              <td>-1000</td>
            </tr>
            <tr className={styles.line}>
              <td>&nbsp;</td>
              <td>2.130</td>
              <td>1130</td>
              <td>-1000</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className={styles['game-tab']}>
          <div className={styles.name}>赔率转换表
          </div>
        </div>
        <div className={styles.main}>
          <table width="100%" border="0" cellSpacing="0" cellPadding="0" className={styles.table}>
            <tbody>
            <tr className={styles.title}>
              <td>香港盘</td>
              <td>马来盘</td>
              <td>印尼盘</td>
            </tr>
            <tr className={styles.line}>
              <td>0.10</td>
              <td>0.10</td>
              <td>-10.00</td>
            </tr>
            <tr className={styles.line}>
              <td>0.20</td>
              <td>0.20</td>
              <td>-5.00</td>
            </tr>
            <tr className={styles.line}>
              <td>0.35</td>
              <td>0.35</td>
              <td>-2.85</td>
            </tr>
            <tr className={styles.line}>
              <td>0.40</td>
              <td>0.40</td>
              <td>-2.50</td>
            </tr>
            <tr className={styles.line}>
              <td>0.50</td>
              <td>0.50</td>
              <td>-2.00</td>
            </tr>
            <tr className={styles.line}>
              <td>0.65</td>
              <td>0.65</td>
              <td>-1.53</td>
            </tr>
            <tr className={styles.line}>
              <td>0.75</td>
              <td>0.75</td>
              <td>-1.33</td>
            </tr>
            <tr className={styles.line}>
              <td>0.83</td>
              <td>0.83</td>
              <td>-1.20</td>
            </tr>
            <tr className={styles.line}>
              <td>0.96</td>
              <td>0.96</td>
              <td>-1.04</td>
            </tr>
            <tr className={styles.line}>
              <td>1.00</td>
              <td>-1.00</td>
              <td>-1.00</td>
            </tr>
            <tr className={styles.line}>
              <td>1.15</td>
              <td>-0.86</td>
              <td>1.15</td>
            </tr>
            <tr className={styles.line}>
              <td>1.35</td>
              <td>-0.74</td>
              <td>1.35</td>
            </tr>
            <tr className={styles.line}>
              <td>1.45</td>
              <td>-0.68</td>
              <td>1.45</td>
            </tr>
            <tr className={styles.line}>
              <td>1.55</td>
              <td>-0.64</td>
              <td>1.55</td>
            </tr>
            <tr className={styles.line}>
              <td>1.65</td>
              <td>-0.60</td>
              <td>1.65</td>
            </tr>
            <tr className={styles.line}>
              <td>1.74</td>
              <td>-0.57</td>
              <td>1.74</td>
            </tr>
            <tr className={styles.line}>
              <td>1.97</td>
              <td>-0.50</td>
              <td>1.97</td>
            </tr>
            <tr className={styles.line}>
              <td>2.05</td>
              <td>-0.48</td>
              <td>2.05</td>
            </tr>
            <tr className={styles.line}>
              <td>3.45</td>
              <td>-0.28</td>
              <td>3.45</td>
            </tr>
            <tr className={styles.line}>
              <td>4.25</td>
              <td>-0.23</td>
              <td>4.25</td>
            </tr>
            <tr className={styles.line}>
              <td>5.00</td>
              <td>-0.20</td>
              <td>5.00</td>
            </tr>
            <tr className={styles.line}>
              <td>8.00</td>
              <td>-0.12</td>
              <td>8.00</td>
            </tr>
            <tr className={styles.line}>
              <td>10.00</td>
              <td>-0.10</td>
              <td>10.00</td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


