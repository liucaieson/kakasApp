export default [
/*  {
    path: '/noAuth',
    component: '../layouts/BlockPage',
    routes: [
      { path: '/noAuth.vue', component: './mobile/NoAuthPage', title: '亚冠体育-认证过期' },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/user',
    component: '../layouts/BlockPage',
    routes: [
      { path: '/user/runningAccount', component: './mobile/RunningAccount/index', title: '账变记录' },
      { path: '/user/announcement', component: './mobile/Announcement/index', title: '公告' },
      { path: '/user/historyLog', component: './mobile/BetLog/index', title: '历史投注记录' },
      { path: '/user/betLog', component: './mobile/BetLog/index', title: '您的投注记录' },
      {
        component: '404',
      },
    ],
  },*/
  {
    path: '/',
    component: '../layouts/MBLayout',
    routes: [
      { path: '/', component: './mobile/home/index', title: '亚冠体育-首页'},
      { path: '/bet',
        component: './mobile/Bet/index',
        routes: [
          { path: '/bet', component: './mobile/Bet/InPlay/index', title: '亚冠体育-滚球'},
          { path: '/bet/inPlay', component: './mobile/Bet/InPlay/index', title: '亚冠体育-滚球'},
          { path: '/bet/inPlayMatchList', component: './mobile/Bet/InPlay/matchList', title: '亚冠体育-滚球'},
          { path: '/bet/inPlayDetail', component: './mobile/Bet/InPlay/detail', title: '亚冠体育-滚球'},
          { path: '/bet/today', component: './mobile/Bet/Today/index', title: '亚冠体育-今日赛事'},
          { path: '/bet/todayCompetitionsList', component: './mobile/Bet/Today/competitionsList', title: '亚冠体育-今日'},
          { path: '/bet/todayMixedCompetitionsList', component: './mobile/Bet/Today/mixedCompetitions.js', title: '亚冠体育-今日混合过关'},
          { path: '/bet/todayMatchList', component: './mobile/Bet/Today/matchList', title: '亚冠体育-今日比赛'},
          { path: '/bet/todayMixedMatchList', component: './mobile/Bet/Today/mixedMatchList', title: '亚冠体育-今日混合过关'},
          { path: '/bet/todayDetail', component: './mobile/Bet/Today/detail.js', title: '投注'},
          { path: '/bet/todayMixedDetail', component: './mobile/Bet/Today/mixedDetail.js', title: '混合过关投注'},
          { path: '/bet/asian', component: './mobile/Bet/Asian/index', title: '亚冠体育-早盘'},
          { path: '/bet/asianCompetitionsList', component: './mobile/Bet/Asian/competitionsList', title: '亚冠体育-早盘'},
          { path: '/bet/asianMixedCompetitionsList', component: './mobile/Bet/Asian/mixedCompetitions.js', title: '早盘-混合过关'},
          { path: '/bet/asianMatchList', component: './mobile/Bet/Asian/matchList', title: '早盘'},
          { path: '/bet/asianMixedMatchList', component: './mobile/Bet/Asian/mixedMatchList', title: '早盘-混合过关'},
          { path: '/bet/asianDetail', component: './mobile/Bet/Asian/detail.js', title: '早盘-投注'},
          { path: '/bet/asianMixedDetail', component: './mobile/Bet/Asian/mixedDetail.js', title: '早盘-混合过关投注'},
          { path: '/bet/announcement', component: './mobile/Bet/Announcement', title: '公告'},
          { path: '/bet/help', component: './mobile/Bet/Help', title: '帮助'},
          { path: '/bet/enactment', component: './mobile/Bet/Help/enactment', title: '详细设定'},
          { path: '/bet/SportsRules', component: './mobile/Bet/Help/sportRules', title: '体育规则'},
          { path: '/bet/terms', component: './mobile/Bet/Help/terms', title: '规则与条款'},
          { path: '/bet/oddsCalc', component: './mobile/Bet/Help/oddsCalc', title: '赔率计算列表'},
          { path: '/bet/onlineService', component: './mobile/Bet/Help/onlineService', title: '在线客服24/7'},
          { path: '/bet/mixedTradeGuide', component: './mobile/Bet/Help/mixedTradeGuide', title: '混合过关交易指南'},
          { path: '/bet/accountHistory', component: './mobile/Bet/AccountHistory', title: '账户历史'},
          { path: '/bet/Transaction', component: './mobile/Bet/Transaction', title: '交易记录'},
          { path: '/bet/live', component: './mobile/Bet/Live', title: '直播表'},
          { path: '/bet/gameResult', component: './mobile/Bet/GameResult', title: '赛果'},
        ]
      },
      { component: '404', title: '亚冠体育-页面没找到' }
    ]
  },
]

/*export default [
  {
    path: '/noAuth',
    component: '../layouts/MBboxPage',
    routes: [
      { path: '/noAuth', component: './mobile/NoAuthPage', title: '认证过期' },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/MBLayout',
    routes: [
      { path: '/', component: './mobile/home/BetPage', title: '首页'},
      { path: '/detail', component: './mobile/home/DetailPage', title: '投注页' },
      { path: '/MatchResult', component: './mobile/home/MatchResult', title: '赛果页' },
      { path: '/MatchResult/detail', component: './mobile/home/MatchResult/MatchDetail', title: '赛果详情' },
      { path: '/BetLog', component: './mobile/home/BetLog', title: '投注记录' },
      { path: '/announcements', component: './mobile/home/Announcements', title: '投注记录' },
      { path: '/RunningAccount', component: './mobile/home/RunningAccountLog', title: '账变记录' },
      { path: '/rules', component: './mobile/home/Rules', title: '电竞规则' },
      { component: '404', title: '页面没找到' }
    ]
  },
]*/

/*
{
  path: '/',
    component: '../layouts/MBboxPage',
  routes: [
  { path: '/', redirect: '/m/game'},
  { path: '/m', component: '../layouts/MBGameLayout',
    routes:[
      { path: '/m', redirect: '/m/game'},
      { path: '/m/game', component: './mobile/home/BetPage', title: '首页'},
      { path: '/m/detail', component: './mobile/home/DetailPage', title: '投注页' },
      { path: '/m/MatchResultLine', component: './mobile/home/MatchResultLine', title: '赛果页'},
      { path: '/m/MatchResultLine/detail', component: './mobile/home/MatchResultLine/MatchDetail', title: '赛果详情' },
      { path: '/m/BetLog', component: './mobile/home/BetLog', title: '投注记录' },
      { path: '/m/announcements', component: './mobile/home/Announcements', title: '投注记录' },
      { path: '/m/RunningAccount', component: './mobile/home/RunningAccountLog', title: '账变记录' },
      { path: '/m/rules', component: './mobile/home/Rules', title: '电竞规则' },
    ]
  },
  { path: '/noAuth', component: './mobile/NoAuthPage', title: '认证过期' },
]
},
{ component: '404', title: '页面没找到' } */
