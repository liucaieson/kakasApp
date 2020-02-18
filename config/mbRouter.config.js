export default [
  {
    path: '/',
    component: '../layouts/MBLayout',
    routes: [
      { path: '/', component: './mobile/home/BetPage', title: '首页'},
      { path: '/detail', component: './mobile/home/DetailPage', title: '投注页' },
      { path: '/MatchResultLine', component: './mobile/home/MatchResultLine', title: '赛果页'},
      { path: '/MatchResultLine/detail', component: './mobile/home/MatchResultLine/MatchDetail', title: '赛果详情' },
      { path: '/BetLog', component: './mobile/home/BetLog', title: '投注记录' },
      { path: '/announcements', component: './mobile/home/Announcements', title: '投注记录' },
      { path: '/RunningAccount', component: './mobile/home/RunningAccountLog', title: '账变记录' },
      { path: '/rules', component: './mobile/home/Rules', title: '规则' },
      { path: '/noAuth', component: './mobile/NoAuthPage', title: '认证过期' },
    ]
},
  { component: '404', title: '页面没找到' }
]
