import React, { useState, useEffect, useRef } from 'react';
import styles from './index.scss';

export default () => {
  const [show, setShow] = useState(true);

  const toTopRef = useRef();

  useEffect(() => {
    if (toTopRef.current.offsetTop > 667) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, []);

  const gotoTop = () => {
    const container = document.getElementById('betContainer');
    container.scrollIntoView();
  };

  return (
    show &&
    <div id="to-top" ref={toTopRef} className={styles['to-top']} onClick={gotoTop}>
      回到顶部
    </div>
  );
}

