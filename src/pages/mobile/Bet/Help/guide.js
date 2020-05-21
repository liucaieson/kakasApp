import React, { useState } from 'react';
import styles from './guide.scss';

export default () => {
  const [tab, setTab] = useState(1);

  const renderTab = () => {
    switch (tab) {
      case 1:
        return (
          <div className={styles['guide-content']}>
            <div className={styles.section}>
              <div className={styles.title}>1. 亚洲版（亚洲盘）</div>
              <div className={styles.text}>
                <p>亚洲盘是一种极流行于亚洲的体育博彩玩法，最常见的是亚洲让球盘，同时亦有亚洲大小盘、亚洲角球盘等等不同的投注方式。
                  亚洲盘的特色是多将投注选项定为两项，透过开设球盘数来平衡两项的开出概率。
                  而亚洲盘的返还率一般较其他彩池为高，亚洲盘（特别是让球盘）是亚洲最高投注额彩池之一。
                  此外，亦会二分法的特性，常出现走盘、赢半、输半等情况出现。
                </p>
                <p>亚洲让球盘的让球数目有三种：</p>
                <p>i.整球：让球数目可以为(1球,2球,3球,4球等)，结果可能会是赢、输或者是无效(和局退回投注金额)</p>
                <p>ii.半球：只有两种下注结果：赢或输。与整球的情况不同，
                  让半球排除了和局的情况，因为一场足球比赛永远不会出现半球的赛果。</p>
                <p>iii.四分之一球、四分之三球：为整球和半球让球盘的综合。</p>
                <p>*如让球为+1.75，会自动将投注者的投注分为两部分。其中一半下注于低盘口(+1.5)
                  ，而另一半下注于高盘口(+2)。这两半赌注将分别作为两个独立部分下注，然后再整合成一个完整的赌注。
                </p>
                <p>*例子：如果在+1.75盘口下注$20 ，则其中的 $10将下注到+1.5上，而另外$10将下注到+2上。</p>
                <p>注意：亚洲让球盘在滚球赛事中进行赛中投注时，必须扣除当下比赛分数进行计算。</p>
                <p>假设：当下比分为主：客 2:0， 下注时必须扣主队2分。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>2. 全场大小</div>
              <div className={styles.text}>
                <p> • 投注结果由赛事最后结果的总分（射门分数、得分情况等）来决定 </p>
                <p> • 如果总分高于预先指定的总分，则投注“大”的为赢家 </p>
                <p> • 如果总分低于预先指定的总分，则投注“小”的为赢家。</p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589446095/%E5%A4%A7%E5%B0%8F_2020-05-14_zkzpb1.png"/>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>3. 全场得分单双</div>
              <div className={styles.text}>
                <p> • 预测入秋总数为单数或双数 </p>
                <p> • 全场没有入球做双数论 </p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589446583/%E5%8D%95%E5%8F%8C_2020-05-14_165556_vpkder.png"/>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>4. 波胆</div>
              <div className={styles.text}>
                <p> • 预测某场比赛或某个项目结束的正确赛果或得分。 </p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589446749/%E6%B3%A2%E8%83%862020-05-14_165849_licoo8.png"/>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>5. 双重机会</div>
              <div className={styles.text}>
                <p> • 预测某场比赛或某个项目结束的正确赛果或得分。 </p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589450667/%E5%8F%8C%E9%80%89_2020-05-14_180341_mvkdzz.png"/>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>6. 半全场赛果</div>
              <div className={styles.text}>
                <p> • 预测球赛中半场及全场的赛果。 </p>
                <p> • 共有以下9种半全场赛果可供选择: </p>
                <p> • 主 - 主 、 主 - 和 、 主 - 客 、 和 - 主 、 和 - 和 、 和 - 客 、 客 - 主 、 客 - 和 、客 - 客 </p>
                <p> • 「主」代表主队胜，「和」代表和局，而「客」代表客队胜。</p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589450926/%E5%85%A8%E5%9C%BA%E5%8D%8A%E5%9C%BA_2020-05-14_180827_mkgkbj.png"/>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>7. 半场赛果</div>
              <div className={styles.text}>
                <p> • 预测球赛上半场的赛果，主胜、客胜、和。 </p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589451269/%E5%8D%8A%E5%9C%BA_2020-05-14_181409_flekv7.png"/>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles['guide-content']}>
            <div className={styles.section}>
              <div className={styles.title}>1. 两队都得分</div>
              <div className={styles.text}>
                <p>预测两队是否都在赛事中皆有进球</p>

              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>2. 球队入球数</div>
              <div className={styles.text}>
                <p>预测指定球队的入球数</p>

              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>3. 让球盘</div>
              <div className={styles.text}>
                <p>投注经让球调整后之主客和赛果。</p>

              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>4. 角球大小</div>
              <div className={styles.text}>
                <p> • 投注比赛中双方所开出角球的总数。</p>
                <p> • 如果角球数大于预先指定的角球数，则投注“大”的为赢家</p>
                <p> • 如果角球数低于预先指定的角球数，则投注“小”的为赢家。</p>
                <p> • 如果角球数等于预先指定的角球数，则投注“等”的为赢家。</p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589452134/%E8%A7%92%E7%90%83_2020-05-14_182758_metcdy.png"/>


              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>5. 第一个进球</div>
              <div className={styles.text}>
                <p>投注哪个队伍会在比赛中会射进第一个入球。</p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589452365/%E6%9C%80%E5%85%88%E8%BF%9B%E7%90%83_2020-05-14_183047_jng4n7.png"/>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>6. 最后入球</div>
              <div className={styles.text}>
                <p>投注哪个队伍会在比赛中会射进最后一球。</p>
                <img alt=""
                     src="https://res.cloudinary.com/dwgybue2t/image/upload/v1589452428/%E6%9C%80%E5%90%8E%E8%BF%9B%E7%90%832020-05-14_183329_enxkpw.png"/>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>7. 进球最多的半场</div>
              <div className={styles.text}>
                <p>投注哪半场有较多入球，可选择该场比赛的「上半场入球较多」、「下半场入球较多」或「上下半场入球数相同」。</p>

              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.title}>8. 净胜球</div>
              <div className={styles.text}>
                <p>预测两队之间的分差。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>9. 单队大小盘</div>
              <div className={styles.text}>
                <p>单队大小盘是指投注某队在单场赛事中的得分。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>10. 两个半场都获胜</div>
              <div className={styles.text}>
                <p>预测选择的球队在90分钟完场时间内（不包括加时赛及点球赛）是否在上半场和下半场的进球数都多于对手。</p>

              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>11. 球队至少获胜半场比赛</div>
              <div className={styles.text}>
                <p>预测选择的球队在90分钟完场时间内（不包括加时赛及点球赛）是否在上/下半场的其中一个半场进球数多于对手。</p>

              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>12. 小组首名</div>
              <div className={styles.text}>
                <p>预测分组阶段小组首名出线队伍。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>13. 冠军投注</div>
              <div className={styles.text}>
                <p>预测哪个参赛者或队伍在联赛中获得冠军。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>14. 同时换两个球员</div>
              <div className={styles.text}>
                <p>投注哪队同时换两个球员。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>15. 首名入球球员</div>
              <div className={styles.text}>
                <p>预测一场球赛中最先射入对方龙门得分之球员，因此并不包括乌龙球(射入自己龙门之入球)。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>16. 神射手</div>
              <div className={styles.text}>
                <p>预测整个锦标赛射入最多入球的球员。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>17. 出示红牌</div>
              <div className={styles.text}>
                <p>预测在90分钟完场时间内（不包括加时赛及点球赛）主队或客队里的球员是否会收到一个红牌。</p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles['guide-content']}>
            <div className={styles.section}>
              <div className={styles.title}>1. 欧式赔率 (小数)</div>
              <div className={styles.text}>
                <p>本站默认的是欧式赔率</p>
                <p>欧式赔率的计算金额包含投注金额，赔率与投注金额相乘即是派彩金额</p>
                <p>例子：投注金额为$1000，赔率为1.40。</p>
                <p>中奖的话，派彩金额为$1000 x 1.40= $1400</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>2. 美式赔率 (正负)</div>
              <div className={styles.text}>
                <p>美式赔率有正负之分：</p>
                <p>a.正数：表示的是如果投注100元投注者能获得多少利润。</p>
                <p>派彩金额=投注金额+赔率 x (投注金额/100)</p>
                <p>例子：投注金额为$20，赔率为 116</p>
                <p>中奖的话，派彩金额为$20 +116 x ($20/100) = $43.2</p>
                <p>b.负数:表示的是投注者需要投注多少才能赢得100元利润。</p>
                <p>派彩金额=投注金额+ (100/赔率数值) x投注金额</p>
                <p>例子：投注金额为$100，赔率为-102</p>
                <p>中奖的话，派彩金额为$100 +(100/102) x $100= $198</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>3. 英式赔率 (分数)</div>
              <div className={styles.text}>
                <p>英式赔率的计算金额不包含投注金额，赔率与投注金额相乘即是获利金额。</p>
                <p>派彩金额=赔率x 投注金额+投注金额</p>
                <p>例子：投注金额为$500，赔率为2/5。</p>
                <p>中奖的话，派彩金额为2/5x $500 +$500= $700</p>
                <p>各种赔率的转换</p>
                <p>各种赔率可以透过算式转换。</p>
                <div>从欧式赔率转换</div>
                <div>
                  <div>
                    <div>
                      <div>美式赔率</div>
                      <div>
                        <p>若欧式赔率 &lt; 2: 美式赔率=100 / (1 - 欧式赔率) </p> <p>若欧式赔率 ≥ 2: 美式赔率 = 100x(欧式赔率 - 1)
                      </p>
                      </div>
                    </div>
                    <div>
                      <div>英式赔率</div>
                      <div>
                        <p>英式赔率 = 欧式赔率 - 1</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>从美式赔率转换</div>
                <div>
                  <div>
                    <div>
                      <div>欧式赔率</div>
                      <div>
                        <p>若美式赔率为正数: 欧式赔率 = 1 + (美式赔率 / 100) </p>
                        <p>若美式赔率为负数: 欧式赔率 = 1-( 100 / 美式赔率)</p>
                      </div>
                    </div>
                    <div>
                      <div>英式赔率</div>
                      <div>
                        <p>若美式赔率为正数: 英式赔率 = 美式赔率 / 100</p>
                        <p>若美式赔率为负数: 英式赔率 = -100 / 美式赔率</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>从英式赔率转换</div>
                <div>
                  <div>
                    <div>
                      <div>欧式赔率</div>
                      <div>
                        <p>欧式赔率 = 英式赔率 + 1</p>
                      </div>
                    </div>
                    <div>
                      <div>美式赔率</div>
                      <div>
                        <p>若英式赔率 &lt; 1: 马来赔率=英式赔率 (分数转小数)</p> <p>若英式赔率 ≥ 1: 马来赔率 = -1 / 英式赔率</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>4. 香港賠率HK (Hong Kong) Odds</div>
              <div className={styles.text}>
                <p>客戶的投注是不包含在支付的計算中的。</p>
                <p>例如：0.80（從小數點賠率到香港賠率， 1.80 – 1 = 0.80）</p>
                <p>客戶下注100人民幣並且贏了。回報 = 80 人民幣</p>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.title}>5. 馬來賠率MY (Malay) Odds</div>
              <div className={styles.text}>
                <p>常見在馬來西亞及新加坡地區</p>
                <p>例如：0.80 (香港賠率）</p>
                <p>從香港賠率到馬來賠率，如果香港賠率小於 1.00, 馬來賠率和香港賠率是相同的. 馬來賠率 = 香港賠率 = 0.8 </p>
                <p>馬來賠率 0.8 又稱作贏少賠率：</p>
                <p>因為如果客戶下注 100 人民幣在 0.8 賠率上，比賽輸了，客戶輸掉本金 100 元；如果比賽勝了，那麼客戶只可以贏 80 元，80 元 &lt; 100 元。</p>
                <p>2.33（香港賠率）</p>
                <p>如果香港賠率大於 1.00，我們用一個公式計算，馬來賠率：馬來賠率 = -1 / 香港賠率 = -(1 / 2.33) = -0.43</p>
                <p>馬來賠率 -0.43 又稱作輸少賠率：因為如果客戶下注 100 人民幣在賠率 -0.43 上，比賽輸了，客戶輸掉 100 * 0.43 = 43
                  塊；比賽勝了，客戶可以贏全部本金 100 塊，43 塊 &lt; 100 塊。</p>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.title}>6. 印尼賠率Indo Odds</div>
              <div className={styles.text}>
                <p>1.26（香港賠率）</p>
                <p>從香港賠率到印尼賠率，如果香港賠率大於 1.00，那麼印尼賠率 = 香港賠率 = 1.26。印尼賠率 1.26 又稱作贏多賠率：因為如果客戶投注 100 人民幣在 1.26
                  印尼賠率上，比賽勝了，客戶可以贏 100 * 1.26 = 126 塊；如果比賽輸了，客戶輸掉全部本金 100
                  塊，126 塊 &lt; 100 塊。</p>
                <p>0.9（香港賠率）</p>
                <p>如果香港賠率小於 1.00，那麼印尼賠率 = -（1 / 香港賠率)=
                  -1.11。印尼賠率 -1.11 又稱作輸多賠率：因為如果客戶投注 100 人民幣在 -1.11 賠率上，比賽輸了，客戶輸掉 100 * 1.11 = 111
                  塊；如果比賽勝了，客戶只可以贏自己的本金 100 塊，111
                  塊 &lt; 100 塊。</p>


              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={styles['guide-content']}>
            <div className={styles.section}>
              <div className={styles.title}>混合过关</div>
              <div className={styles.text}>
                <p>一注中包括了多于一项对不同赛事的投注选项。所有选项都必须胜出，投注方为赢。
                  前一项所赢的彩金将被重新投注在随后的投注项上。</p>
                <p>双式投注/ 2项复式投注：一注中包括了2项对不同赛事的投注选项</p>
                <p>三式投注/ 3项复式投注：一注中包括了3项对不同赛事的投注选项</p>
                <p>四式投注/ 4项复式投注：一注中包括了4项对不同赛事的投注选项</p>
                <p>五式投注/ 5项复式投注：一注中包括了5项对不同赛事的投注选项</p>
                <p>六式投注/ 6项复式投注：一注中包括了6项对不同赛事的投注选项</p>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className={styles['guide-content']}>
            <div className={styles.section}>
              <div className={styles.title}>1. Permutations/perm (排列)</div>
              <div className={styles.text}>
                <p>一种在足球（或橄榄球）投注中经常使用的术语，意为’任何’， 如’P3/5′是指从五个选项中任取三项进行三重彩排列。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>2. Returns (总彩金)</div>
              <div className={styles.text}>
                <p>顾客收到的包括原先下注金额在内的彩金金额. 有时，顾客会把总彩金错误地当成彩金。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>3. Odds against (盈余赔率)</div>
              <div className={styles.text}>
                <p>一种赔率大于等额赔率，即彩金高过投注金的投注赔率。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>4. Odds on (亏额赔率)</div>
              <div className={styles.text}>
                <p>一种赔率低于等额赔率，即彩金低于投注金的投注赔率。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>5. Stake (投注金)</div>
              <div className={styles.text}>
                <p>顾客希望在一个特定的投注选项上押下的赌金数额。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>6. Stake unit (单位投注金)</div>
              <div className={styles.text}>
                <p>一项特定的专项投注所需的最低投注金金额。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>7. Starting prices/SP (开赛赔率)</div>
              <div className={styles.text}>
                <p>指除非先前同意接受了一个替代的赔率，否则进行投注计算所要采用的赔率</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>8. Tote（奖池投注）</div>
              <div className={styles.text}>
                <p>是一种通过奖池来运作的基于开赛赔率的投注方式。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>9. Winnings (彩金)</div>
              <div className={styles.text}>
                <p>指顾客领取的，不含其原先下注金额的多出金额。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>10. Coupled (组对（的）)</div>
              <div className={styles.text}>
                <p>一个或多个投注选项已经被集合在一起以利进行博彩投注。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>11. Cover (大牌)</div>
              <div className={styles.text}>
                <p>用于在当一个热门选手所赢得的分数超过所要求的分数数目的时候。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>12. Double action (双重下注)</div>
              <div className={styles.text}>
                <p>一种如果前面的一笔投注获胜，打平或取消会被做出相应处理的’跟随’投注。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>13. Double header (连赛两场)</div>
              <div className={styles.text}>
                <p>同一支球队在同一天所进行的两场单独的比赛。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>14. Even money (等额投注)</div>
              <div className={styles.text}>
                <p>一笔其赔率为1/1的投注；即不押抽头也不押高息的投注。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>15. Exotic wager (特殊投注)</div>
              <div className={styles.text}>
                <p>一种为适应顾客的需求而公布的投注，如上半场投注；下半场投注，预期投注，让垒盘投注以及money line（开出盘口）投注等。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>16. Favorite (热门选手)</div>
              <div className={styles.text}>
                <p>获得押注最多的参赛者，即盘口赔率最小的参赛者。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>17.Grand salami (大萨拉米)</div>
              <div className={styles.text}>
                <p>当天所有冰球比赛中的进球得分总数. 该投注即可以押多也可以押少。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>18. Home team (主队)</div>
              <div className={styles.text}>
                <p>在自己所在城市进行比赛的球队。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>19. Juice (抽水)</div>
              <div className={styles.text}>
                <p>指玩家在现金交易过程中付给博彩公司的中间费。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>20. Line (赔率)</div>
              <div className={styles.text}>
                <p>一场特定比赛的当前赔率或让分盘。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>21. Listed pitchers (报名投手)</div>
              <div className={styles.text}>
                <p>在棒球投注中，只有在两队预定负责开球的投手实际上都确实开球了才可以下注. 如果他们没有开球，则投注会被取消。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>22. No action (无输赢比赛)</div>
              <div className={styles.text}>
                <p>一笔即没有输钱也没有赢钱的投注。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>23. Off the board (未公布的比赛) ：</div>
              <div className={styles.text}>
                <p>一场博彩公司不会接受对其进行投注的比赛。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>24. Overtime (加时赛)</div>
              <div className={styles.text}>
                <p>指在正常比赛时间结束时对一场平局的比赛进行延长，直至决出胜者或加时赛的最长时段终止。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>25. Postponed (推迟举行的比赛)</div>
              <div className={styles.text}>
                <p>指一场由于任何原因被取消并且改在一个晚一点的日期举行的比赛。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>27. Straight bet (直接押注)</div>
              <div className={styles.text}>
                <p>一种只押一支球队或一匹赛马的投注。</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>28. Underdog (冷门球队)</div>
              <div className={styles.text}>
                <p>即被认为最有可能失利的球队。</p>
              </div>
            </div>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.guide}>
      <div className={styles['game-tab']}>
        <div className={styles.name}>入门指南</div>
      </div>
      <div className={styles.main}>
        <div className={styles['guide-nav']}>
          <div
            className={tab === 1 ? `${styles['guide-nav-item']} ${styles.active}` : styles['guide-nav-item']}
            onClick={() => setTab(1)}
          >
            一般投注类型
          </div>
          <div
            className={tab === 2 ? `${styles['guide-nav-item']} ${styles.active}` : styles['guide-nav-item']}
            onClick={() => setTab(2)}
          >
            其他投注类型
          </div>
          <div
            className={tab === 3 ? `${styles['guide-nav-item']} ${styles.active}` : styles['guide-nav-item']}
            onClick={() => setTab(3)}
          >
            赔率各种形式
          </div>
          <div
            className={tab === 4 ? `${styles['guide-nav-item']} ${styles.active}` : styles['guide-nav-item']}
            onClick={() => setTab(4)}
          >
            投注组合玩法
          </div>
          <div
            className={tab === 5 ? `${styles['guide-nav-item']} ${styles.active}` : styles['guide-nav-item']}
            onClick={() => setTab(5)}
          >
            投注术语一览
          </div>
        </div>
        {
          renderTab()
        }

      </div>
    </div>
  );
}
