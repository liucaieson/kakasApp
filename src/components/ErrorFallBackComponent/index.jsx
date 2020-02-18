import React, { PureComponent } from 'react';

class Page extends PureComponent {

  render() {
    const  { error, errorInfo } = this.props;
    return (
      <div style={{textAlign: 'center'}}>
        <span>请告诉我们的程序员，你丫的程序出bug啦！！！！</span>
        <span>{error}</span>
        <span>{errorInfo}</span>
      </div>
    )
  }
}

export default Page
