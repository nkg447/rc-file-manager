import React, { Component } from 'react';
import styles from './Header.css';
import Search from '../search/Search';
import AddressBar from '../addressBar/AddressBar';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.container}>
        <AddressBar {...this.props}></AddressBar>
        <Search keyUp={value => this.props.searchValueChange(value)} />
      </div>
    );
  }
}
