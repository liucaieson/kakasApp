import React, { PureComponent } from 'react';

import styles from './index.scss';

export default class GotoTopFooter extends PureComponent {
  state = {
    show: true,
  };

  constructor(props) {
    super(props);
    this.tRef = React.createRef();
  }

  componentDidMount() {
    if (this.tRef.current.offsetTop > 730) {
      this.setState({
        show: true,
      });
    }else{
      this.setState({
        show: false,
      });
    }
  }


  gotoTop = () => {
    const container = document.getElementById('betContainer');
    container.scrollIntoView();
  };

  render() {
    const { show } = this.state;
    return (

      show &&
      <div id='to-top' ref={this.tRef} className={styles['to-top']} onClick={this.gotoTop}>
        回到顶部
      </div>

    );
  }
}

