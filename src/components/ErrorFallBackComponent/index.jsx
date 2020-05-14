import React, { PureComponent } from 'react';

class Page extends PureComponent {
  render() {
    const { error, errorInfo } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <span>页面崩了</span>
        <span>{error}</span>
        <span>{errorInfo}</span>
      </div>
    )
  }
}

export default Page
