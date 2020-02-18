import React, { PureComponent, } from 'react';
import styles from './index.scss';

class DetailDishItem extends PureComponent {
  state = {
    up: 0,
    prevDish: 0,
  };

  static getDerivedStateFromProps (props, state) {
    if(state.prevDish === 0 ){
      return {
        up: 0,
        prevDish: props.dish
      }
    }
    if (props.dish > state.prevDish) {
      return {
        up: 1,
        prevDish: props.dish
      }
    }
    if (props.dish < state.prevDish) {
      return {
        up: -1,
        prevDish: props.dish
      }
    }
    return null
  }

  renderUp(){
    const { up } = this.state;
    if(up === 0){
      return ''
    }
    if( up === 1){
      return <div className={styles.up}/>
    }
    if( up === -1){
      return <div className={styles.down}/>
    }
  }

  render() {
    const {
      dish
    } = this.props;
    return (
      <div className={styles.odds}>
         @{dish}
        {this.renderUp()}
     </div>
    );
  }
}

export default DetailDishItem;
