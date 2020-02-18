import React, { PureComponent } from 'react';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';

class ScrollWrap extends PureComponent {
  height = 0;

  componentDidMount() {
    const { wrapId, getRef, isX, isY, fn, isShowBar,pullUpFn} = this.props;
    /*将this暴露给父组件*/
    this.props.onScrollWrapRef !== undefined && this.props.onScrollWrapRef(this);
    if (getRef) {
      getRef(this.myRef);
    }
    if(isShowBar){
      this.scroll = new BScroll(document.getElementById(wrapId), {
        click: true,
        scrollY: isY,
        scrollX: isX,
        mouseWheel: true,
        probeType:3,
        pullUpLoad: {
          threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
        },
        scrollbar: {
          fade: isShowBar,
          interactive: false
        }
      });
    }else{
      this.scroll = new BScroll(document.getElementById(wrapId), {
        click: true,
        scrollY: isY,
        scrollX: isX,
        mouseWheel: true,
        probeType:3,
      });
    }
   if(typeof fn === 'function') {
     this.scroll.on('scroll', fn);
   }
    if(typeof pullUpFn === 'function') {
      this.scroll.on('pullingUp', pullUpFn);
      this.finishPullUp()
    }
    document.addEventListener('resize',
      this.scrollRefresh()
    )
  }

  componentDidUpdate() {
    if(this.height !== this.myRef.clientHeight){
      this.height = this.myRef.clientHeight;
      this.scrollRefresh()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.scrollRefresh)
  }

  finishPullUp = () => {
    this.scroll.finishPullUp();
  };

  scrollRefresh =() => {
    this.scroll.refresh();
  };

  scrollToTop =() => {
    this.scroll.scrollTo(0,0);
    this.scroll.refresh()
  };

  render() {
    const { children, wrapId, wrapClass, height, marginTop,width, wrapWidth} = this.props;
    return (
      <div
        style={{ overflow: 'hidden',position: 'relative', height, marginTop,width,WebkitOverflowScrolling: 'touch' }}
        id={wrapId}
        className={wrapClass}
      >
        <div className="wrap" ref={ref => {
          this.myRef = ref;
        }} style={{width: wrapWidth}}>
          {children}
        </div>
      </div>
    );
  }
}

ScrollWrap.defaultProps = {
  children: null,
  wrapId: '',
  wrapClass: '',
  isX: false,
  isY: true,
  isShowBar: true
};

ScrollWrap.propTypes = {
  children: PropTypes.node,
  wrapId: PropTypes.string,
  wrapClass: PropTypes.string,
};

export default ScrollWrap;
