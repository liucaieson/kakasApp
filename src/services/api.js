import request from '../utils/request';

const baseUrl = process.env.NODE_ENV === 'development' ?
  'http://27.102.128.76:8090/api/v1' :
  'http://27.102.128.76:8090/api/v1';

/* 获取用户信息接口 */
export async function loginApp(params) {
  return request(`${baseUrl}/fetchAuthorization`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 获取用户信息接口 */
export async function getUserInfo(params) {
  return request(`${baseUrl}/client/getUserInfo?accessCode=${sessionStorage.getItem('accessCode')}`);
}

/* 2.1.添加到购物车 */
export async function addShopCart(params) {
  return request(`${baseUrl}/portal/pre/getMatchOdds?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


/* 投注 */
export async function postBetOrder(params) {
  return request(`${baseUrl}/client/bet/submit?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


/* 2.1.获取滚球赛事 */
export async function getInPLay(params) {
  return request(`${baseUrl}/portal/inplay/getInplayMatchOdds?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


/* 2.1.获取玩法分组列表 */
export async function getGg(params) {
  return request(`${baseUrl}/portal/pre/getGg?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 2.1.获取玩法分组列表 */
export async function getPreMatchOdds(params) {
  return request(`${baseUrl}/portal/pre/getPreMatchOdds?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 2.1.获取推荐赛事 */
export async function getPreStartMatch(params) {
  return request(`${baseUrl}/portal/pre/getPreMatchOddsByTime`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 2.1.验证购物车中比赛是否过期 */
export async function checkMatchStatus(params) {
  return request(`${baseUrl}/portal/pre/getMatchOdds?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
      },
    }
  );
}


/* 2.1.获取玩法分组列表所有比赛测试 */
export async function getPreMatchOddsAllGG(params) {
  return request(`${baseUrl}/portal/pre/getPreMatchOdds?accessCode=${sessionStorage.getItem('accessCode')}`, {
      method: 'POST',
      body: {
        ...params,
      },
    }
  );
}


/* 2.3.获取日期列表 */
export async function getDates(params) {
  return request(`${baseUrl}/portal/pre/getDates`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 2.3.获取赛事列表 */
export async function getCompetitions(params) {
  return request(`${baseUrl}/portal/pre/getCompetitions?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 获取所有赛事列表 */
export async function getAllCompetitions(params) {
  return request(`${baseUrl}/portal/pre/getAllCompetitions`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 2.4.获取赛事国家列表 */
export async function getArea(params) {
  return request(`${baseUrl}/portal/pre/getArea`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 3.1.获取资金流水 */
export async function accountStatement(params) {
  return request(`${baseUrl}/client/account/flows?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
/* 3.2.获取公告栏 */
export async function getMessage(params) {
  return request(`${baseUrl}/portal/user/messages?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
/* 3.3.获取历史记录 */
export async function queryHistory(params) {
  return request(`${baseUrl}/client/bet/queryHistory?accessCode=${sessionStorage.getItem('accessCode')}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

/* 5.获取比赛信息 */
export async function matchQuery(params) {
  return request(`${baseUrl}/portal/match/query`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
