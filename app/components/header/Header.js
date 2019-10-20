import React, { Component } from 'react';
import styles from './Header.css';
import Search from "../search/Search"

export default class Header extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Search keyUp={(value) => this.props.searchValueChange(value)}/>
      </div>
    );
  }
}
