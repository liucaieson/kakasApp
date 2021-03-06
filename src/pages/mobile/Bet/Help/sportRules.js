import React, { useState } from 'react';
import styles from './sportRules.scss';
import Accordion from '@/components/Accordion';

export default () => {
  const [showList, setShowList] = useState('1');

  const change = (e) => {
    setShowList(e.target.value)
  };

  const renderList = () => {
    switch (showList) {
      case '1':
        return (
          <div>
            <div className={styles.h1}>90分钟赛事</div>
            <Accordion>
              <div className={styles.title}>90分钟赛事投注</div>
              <div className={styles.content}>
                除非有特別声明，否则所有赛事的盘口都基于90分钟规定时间比赛的结果。在此，90分钟赛事包括伤停补时，但不包括加时赛、点球或金球所用时间。如果比赛在90分钟完成前就结束，除非有特别声明，否则投注作废；
                在比赛结束前赛果已被确定的投注除外。但是盘口必须要能完全确定，投注才有效。例如，对首位进球球员或何时射入第一个球的投注等，如果在比赛结束前进球已产生，投注将继续有效。
                友谊赛事为此规则的一个例外：友谊赛事的所有投注盘口将依据比赛结束时（不包括加时赛）的实际结果进行结算，不论整90分钟是否完成；而对于沙滩足球赛事而言，盘口仅限进行的36分钟赛事。
                关于被明确列为“青年队”的赛事，“青年队”赛事是我们的通用术语，系指年龄在23岁以下的参赛队员所进行的足球赛事。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>加时赛滚球盘口</div>
              <div className={styles.content}>
                投注将按照加时赛时间段的官方数据进行结算。常规赛段内的任何进球或角球或者该时段内所导致的进球或角球均不计算。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>推迟、提前或取消比赛</div>
              <div className={styles.content}>
                当赛事未进行或被延期时，如果此比赛在同一星期內（星期日为止）进行，投注继续有效（除非双方共同达成协议取消赛事）；否则与此赛事有关的投注项将被视为无效/无结果/未参赛。
                如果为了电视现场转播而将赛事时间从周末改至星期一晚，则该赛事所有相关投注继续有效。
                如果网站赛事列表中出现先于规定的日期或开球时间举行的比赛，只要下注时间早于更改后的开球时间，此类比赛仍可被纳入投注范围之内。
                如果任何足球赛在90分钟结束前被中止，则投注作废，除非在比赛中止前赛果已被确定。但是盘口必须要能完全确定，投注才有效。例如，对首位进球球员或何时射入第一个球的投注等，如果在比赛中止前进球已产生，投注继续有效。
                南美俱乐部的赛事是唯一可以不遵循以上中止规则的比赛。只要其赛果获得相关足球组织联盟的承认，全场赛果和双胜彩的盘口（赛前和滚球盘）投注将以比赛中止时的赛果为准。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>赛事未按所列出的进行</div>
              <div className={styles.content}>
                如果球赛的举行场地有改变（改在客队场地进行除外），只要主队位置没有改变，则已确认的投注依旧成立。如果列出比赛中的主客队位置互换（例如比赛在原客队场地进行），则原本的相应投注将计为无效。
                我们会尽力在网站上标明所有在中立场地进行的比赛。无论本网站是否标明，只要是在中立场地进行的比赛，无论哪队被列为“主队”，投注均成立。
                如果是官方赛事，而官方列出的球队信息与我们网站公布的不同，例如：官方赛事在球队名称中详细注明“后备队”、“年龄组”（如21岁以下）或“性别”（如女子），则投注为无效。
                对于所有其它情况，投注都有效，包括我们列出球队名称但是没有在队名上说明“XI”等。
                如果比赛以非标准赛制进行，例如，3或4个赛节，那么所有与“半场”有关的盘口均作废
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>投注金的结算</div>
              <div className={styles.content}>
                投注结算将以英国国家通讯社（Press Association）公布的数据为根据。当英国国家通讯社没有公布相关数据或有重要证据证明英国国家通讯社的数据有误时，我们将依据相关独立资料进行结算。
                对于比赛、球队和球员数据盘口，结算将根据Opta提供的数据以及他们对每个数据的定义进行。 如果缺乏一致且独立的证据，或出现明显互相矛盾的证据资料，投注将按我们自己的数据进行结算。
                如果球队随后被取消或者恢复参赛资格，比赛投注或资格赛投注将不受影响。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>首位/最后得分球员</div>
              <div className={styles.content}>
                只接受90分钟比赛的投注。
                我们将尽量为每位选手开出“首位/最后得分球员”赔率。但是，如果盘口未报出的球员最先/最后进球得分，则他们将算作是获胜者。如果选手未参赛，则投注无效，同样，如果投注了首位得分球员盘口，而所选球员在第一个进球得分产生后才上场，或如果该球员未上场，且选择了“若开赛时未上场则取消”的选项，则相应投注无效。在“最后得分球员”的投注中，所有参加比赛的球员均将视为“参赛球员”，但如果投注某位球员后，投注因选择“若开赛时未上场则取消”而取消，该球员将不视为参赛球员。
                首位得分球员独赢及位置投注 - 在90分钟赛事里，该投注将按照1/3原赔率无限制位置进行赔付。 官方机构的随后查询，将不作为投注结算的依据。
                请注意，在进行投注结算时，乌龙球不被计算在內。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>多次得分球员/得分两次或更多/上演帽子戏法</div>
              <div className={styles.content}>
                只接受90分钟比赛的投注。
                若所投注的球员未参赛，则投注作废。出于结算目的，所有参与比赛的球员将视为“参赛球员”，但如果投注某位球员后，投注因选择“若开赛时未上场则取消”而取消，该球员将不视为参赛球员。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>正确比分(波胆)</div>
              <div className={styles.content}>
                预测正常赛时结束时的比分。乌龙球也计算在內
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>比分预测 - 首位得分球员/正确比分双式投注</div>
              <div className={styles.content}>
                如果被投注球员并沒有上场或在首个进球得分已产生后才上场，投注将被转为对正确比分盘口的单项投注，并以开赛时报出的相应赔率为准。如果赛事在首个进球得分产生后被中止，投注将转为对首位得分球员盘口的单项投注，并以开赛时报出的相应赔率为准。如果赛事的首个进球是乌龙球，投注将根据下一个得分球员及正确比分盘口进行结算。如果比赛的所有进球都是乌龙球，投注会自动转为正确比分盘口的单项投注，并以开赛时报出的相应赔率为准。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>球队首位/最后进球得分手</div>
              <div className={styles.content}>
                如果所投注的球员未参赛，投注无效。若所投注的球员在其球队的首个进球得分产生后才上场参赛，则无论其是否在比赛中得分，相关投注无效。乌龙球不算入内。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>滚球盘下一位进球得分手</div>
              <div className={styles.content}>
                我们将尽力为每一位可能参赛的球员开出“下一位进球得分手”的赔率。但是，如果下一位进球得分的球员并未包含在最初开出的盘口中，该进球球员仍然算作获胜者。如果所投注的球员没有参赛，投注作废（就像“首位得分球员”的投注，如果球员在第一个进球产生后才上场，对此球员的投注作废）。所有在下个进球产生前上场参赛的球员，均被视为参赛者。如果您在中场休息期间投注，且您投注的球员在下半场没有返场比赛，则投注作废。
                官方机构的随后查询，将不作为投注结算的依据。 乌龙球不计算在內。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>任意时间的得分球员</div>
              <div className={styles.content}>
                所有参加比赛的球员均将视为“参赛球员”，但如果投注某位球员后，投注因选择“若开赛时未上场则取消”而取消，该球员将不视为参赛球员。 对未能完成比赛的投注，将被当作“未参赛”结算。
                请注意，投注结算时，乌龙球不计算在内。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>进球得分手配对投注</div>
              <div className={styles.content}>
                双方球员都必须开始比赛，投注方为有效。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>首个进球时间</div>
              <div className={styles.content}>
                如果在首个进球得分后赛事中止，所有投注仍然有效。 如果赛事在首个进球得分前中止，则对已经结束的时间段所下的投注将被结算为输。而对于其它时间段的投注（包括赛事中止的时间段）将被计为无效，按照未参赛处理。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>伤停补时</div>
              <div className={styles.content}>
                伤停补时总时的投注，将按照第四裁判记分牌上的时间进行结算，而不采用实际的比赛时间。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>十分钟事件</div>
              <div className={styles.content}>
                第一个十分钟事件必须发生在0:00至09:59时段内（例如：如果在此时段中获判一个角球，但该角球是在10:00后进行，则不计算在内）。指定的10分钟必须完成，投注方可成立（除非特定盘口的结果已被确定）。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>首个角球时间</div>
              <div className={styles.content}>
                投注的结算将依据实际的角球开出时间（而非获判角球的时间）。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>半场比分预测（半场正确比分及首个得分球员）</div>
              <div className={styles.content}>
                如果球员是在一个进球得分已经产生后进场、或没有参加上半场比赛、或上半场进球全部为乌龙球，则投注将按照半场正确比分盘口的单注进行结算，且使用比赛开始时的相应赔率。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>任意时间比分预测（正确比分及任何时间得分球员）</div>
              <div className={styles.content}>
                如果球员没有在90分钟内进场、或仅进了乌龙球，则投注将按照正确比分盘口的单注进行结算，并使用比赛开始时的相应赔率。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>时间预测（首个进球时间及首个得分球员）</div>
              <div className={styles.content}>
                所投注的球员必须开始比赛，投注方可成立。否则包括该球员的投注将计为无效（与首个进球的时间无关）。如果进球为乌龙球，则投注将计为无效。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>让分投注，包括滚球（三项）</div>
              <div className={styles.content}>
                让分投注的结算是以让分赔率为准，按让分后的赛果来计算的。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>半场赛果，包括滚球</div>
              <div className={styles.content}>
                若赛事在上半场结束前被中止，投注作废。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>获得最多进球的半场</div>
              <div className={styles.content}>
                如果赛事中止，投注作废。除非投注结算已可被确认。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>半场正确比分</div>
              <div className={styles.content}>
                若赛事在上半场结束前被中止，投注作废。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>上半场进球数</div>
              <div className={styles.content}>
                若赛事在上半场结束前被中止，除非投注结算已可被确认，否则投注作废。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>球队最高得分半场</div>
              <div className={styles.content}>
                预测指定球队在比赛哪个半场中射入更多进球。如果比赛中止，除非投注结算已可被确认，否则投注作废。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>上半场角球数，包括滚球</div>
              <div className={styles.content}>
                若赛事在上半场结束前被中止，除非投注结算已可被确认，否则投注作废。获判但并未实际执行的角球，不予计算在内。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>两项角球数滚球盘</div>
              <div className={styles.content}>
                结算依据为比赛中的总角球数。如果赛事在90分钟前被中止，除非投注结算已可被确认，否则所有投注作废。获判但并未实际执行的角球，不予计算在内。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>最多角球数滚球盘</div>
              <div className={styles.content}>
                结算依据为比赛中获得最多角球数的球队，如果赛事中止，所有投注作废。获判但并未实际执行的角球，不予计算在内。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>“首先获得”角球数滚球盘</div>
              <div className={styles.content}>
                结算依据为首先获得指定角球数的球队。如果赛事在90分钟前被中止，除非投注的结算已可被确认，否则所有投注作废。获判但并未实际执行的角球，不予计算在内。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>10/20/30/40等分钟赛果滚球盘</div>
              <div className={styles.content}>
                结算依据为比赛在指定时间的赛果。如：10分钟赛果的结算依据为比赛进行了10分钟时的赛果。如果赛事在90分钟前被中止，除非投注的结算已被确定，否则所有投注作废。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>半场 - 全场双重赛果</div>
              <div className={styles.content}>
                如果赛事中止，投注作废。加时赛及点球不予计算在內。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>虚拟比赛</div>
              <div className={styles.content}>
                这是将两支队伍在一轮赛事中进行组合的一种虚拟比赛，仅用于投注。在实际比赛中进球最多的球队将被视为获胜者。如果两队所进的球一样多，投注按平局结算。如果两队中任一队的比赛被推迟或取消，投注无效。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>赛事特別投注</div>
              <div className={styles.content}>
                除非另有说明，否则如果特别投注中所投的球员未能参赛，投注作废。 除非另有说明，否则投注结算以90分钟赛果为准，加时赛、金球或点球决胜均不计算在內。
                如果特别投注中所含参赛者多于一个，而且某些参赛者未参赛，则如果相应赔率适用，投注（对于剩余参赛者来说）依然有效。
                对于“球队获胜进球手”的投注，只有当球员所属的球队以恰好一球赢得比赛，而且被投注的球员射入最后一球时，投注才算赢。 对于“上下半场均获胜的球队”投注，只有球队在上下半场得分均领先于对方球队时，投注才算赢。
                关于“落后反超获胜的球队”的投注盘，所投注的球队必须首先在比赛中任意阶段落后，但后来反超获胜（90分钟内），投注才算赢。 球队“点球得分/罚失点球” -
                所有投注以90分钟赛事为准。若赛事中没有出现点球，投注将会结算为输。 如果罚点球时犯规（裁判员认定罚点球者在向前跑动或踢球时方式不当），则该点球将不被视为罚中/罚失，且不计入此盘口。 “比赛中出现点球” -
                如果点球判出，此盘口的结算以“是”为赢，与结果无关（例如，罚中/罚失或罚点球时犯规）。但是如果视频助理裁判推翻原来的判决，那么此盘口的结算以“否”为赢，除非在比赛中出现其他点球。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>全场最佳球员</div>
              <div className={styles.content}>
                该投注的结算将按官方组织（如FIFA的世界杯赛）宣布的结果为根据。如果没有官方结果，则投注将以Sky电视台评定的比赛最佳球员为准。如果比赛没有Sky电视台直播，则按照英国无线电视（或其他广播、电视台）评定的比赛最佳球员为准。如果没有直播，则无论比赛节目主持或权威人士是否评出最佳球员，所有相关投注都无效。
                参加比赛的球员将被视为“参赛者”。如果投注球员没有参加比赛，投注无效。如果一个或一个以上的球员被评定为全场最佳球员，并列名次规则适用。
                依客户要求，我们将为没开出盘口的球员提供赔率。因此，如果没开出盘口的球员最后被评为全场最佳球员，将仍算作获胜者。
              </div>
            </Accordion>
            <Accordion>
              <div className={styles.title}>双胜彩</div>
              <div className={styles.content}>
                该投注盘有以下选项： 1或X - 如果主队胜出或者两队打和，该选项投注为赢。 X或2 - 如果客队胜出或者两队打和，该选项投注为赢。 1或2 -如果主队胜出或客队胜出，该选项投注为赢。
                进行投注结算时，如果比赛是在中立场举行，列在前面的球队将被视为主队。
              </div>
            </Accordion>
          </div>);
      case '2':
        return (<div>
          <div className={styles.h1}>亚洲让分盘</div>
          <Accordion>
            <div className={styles.title}>介绍</div>
            <div className={styles.content}>
              有关投注的结算，请参照以下个例：
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>让球数为0球</div>
            <div className={styles.content}>
              如果任何一队以任何比分胜出，投注该队获胜的为赢。如为平局，所有投注计为作废，投注金退还。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>让球数为0，0.5球</div>
            <div className={styles.content}>
              球队让出0，0.5球： 球队以任何比分胜出 - 投注项为赢。 平局 - 投注于此项的一半投注金退还客户。另一半的投注被判为输。 球队以任何比分输 - 此项投注为输。 球队获得0，0.5让球： 球队以任何比分胜出
              - 投注项为赢。 平局 - 一半投注按照所选项赔率进行结算，另一半投注退还客户。 球队以任何比分输 - 此项投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>让球数为0.5球</div>
            <div className={styles.content}>
              球队让出0.5球： 球队以任何比分胜出 - 投注项为赢。 平局 - 此项投注为输。 球队以任何比分输 - 此项投注为输。 球队获得0.5让球： 球队以任何比分胜出 - 投注项为赢。 平局 - 投注项为赢。
              球队以任何比分输 - 此项投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>让球数为0.5，1球</div>
            <div className={styles.content}>
              球队让出0.5，1球： 球队以多于对方至少两球胜出 - 投注项为赢。 球队以多于对方正好一球胜出 - 一半投注按照所选项赔率进行结算，另一半投注退还客户。 平局或以任何比分输 - 此项投注为输。
              球队获得0.5，1让球： 平局或以任何比分赢得赛事 - 投注项为赢。 球队输掉一球 - 投注於此项的一半投注金将退还客户。另一半的投注为输。 球队输掉至少两球 - 此项投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>让球数为1球</div>
            <div className={styles.content}>
              球队让出1球： 球队以多于对方至少两球胜出 - 投注项为赢。 球队以多于对方正好一球胜出 - 所有投注作废，投注金退还客户。 平局或以任何比分输 - 此项投注为输。 球队获得1个让球： 平局或以任何比分赢得赛事
              - 投注项为赢。 球队输掉一球 - 所有投注作废，投注金退还客户。 球队输掉至少两球 - 此项投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>亚洲让分滚球盘（包括上/下半场投注）</div>
            <div className={styles.content}>
              所有亚洲让分滚球盘投注结算将以投注被接受后，赛事/半场剩下时间内的进球为准。例如：出于结算原因，在投注被接受前所射进的任何球均不作数。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>亚洲角球让分</div>
            <div className={styles.content}>
              若全场或半场角球让分 - 赛事结束时让分适用于最终角球计算，且让分调整后角球最多的球队将被视为获胜者。如果让分适用后的各球队角球数相同，所有投注将无效且投注金额将被返还。 四分之一角球让分 -
              例如0.5，1是¾角球让分，且您的投注均分于半场角球和全场角球。 例如： 阿森纳 V 曼联，阿森纳角球让分为0.5， 1，且阿森纳为热门。
              您投注阿森纳。如果阿森纳比曼联多获得2个或更多角球，您即为赢。如果阿森纳恰好多获1个角球，您的一半投注为赢，其余一半投注将被返还。否则，您的整个投注都为输。
              如果比赛在90分钟前中止，所有投注均为无效，除非结算已经可以确定。 如果必须重发角球（例如，在禁区内犯规），只按一个角球数计算。获发角球但是实际未发，不计入角球数。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>上半场/下半场亚洲让分盘</div>
            <div className={styles.content}>
              投注只以相应的半场比赛结果结算。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>加时赛亚洲让分滚球盘</div>
            <div className={styles.content}>
              常规亚洲让分滚球盘规则适用，但只计算加时赛中的进球。加时赛开始时的比分将被视为0-0。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>亚洲总罚牌数</div>
            <div className={styles.content}>
              预测一场比赛中的罚牌总数。牌数盘口可以为1/4牌数，1/2牌数或整牌数，结算规则如下： 牌数盘口为4.5 -
              当您投注高于4.5时，如果比赛中出现多于4张罚牌，则投注为赢。否则，投注为输。当您投注低于4.5时，如果比赛中出现少于5张罚牌，则投注为赢。否则，投注为输。
              对于牌数盘口为整数的情况，如果比赛罚牌数与您投注的牌数盘口一致，则投注金被退回。 牌数盘口为5.5，6 -
              如果您投注高于5.5，6盘口，则投注将在高于5.5牌和高于6牌间平分。如果比赛中出现多于6张罚牌，投注为赢。如果比赛中正好出现6张罚牌，您的一半投注金赢，一半将被退回。否则，您的全部投注为输。如果您投注低于5.5，6盘口，则投注将在低于5.5牌和低于6牌间平分。如果比赛中出现少于6张罚牌，投注为赢。如果比赛正好出现6张罚牌，您的一半投注为输，一半将被退回。否则，您的全部投注为输。
              黄牌计为1分，红牌计为2分。出于结算原因，第2张黄牌将不计算在内（每位球员最多可计3张罚牌） 投注的结算以规定的90分钟赛事中出示的牌数为准。任何在比赛完场结束的哨声吹响后出示的罚牌不计入内。
              对非参赛球员（例如：球队教练、替补球员或不参与后续比赛的被替补球员）所出示的罚牌不计入总罚牌数。 如果赛事在90分钟前被中止，除非投注的结算已可被确认，否则所有投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>亚洲总角球数</div>
            <div className={styles.content}>
              预测一场比赛中的角球总数。角球数盘口可以是1/4角球数、1/2角球数或整角球数盘口，结算方法如下： 角球数盘口为8.5 -
              如果您投注高于8.5，则比赛中的角球总数大于8，您的投注就为赢。否则，您的投注为输。如果您投注低于8.5，则比赛中的角球总数低于9，您的投注就为赢，否则，您的投注为输。
              如果角球数盘口为整数，且比赛中的角球总数等于盘口数，您的投注金额将被退回。
              角球数盘口为8，8.5--如果您投注高于盘口数，您的投注金额将在大于8个角球和大于8.5个角球之间平均分配。如果比赛中的角球总数大于8，您的投注为赢。如果刚好是8，一半的投注额算输，另一半的投注额退回。否则，您的全部投注为输。如果您投注低于盘口数，您的投注金额将在小于8个角球和小于8.5个角球之间平均分配。如果比赛中的角球总数小于8，您的投注为赢。如果刚好是8，一半的投注额算赢，另一半的投注额退回。否则，您的投注全部为输。
              除非投注的结算已被确认，否则若赛事在90分钟之前被中止﹐投注作废。 如果必须重发角球（例如，在禁区内犯规），只按一个角球数计算。获发角球但是实际未发，不计入角球数。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>亚洲角球滚球盘</div>
            <div className={styles.content}>
              结算同赛前亚洲角球，如果赛事在90分钟前被中止，除非投注的结算已被确认，否则所有投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>上半场亚洲角球滚球盘</div>
            <div className={styles.content}>
              结算同赛前亚洲角球，但是结算依据为半场总角球数。如果赛事在半场前被中止，除非投注的结算已被确认，否则所有投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>加时赛进球数滚球盘</div>
            <div className={styles.content}>
              只计算加时赛的进球。在加时赛未完成前比赛就已中止的情况下，所有投注都将无效，除非该投注的结果已经确定。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>大小盘</div>
            <div className={styles.content}>
              除非投注的结算已经确定，否则如果赛事在90分钟前被中止，所有相关投注作废。有关投注的结算，请参照以下个例：
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>大小盘盘口为2</div>
            <div className={styles.content}>
              低于2个进球 - 如果比赛中没有进球或只有一个进球，投注为赢。如果刚好有两个进球，投注金被退还。如果有三个或更多的进球，投注为输。 高于2个进球 -
              如果比赛中有三个或更多的进球，投注为赢。如果刚好有两个进球，投注金被退还。如果没有进球或只有一个进球，投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>大小盘盘口为2，2.5</div>
            <div className={styles.content}>
              低于2，2.5个进球 - 如果比赛中没有进球或只有一个进球，投注为赢。如果刚好有两个进球，则一半投注金为赢，另一半将被返还。如果有三个或更多的进球，投注为输。 高于2，2.5个进球 -
              如果比赛中有三个或更多的进球，投注为赢。如果刚好有两个进球，则一半投注金将被返还，另一半为输。如果没有进球或只有一个进球，投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>大小盘盘口为2.5</div>
            <div className={styles.content}>
              低于2.5 个进球 - 如果比赛中没有进球或是只有一个或两个进球，投注为赢。如果有三个或更多的进球，投注为输。 高于2.5 个进球 -
              如果比赛中有三个或更多的进球，投注为赢。如果没有进球或是只有一个或两个进球，投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>大小盘盘口为2.5，3</div>
            <div className={styles.content}>
              低于2.5，3 个进球 - 如果比赛中没有进球或只有一个或两个进球，投注为赢。如果刚好有三个进球，一半投注金将被返还，另一半为输。如果有四个或更多的进球，投注为输。 高于2.5，3 个进球 -
              如果比赛中有四个或更多进球，投注为赢。如果刚好有三个进球，一半投注金将被返还，另一半为赢。如果没有进球或是只有一个或两个进球，投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>大小盘盘口为3</div>
            <div className={styles.content}>
              低于3 个进球 - 如果比赛中没有进球或只有一个或两个进球，投注为赢。如果刚好有三个进球，投注金将被返还。如果有四个或更多的进球，投注为输。 高于3 个进球 -
              如果比赛中有四个或更多的进球，投注为赢。如果刚好有三个进球，投注金将被返还。如果没有进球或只有一个或两个进球，投注为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>滚球大小盘</div>
            <div className={styles.content}>
              在滚球盘结算中，无论进球发生在投注之前或之后，所有进球都计算入内。
            </div>
          </Accordion>
        </div>);
      case '3':
        return (<div>
          <div className={styles.h1}>锦标赛投注</div>
          <Accordion>
            <div className={styles.title}>球队最佳进球得分手</div>
            <div className={styles.content}>
              若包括90分钟及加时赛，但点球对决时的进球不计入内。并列名次规则适用。所列出的球队名称仅供参考。如果球员被从所列出的球队转至其他球队，投注仍然成立。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>俱乐部最佳进球得分手</div>
            <div className={styles.content}>
              包括90分钟及加时赛，但点球对决时的进球得分不计入内。并列名次规则适用。如果俱乐部中没有任何人进球得分，所有投注将被返还。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>最佳进球得分手</div>
            <div className={styles.content}>
              包括90分钟及加时赛，但点球对决时的进球不计入内。并列名次规则适用（而不是获得“金靴奖”的球员等规则）。所列出的球队名称仅供参考。如果球员被从所列出的球队转至其他球队，投注仍然成立。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>锦标赛总数/特别投注</div>
            <div className={styles.content}>
              锦标赛罚牌总数 -
              每场球赛每位球员的最高罚牌总数为一张黄牌和一张红牌。（例如，因为第二张黄牌而得到了一张红牌时，此黄牌不算。）加时赛中的罚牌不予计算。只有球员在赛场上被罚的方为有效，即不包括场下的球队经理或候补队员被罚的牌。
              锦标赛进球总数、球队进球总数、最高得分球队 - 盘口适用于整个锦标赛事，90分钟赛事或加时赛的进球得分均计入。关于给定日期的特定赛事盘口，仅计入90分钟赛事中的进球得分。另外，点球对决中的进球不计入在内。
              如果比赛延期，进球总数（给定日期的一组比赛）投注将按无效处理。比赛需要进行50％，最高得分球队盘口上的投注方为有效，且如果比赛延期，规则4（扣除）适用。 锦标赛点球射失/射入 －
              90分钟、加时赛以及点球对决中的点球均包括在内。如果点球需要重新进行，之前作废的点球将不计入内。 锦标赛角球数 － 只计算90分钟内的角球。 球队不败 -
              球队必须完成锦标赛且必须未输任何一场比赛或任何两回合比赛。通过客场进球、加时或点球对决方式造成的输球均意味着盘口将结算为“否”。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>锦标赛及最佳进球得分手双式投注</div>
            <div className={styles.content}>
              特殊的赔率将用于预测锦标赛获胜者和锦标赛最佳进球得分手。并列名次规则适用。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>金球</div>
            <div className={styles.content}>
              该盘口对金球的获得者进行结算（由FIFA宣布的赛事最优秀球员）。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>金手套</div>
            <div className={styles.content}>
              该盘口对金手套的获得者进行结算（由FIFA宣布的赛事最优秀守门员）。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>UEFA锦标赛最佳球员</div>
            <div className={styles.content}>
              该盘口对锦标赛最佳球员的获得者进行结算（由UEFA宣布的赛事最佳球员）。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>俱乐部进球得分手配对投注</div>
            <div className={styles.content}>
              在相关两位球员均必须参与赛事，投注方有效。在平局情况下，所有投注金将被退还。加时赛进球得分计算入内，但点球对决时的进球不算在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>晋级最高的球队</div>
            <div className={styles.content}>
              该投注取决于球队在哪个比赛阶段被淘汰，不论其是否有加时赛或重赛。获得冠军的球队将视为晋级最高的球队。并列名次规则适用。无论球队是否参赛，投注都有效。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>资格赛配对投注</div>
            <div className={styles.content}>
              在如果球队在比赛前被取消资格，并且配对投注中的另一球队被获准“轮空（bye）”，则所有相关的资格赛投注将被作为平局处理。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>各洲最佳球队</div>
            <div className={styles.content}>
              在投注根据相关球队出局的那一局赛事进行结算，与加时赛无关。在决赛中获胜的球队将被视为最佳球队。并列名次规则适用。
            </div>
          </Accordion>
        </div>);
      case '4':
        return (<div>

          <div className={styles.h1}>早期投注</div>
          <Accordion>
            <div className={styles.title}>赛季特别投注</div>
            <div className={styles.content}>
              投注结算以球队在赛季结束的联赛排名/总积分为准。除非在个别的精选投注盘中有特别声明，否则决赛得分不予计算在内。 球员进球特别投注将以与俱乐部/联赛（在投注盘中指明的）相关的进球数为准。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>进入季后排位赛</div>
            <div className={styles.content}>
              投注在4个进入季后排位赛的球队的投注为获胜。其他自动获得晋级或没有进入季后排位赛的球队视为输。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>滚球大小盘</div>
            <div className={styles.content}>
              在滚球盘结算中，无论进球发生在投注之前或之后，所有进球都计算入内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>结束时排名前半部分/后半部分</div>
            <div className={styles.content}>
              投注结算是以球队在赛季结束时官方的最终排名为准。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>降级投注</div>
            <div className={styles.content}>
              如果季赛开始前，球队已经从联赛中取消了，那么相关盘口的所有投注都将被取消， 同时新的降级名单将会列出。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>转会特别投注</div>
            <div className={styles.content}>
              球员所在俱乐部是指球员签订长期合同的俱乐部。租借合约不计算在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>赛季让分获胜</div>
            <div className={styles.content}>
              投注的结算依据为全部球队最终联赛总积分让分后的赛果。并列名次规则适用（净胜球不计算在内）。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>联赛投注</div>
            <div className={styles.content}>
              在联赛投注中，在规定的赛事结束后的各队排名将决定其最终排名（如果有两个或更多球队并列排名，则根据官方比赛规则，并列名次规则适用），附加赛或随后的质询不会对结算产生影响。即使球队未完成其所有比赛，投注仍可成立。
              该规则不适用于南美联赛。当两队在联赛时的总分为并列第一名时，需进行附加赛来决定冠军。在这种情况下，我们将视附加赛的获胜方为冠军。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>最佳进球得分手</div>
            <div className={styles.content}>
              只有在指定联赛中的进球方为有效（与为联赛哪一队所进的球无关）。投注盘上所标明的球员所属球队仅为参考。只有联赛进球才计算在内 - 不包括附加赛。乌龙球不计算在内。并列名次规则适用。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>赛季赛事投注/球队积分投注</div>
            <div className={styles.content}>
              如果任何球队未能完成其联赛赛程安排，有关此队的所有赛事投注和球队积分投注均作废（无论赢或输）。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>下一位常任经理</div>
            <div className={styles.content}>
              投注的结算以俱乐部宣布的下一位常任经理为准。其他的管理者或临时经理不算在内。如果被任命者不被称为经理（manager），则结算以被选中组建第一支球队的人为准。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球队经理在赛季结束时不再担任其原职位</div>
            <div className={styles.content}>
              赛季结束是指包括附加赛在内的所有联赛日程完成的时间。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>下一位离任的球队经理（解雇竞赛）</div>
            <div className={styles.content}>
              如果没有球队经理在最后一场联赛日程的赛事（包括附加赛）结束前离任，那么“没有经理离任”投注项胜出。
            </div>
          </Accordion>
        </div>);
      case '5':
        return (<div>
          <div className={styles.h1}>球赛数据投注</div>
          <Accordion>
            <div className={styles.title}>界外球盘口</div>
            <div className={styles.content}>
              如果赛事在90分钟前被终止，除非投注的结算已被确定，否则所有投注作废（除非另有说明）。 上半场界外球盘口 - 如果赛事在上半场前被终止，则投注作废，除非投注的结算已被确定。 10分钟界外球盘口 -
              界外球必须出现在指定时间段内（例如：0:00至09:59之间）方可计入首个10分钟。指定的10分钟必须完成，投注方可成立（除非特定盘口的结果已被确定）。
              特定附加界外球盘口的结算依据指定比赛时段（例如：上半场/下半场/10分钟）结束时的界外球数。判罚但未开出的界外球不计在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球比赛中出现红牌</div>
            <div className={styles.content}>
              投注的结算将以在规定的90分钟赛事中红牌出示的次数为准。任何在比赛全场结束的哨声吹响后出示的红牌不计入内。 向非参赛球员（例如：球队教练、替补球员或不参与后续比赛的被替补球员）出示罚牌将不计在内。
              如果比赛在90分钟前终止，所有投注均为无效，除非结算已经可以确定。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球队进球数</div>
            <div className={styles.content}>
              指定球队的进球数。结算依据仅限90分钟比赛，加时赛和点球不予计算在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球员总进球</div>
            <div className={styles.content}>
              球员有入场比赛，投注方可成立。90分钟内及加时赛进球将被计算在内，但点球决胜负时的进球不予计算在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>首个头顶进球的球队</div>
            <div className={styles.content}>
              如果没有头球进球，所有本金退还。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>角球总数，下半场角球数</div>
            <div className={styles.content}>
              被裁定但并未实际执行的角球，不予计算在内。请注意，此规定适用于所有角球盘口。 除非投注的结算已被确认，否则若赛事在90分钟之前被中止，投注作废。
              如果某个角球被重新进行（例如在禁区内犯规），则我们将只按一个角球计算。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>加时赛角球滚球盘</div>
            <div className={styles.content}>
              只有加时赛的角球方可计入计算，如果比赛在加时赛结束前中止，所有投注无效，除非投注结算已可被确定。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>上/下半场角球数乘积投注</div>
            <div className={styles.content}>
              角球乘积结果是将上半场的角球数乘以下半场的角球数所得的结果。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>角球亚洲盘</div>
            <div className={styles.content}>
              被裁定但并未实际执行的角球，不予计算在内。相关让球盘的投注结算将以最后角球数经过让球额计算后的为准。如果赛事被中止，相关投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>附加角球</div>
            <div className={styles.content}>
              特定附加角球盘口的结算依据指定比赛时段（例如：上半场/下半场/10分钟）结束时的总角球数。判出但未进行的角球不计入在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球队角球</div>
            <div className={styles.content}>
              结算将根据指定球队进行的角球数计算。如果赛事在90分钟前中止，那么所有的投注将被视为无效，除非投注的结算己被确定。判出但未进行的角球不计入在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球进球总数/比赛的进球数/附加进球总数 滚球盘/下半场进球数</div>
            <div className={styles.content}>
              除非投注结算已被确定，否则如果比赛在90分钟结束前被中止，所有相关投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>加时滚球大小盘</div>
            <div className={styles.content}>
              常规滚球大小盘规则适用，仅加时赛进球计算在内。加时赛开始时，比赛当作是从0比0开始计算。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>10分钟内事件滚球盘</div>
            <div className={styles.content}>
              角球/球门球/任意球/界外球 -
              投注根据特定10分钟内发生的事件数进行结算。41-50分钟和81-90分钟时段包括补时。只有在特定时段内已进行（而不是判出）的事件才算入内。如果出现中止的情况，任何对未完成时段所下的投注都将无效，除非投注的结算已被确定。请注意：对于10分钟内任意球盘口，点球不算作任意球。重新进行的角球、界外球、球门球和任意球只算作1。犯规的界外球不算入内。
              罚牌 - 投注根据特定10分钟内发生的事件数进行结算。41-50分钟和81-90分钟时段包括补时。此盘口根据判出事件的时间进行结算，例如，裁判员亮出罚牌时。
              如果视频助理裁判被用于确定进球，那么原来进球的时间有效。 如果视频助理裁判被用于判出红牌，那么结算将以裁判员在视频助理裁判重审之后判出红牌的时间为准。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>1分钟内事件和下一个定点球（5分钟） - 包括滚球盘</div>
            <div className={styles.content}>
              角球/球门球/任意球/界外球 - 这些盘口将根据事件进行时的时间结算（而不是判出的时间）。如果事件被重新进行，结算将以（非犯规）事件被执行的时间为准，且犯规事件不计在内。 罚牌/点球 -
              这些盘口将根据事件判出的时间结算，例如，当裁判员亮出罚牌或指向罚球点时。与罚球点球结果（罚中/罚失/犯规）无关。
              如果视频助理裁判被用于确定点球或进球，原来的进球或判罚点球的时间将有效。如果视频助理裁判被用于判出点球或红牌，那么结算将以裁判员在视频助理裁判重审之后判出点球或亮出红牌的时间为准。如果视频助理裁判被用于推翻原来的点球判决，那么在这种情况下，点球将被视为未判出。
              请注意，点球不视为任意球。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>进球奇/偶数</div>
            <div className={styles.content}>
              任何最终结果为0-0的比赛都将按照进球数为偶数的结果来进行结算。关于球队奇/偶数盘口，如果指定球队没有得分，则我们将按照“偶数”进球进行结算。如果出现一场比赛被取消的情况，则在该场比赛上的所有投注都将被判为无效。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>两支球队都得分</div>
            <div className={styles.content}>
              如果比赛在两队都得分后被中止，则投注“是”的盘口为赢，投注“否”的盘口为输。然而如果比赛在被推迟或中止时没有任何一队得分，则所有投注将作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>两队均在上半场和/或下半场得分</div>
            <div className={styles.content}>
              预测比赛中的两队是否均在上半场和/或下半场得分。如果比赛中止，除非投注结算已可被确认，否则投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>主/客队均在上半场/下半场得分</div>
            <div className={styles.content}>
              预测比赛中的球队是否能在上半场或下半场得分。如果比赛中止，除非投注结算已被确认，否则投注作废。出于结算目的，如果比赛是在中立场举行，则列在前面的球队将被视为主队。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>半场赛果/两队均得分</div>
            <div className={styles.content}>
              预测上半场赛果以及两队是否均在上半场得分。如果比赛中止，除非投注结算已可被确认，否则投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>半场赛果/进球总数</div>
            <div className={styles.content}>
              预测上半场赛果以及上半场进球总数。如果比赛中止，除非投注结算已可被确认，否则投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>联赛进球数</div>
            <div className={styles.content}>
              该赛区内必须至少进行四场比赛，投注方为有效。被取消或被延迟的比赛的进球数将被视作2.5个。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>最快进球</div>
            <div className={styles.content}>
              即根据每支队伍的实际开球时间，预测取得最快进球的球队的投注。并列名次规则和规则4（扣除）均适用。投注结算将根据取得第一个得分进球的具体时间。如果比赛开始时间推迟，但仍在同一天进行的情况下，投注依然成立。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>进球高于/低于</div>
            <div className={styles.content}>
              预测比赛中的进球数为高于还是低于2.5的盘口。如果赛事在90分钟前被中止，则所有投注计为无效，除非投注结算已明确。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>进球分钟累计</div>
            <div className={styles.content}>
              对赛事中所有进球的时间总和进行预测，例如：在赛事进行到24分钟时射入一球，51分钟时射入一球，59分钟时射入一球，即进球分钟的累计总和为134分钟。任何在上半场的加时赛时所进球，计为45分钟；任何在下半场的加时赛时所进的球，计为90分钟。若对进球的准确时间产生争执时，投注的结算将以PA公布的结果为准。
              如果赛事中止，除非进球时间已经被计算在内，否则投注作废（例如，赛事在65分钟时被中止，而在40分钟，45分钟和60分钟时产生进球；此时，投注赛事进球分钟的总和是高于140分钟为赢，反之投注赛事进球分钟的总和是低于140分钟为输）。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>比赛中的罚牌数</div>
            <div className={styles.content}>
              黄牌计为1，红牌计为2。进行投注结算时，第2张黄牌将不计算在内（每位球员可计的最多罚牌数为3）。 投注的结算将以在规定的90分钟赛事中红黃牌出示的次数为准。任何在比赛常规90分钟结束后举出的红黃牌将不予计算在內。
              对非参赛球员（例如：球队教练、替补球员或不参与后续比赛的被替补球员）所出示的罚牌不计入总罚牌数。 如果赛事在90分钟前被终止，除非投注的结算已被确定，否则所有投注作废（除非另有说明）。 上半场/下半场罚牌数盘口
              - 出于结算目的，半场休息期间（即在上半场结束后）出示给上场球员的罚牌数将计入下半场的罚牌数中。 上半场罚牌数盘口 - 如果赛事在上半场前被终止，则投注作废，除非投注的结算已被确定。 10分钟罚牌数盘口 -
              罚牌必须出现在指定时间段内（例如：0:00至09:59之间）方可计入首个10分钟。指定的10分钟必须完成，投注方可成立（除非特定盘口的结果已被确定）。
              特定附加罚牌盘口的结算依据指定比赛时段（例如：上半场/下半场/10分钟）结束时的罚牌总数。 罚牌让分 - 指定的让分将适用于最终罚牌总数。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>收到第一张罚牌 / 首位收到罚牌的球员</div>
            <div className={styles.content}>
              如果赛事中出现由于同一原因而有两个或两个以上的球员获得罚牌，则出于投注结算原因，首先被裁判员出示罚牌的球员将被视为赢。在这些盘口中，黄牌和红牌均被计算在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>第一张罚牌时间</div>
            <div className={styles.content}>
              在该盘口中，黄牌和红牌均被计算在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>第一个收到罚牌的球队/下一张罚牌投注</div>
            <div className={styles.content}>
              只有对在场上比赛的球员所出示罚牌方为有效。如果赛事中出现由于同一原因而有两个或两个以上的球员获得罚牌，则出于投注结算原因，首先被裁判员出示罚牌的球员将被视为“获胜者”。
              在进行投注结算时，一张红牌将视为两张罚牌。例如，如果是两张黄牌和一张红牌时，那下一张出现的罚牌为第五张罚牌。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球员被出牌</div>
            <div className={styles.content}>
              如果所投注的球员未参赛，投注将为无效。 只有球员在赛场上被出示罚牌方可计入。向非参赛球员（例如：球队教练、替补球员或不参与后续比赛的被替补球员）出示罚牌将不计在内。
              投注的结算以规定的90分钟赛事中出示的罚牌为准。任何在比赛常规90分钟结束后举出的红黄牌将不予计算在内。 在该盘口中，黄牌和红牌均被计算在内。 如果比赛在90分钟前中止，所有投注均为无效，除非结算已经可以确定。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>下一个进球方式</div>
            <div className={styles.content}>
              任意球 - 进球必须是在任意球时直接射进。在出现“折射”的情况下，如果任意球射手被判获得进球得分，则该球将被计算在内。此外，还包括角球直接进球。 点球 - 进球必须是在点球时射进，且进行点球球员将为进球得分手。
              乌龙球 - 如果该球被射进自己球队球门为乌龙球。 头球 - 射手最后接触该进球的身体部分必须是头部。 射门 - 所有以上不包括在内的其它进球类型。 无进球
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>进球球衣号码总和</div>
            <div className={styles.content}>
              如果进球为乌龙球，进球队员的球衣号将被记入得分方的进球球衣号码总和中。请留意，此处的条例有別于“首位得分球员”的相关条例。
              在所有对球员的球衣号的投注中，球员在上场时（对于替补队员，则在替换上场时）所穿的球衣，将被视为在整场赛事中所穿的球衣。 如果球员在其第一次上场时，其球衣沒有号码，球衣号码计为12。
              如果赛事在90分钟之前中止，此投注作废；投注结算已可被确认的除外。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>绝对优势</div>
            <div className={styles.content}>
              绝对优势投注通常为对一系列赛事进行投注（例如，所有主场队的得分总和对所有客场队的得分总和）。如果有一场或以上赛事被中止，投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>首先/第二支/下一支得分球队</div>
            <div className={styles.content}>
              乌龙球将被记为得分方的进球。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>最后得分的球队</div>
            <div className={styles.content}>
              如果赛事中止，投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球队表现</div>
            <div className={styles.content}>
              仅限于90分钟的比赛时间。每支单独球队得/扣（失）分规定如下： 赢得比赛=25分 比赛中打成平局=10分 每个得分的进球=15分 每次所得并罚出的角球=3分 保持无失球=10分
              在比赛时间的20:00前得分=10分加分（每队最多加10分） 每张得到的黄牌或红牌=分别扣除5分和15分（每位球员最多扣除20分） 如果出现比赛没有进行完毕的情况，则所有投注作废。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>最后的点球（罚中/罚失）</div>
            <div className={styles.content}>
              预测最后的点球为罚中还是罚失 - 如果比赛没有进行到点球对决，所有投注无效。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>点球对决进行到突然死亡</div>
            <div className={styles.content}>
              预测点球大战会否进行到突然死亡阶段（如进行11个点球或以上） - 如果比赛没有进行到点球对决，所有投注无效。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球队的下一个点球</div>
            <div className={styles.content}>
              预测球队的下个一点球将被罚中或者罚失 -
              如果比赛没有进行到点球对决时或者球队没有进行指定点球，则所有投注无效。如果罚点球时犯规（裁判员认定罚点球者在向前跑动或踢球时方式不当），则该点球将不被视为罚中/罚失，且不计入此盘口。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球队罚中的点球总数</div>
            <div className={styles.content}>
              预测点球大战中指定球队所罚中的点球总数 - 如果比赛没有进行到点球对决，则所有投注无效。
            </div>
          </Accordion>

          <Accordion>
            <div className={styles.title}>最后射点球的球队</div>
            <div className={styles.content}>
              预测哪一支球队为最后射点球的球队 - 如果比赛没有进行到点球对决，所有投注无效。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>总罚中点球数（大小盘）</div>
            <div className={styles.content}>
              预测两队在点球大战中的罚中球数 - 如果比赛没有进行到点球对决，所有投注无效。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>点球对决 - 亚洲让分盘</div>
            <div className={styles.content}>
              点球对决亚洲滚球盘按照投注被接受后，在点球对决阶段剩下时段中的得分计算，即：所有投注前已经射入的点球不计入结算。如果比赛没有进行到点球决胜阶段，所有投注都将无效。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>总罚中点球数（高于/低于）</div>
            <div className={styles.content}>
              预测两队在点球大战中的罚中球数 - 如果比赛没有进行到点球对决，所有投注无效。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>任意球盘口</div>
            <div className={styles.content}>
              如果赛事在90分钟前被终止，除非投注的结算已被确定，否则所有投注作废（除非另有说明）。 上半场任意球盘口 - 如果赛事在上半场前被终止，则投注作废，除非投注的结算已被确定。 10分钟任意球盘口 -
              任意球必须出现在指定时间段内（例如：0:00至09:59之间）方可计入首个10分钟。指定的10分钟必须完成，投注方可成立（除非特定盘口的结果已被确定）。
              特定附加任意球盘口的结算依据指定比赛时段（例如：上半场/下半场/10分钟）结束时的任意球数。判罚但未开出的任意球不计在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>球门球盘口</div>
            <div className={styles.content}>
              如果赛事在90分钟前被终止，除非投注的结算已被确定，否则所有投注作废（除非另有说明）。 上半场球门球盘口 - 如果赛事在上半场前被终止，则投注作废，除非投注的结算已被确定。 10分钟球门球盘口 -
              球门球必须出现在指定时间段内（例如：0:00至09:59之间）方可计入首个10分钟。指定的10分钟必须完成，投注方可成立（除非特定盘口的结果已被确定）。
              特定附加球门球盘口的结算依据指定比赛时段（例如：上半场/下半场/10分钟）结束时的球门球数。判罚但未开出的球门球不计在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>界外球盘口</div>
            <div className={styles.content}>
              预如果赛事在90分钟前被终止，除非投注的结算已被确定，否则所有投注作废（除非另有说明）。犯规的界外球不计在内。 上半场界外球盘口 - 如果赛事在上半场前被终止，则投注作废，除非投注的结算已被确定。
              10分钟界外球盘口 - 界外球必须出现在指定时间段内（例如：0:00至09:59之间）方可计入首个10分钟。指定的10分钟必须完成，投注方可成立（除非特定盘口的结果已被确定）。
              特定附加界外球盘口的结算依据指定比赛时段（例如：上半场/下半场/10分钟）结束时的界外球数。判罚但未开出的界外球不计在内。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>输赢比数盘口</div>
            <div className={styles.content}>
              如果比赛在90分钟前终止，所有投注均为无效。 上半场输赢比数盘口 - 如果赛事在上半场前被终止，则投注作废。 10分钟输赢比数盘口 -
              进球必须出现在指定时间段内（例如：0:00至09:59之间）方可计入首个10分钟。指定的10分钟必须完成，投注方可成立。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>Sportbladet Zoom（哪位球员在比赛中跑得最多？）</div>
            <div className={styles.content}>
              无论球员是否参赛，都计为全部参赛。只有列表中的球员计算在内。投注将以Sportbladet Zoom公布的数据结算。
            </div>
          </Accordion>
          <Accordion>
            <div className={styles.title}>比赛/球队/球员数据</div>
            <div className={styles.content}>
              投注根据90分钟规定时间比赛的结果进行结算。若赛事在90分钟完成之前被中止，则所有相关投注都将作废，除非投注的结算己被确定。 对于球员数据盘口，若球员未首发出场，相关投注都将作废。
              下列盘口将根据Opta提供的数据以及他们对每个数据的定义进行结算。详情如下： 射正（比赛/球队/指定球员）- 以下任何有意的射门尝试： a) 进入球网的 b) 本可进入球网，但被守门员救出的 c)
              本可进入球网，但被最靠后的防守球员挡出的 击中门框的射门不计为射正，除非符合上述条件。 射门被其他球员而非最靠后的防守球员挡出的，不计为射正。 射门（比赛/球队/指定球员） 射门定义为以下任何射门尝试： a)
              进入球网； b) 本可进入球网，但被守门员救出或被最靠后的防守球员挡出； c) 射向球门但被防守球员（其身后有其他防守球员或守门员）拦截； d) 本将高于或偏离球门，但被守门员救出或外场球员挡出； e)
              击中门框； f) 在没有与其他球员接触的情况下高于或偏离球门。 越位（比赛/球队）- 对被视为处于越位位置的球员判罚，并在该位置奖励一个任意球。 助攻（指定球员）-
              最后触球（传球、传射或任何其他触球）致使接球球员进球得分，且对方球员没有进行关键性触球。乌龙球或点球不计为助攻。 抢断（球队/指定球员）- 抢断定义为球员在地面争夺中与球发生接触并成功将球从持球者抢过。
              被抢断球员必须在球被抢断前拥有清晰的控球权。 传球（指定球员）- 球由一名球员有意地传给另一名球员。横传、掷界外球和守门员掷球不计为传球。球门球、任意球、角球、开球和罚球可以作为传球进行。
            </div>
          </Accordion>
        </div>);
      default:
        return '';
    }
  };

  return (
    <div className={styles.sportRules}>
      <div className={styles['game-tab']}>
        <div className={styles.name}>体育规则</div>
      </div>
      <div className={styles.main}>
        <div className={styles.selection}>
          <select value={showList} className={styles.select} onChange={change}>
            <option value="1" key={1}>
              90分钟赛事规则
            </option>
            <option value="2" key={2}>
              亚洲让分盘
            </option>
            <option value="3" key={3}>
              锦标赛投注
            </option>
            <option value="4" key={4}>
              早期投注
            </option>
            <option value="5" key={5}>
              球赛数据投注
            </option>
          </select>
        </div>
        <div className={styles.list}>
          {
            renderList()
          }
        </div>
      </div>
    </div>
  );
}
