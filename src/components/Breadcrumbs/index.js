import React, { Component, Fragment } from 'react';
import styles from './index.scss';
import { Icon } from 'antd-mobile';

export default class Accordion extends Component {

  render() {
    const { children, separator } = this.props;

    return (
      <ul className={styles.breadcrumbs}>
        {
          React.Children.map(children, (child) => {
            return (
              <Fragment>
                <li className={styles.item}>
                  {child}
                </li>
                <li className={styles.line} >{separator}</li>
              </Fragment>
            )
           }
          )
        }
      </ul>
    );
  }
}


