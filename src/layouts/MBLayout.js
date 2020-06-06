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

@connect(({ userInfo, shopCart, chsDB }) => ({
  userInfo,
  shopCart,
  chsDB,
}))
class BasicLayout extends PureComponent {
  timer = null;

  componentDidMount() {
    const { location } = this.props;
    const { query } = location;
    const { accessCode } = query;
    const code = sessionStorage.getItem('accessCode');
    if (accessCode) {
      sessionStorage.setItem('accessCode', accessCode);
      this.getUserInfo();
      return
    }
    if (code && code !== 'faeb2ead70b74948ae3b7c4cd73243f1') {
      this.getUserInfo();
    } else {
      sessionStorage.setItem('accessCode', 'faeb2ead70b74948ae3b7c4cd73243f1');
      this.getUserInfo();
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  /* 请求用户余额接口 */
  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  };

  render() {
    const {
      children, loading,
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
