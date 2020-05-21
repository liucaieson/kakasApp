import React, { Fragment } from 'react';
import styles from './index.scss';

export default ({ separator, children }) => (
  <ul className={styles.breadcrumbs}>
    {
      React.Children.map(children, (child) => {
        return (
          <Fragment>
            <li className={styles.item}>
              {child}</li>
            <li className={styles.line}>{separator}</li>
          </Fragment>
        );
        },
      )
    }
  </ul>
)
