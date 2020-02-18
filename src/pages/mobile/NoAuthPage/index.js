import React, { PureComponent } from 'react';
class NoAuth extends PureComponent {

  render() {
    return (
      <div style={{
        width:'100%',
        height:'100%',
        display:'flex',
        color: '#fff',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div className='no-auth-page'>

        </div>
        您的认证已过期，请从平台重新登录
      </div>
    );
  }
}

export default NoAuth;


