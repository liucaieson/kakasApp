import React from 'react';
import { Icon } from 'antd';
import styles from './index.scss'

export default ({bg, loadingIconSize, loadingFontSize, color, text} ) => (
      <div
        style={{
          position:'fixed',
          top:0,
          right:0,
          width: '100%',
          height: '100%',
          backgroundColor: bg || '#000',
          zIndex:998
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '36%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              color:color,
            }}
          >
            <div className={styles['loadingio-spinner-dual-ball-lixo9zz3vac']}>
              <div className={styles['ldio-p0a4d5z2saq']}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

