import React from 'react';
import styles from './index.scss';


export default () => (
  <div className={styles.help}>
    <div className={styles['game-tab']}>
      <div className={styles.name}>混合过关交易指南</div>
    </div>
    <div className={styles.main}>
      <div>
        <ul>
          <li>
            <div>综合过关交易指南</div>
            <div>第一步</div>
            <div>
              在今日或早盘赛事选择<strong>“综合过关”</strong>
              <br />
              <br />
              选择联盟
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div>第二步</div>
            <div>
              添加你想要投注在“综合过关”的选择。
              您的选择将显示闪亮，并且绿色的“综合过关”交易单按钮将会加载在屏幕的底部。
              有些赛事在投注过关时，选择最少需要达到特定的赛事数量为之有效。这个将获在赛事的旁边显示
              <strong>“3串1”</strong>参考以下的例子:
            </div>
          </li>
          <li />
        </ul>
        <ul>
          <li>
            <div>第三步</div>
            <div>如果您想要为您的过关投注添加其他赛事，您可以返回并选择其他的联盟。</div>
          </li>
          <li />
        </ul>
        <ul>
          <li>
            <div>第四步</div>
            <div>一旦您添加了所有的选择到“综合过关”选择<strong>“提交过关投注”</strong>的按钮。</div>
          </li>
          <li />
        </ul>
        <ul>
          <li>
            <div>第五步</div>
            <div>
              这将打开“综合过关”的投注单，您可以从以下选项中进行选择 :<br /><br />
              <ol>
                <li><strong>确认交易</strong> - 输入投注金额以及确认交易<br /><br /></li>
                <li><strong>添加更多</strong> - 选择添加额外的选项给您的过关投注<br /><br /></li>
                <li><strong>删除投注单</strong> - 从您的过关投注单中删除所有的选择</li>
              </ol>
            </div>
          </li>
          <li />
        </ul>
        <ul>
          <li>
            <div>第六步</div>
            <div>输入您的投注金额。它必须是在规定的单注最低和最高值之间</div>
          </li>
          <li />
        </ul>
        <ul>
          <li>
            <div>第七步</div>
            <div>您的“综合过关”投注完成了。那是这么的简单！祝您好运</div>
          </li>
          <li />
        </ul>
      </div>
    </div>
  </div>
);
