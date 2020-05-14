import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import styles from './index.scss';

export default class Accordion extends Component {
  state = {
    isShow: true,
  };

  componentDidMount() {
    const { defaultShow } = this.props;
    if (defaultShow) {
      this.setState({
        isShow: defaultShow
      })
    }
  }

  toggle = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  };

  render() {
    const { isShow } = this.state;
    const { title, titleStyle, isArrow } = this.props;

    return (
      <div>
        <div className={styles.title} style={titleStyle} onClick={this.toggle}>
            {
              isArrow ? (
                isShow ?
                  <div className={styles.arrow} >
                    <Icon type="up"/>
                  </div> :
                  <div className={styles.arrow} >
                    <Icon type="down"/>
                  </div>
              ) : ''
            }
            <div className={styles.name}>
              {title}
            </div>
        </div>
        <div className={styles.content}>
          {isShow ? this.props.children : ''}
        </div>
      </div>
    );
  }
}
