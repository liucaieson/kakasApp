import React, { PureComponent, Fragment } from 'react';
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import '@/layouts/nprogress.less';
import { LocaleProvider } from 'antd-mobile';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import styles from './index.scss';
import Slide from '../components/slideAnimate';
import ShopCart from './ShopCart/index';
import WithErrorHandler from '../components/ErrorHandler';

NProgress.configure({ showSpinner: false });

// 底部有bar菜单
let currHref = '';

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
};

@connect(({ loading, userInfo, shopCart, chsDB }) => ({
  userInfo,
  shopCart,
  chsDB,
}))
class BasicLayout extends PureComponent {

  state = {
    isLogin: false,
    showCart: false,
  };

  timer = null;

  componentDidMount() {
    const { dispatch, location } = this.props;
    const { query } = location;
    const { accessCode } = query;
    const code = sessionStorage.getItem('accessCode');
    if (code && code !== 'faeb2ead70b74948ae3b7c4cd73243f1') {
      /* Modal.alert(
          '亚冠体育',
          '欢迎来到亚冠体育'
       );*/
      this.timer = setInterval(this.getUserInfo, 30000);
    } else if (accessCode !== undefined) {
      sessionStorage.setItem('accessCode', accessCode);
      /* Modal.alert(
         '亚冠体育',
         '欢迎来到亚冠体育'
       );*/
      this.timer = setInterval(this.getUserInfo, 30000);
    } else {
      sessionStorage.setItem('accessCode', 'faeb2ead70b74948ae3b7c4cd73243f1');
      /* Modal.alert(
         '亚冠体育',
        '欢迎来到亚冠体育,当前为试玩账号'
       );*/
      this.getUserInfo();
    }

  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  /*请求用户余额接口*/
  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  };

  render() {
    const {
      children, location, loading,
      shopCart: { showCart },
    } = this.props;
    const { href } = window.location; // 浏览器地址栏中地址
    if (currHref !== href) {
      // currHref 和 href 不一致时说明进行了页面跳转
      NProgress.start(); // 页面开始加载时调用 start 方法
      if (!loading.global) {
        // loading.global 为 false 时表示加载完毕
        NProgress.done(); // 页面请求完毕时调用 done 方法
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }

    return (
      <LocaleProvider locale={zh_CN}>
         <div className={styles.index}>
           <div className={styles.main}>
             {children}
           </div>
           {
             showCart ? (<div className={styles['mask-layer']}/>) : ''
           }
           <Slide come={showCart}
                  clsName="downSlides"
           >
             <div className={styles['bet-order']}>
               { showCart && <ShopCart />}
             </div>
           </Slide>
         </div>
      </LocaleProvider>
    );
  }
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(WithErrorHandler(BasicLayout)));
