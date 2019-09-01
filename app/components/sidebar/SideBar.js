import React, { Component } from 'react';
import styles from './Sidebar.css';
import ListItem from "./ListItem.js"
export default class SideBar extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Sidebar</h1>
        </div>
        <div>
          <ul className={styles.optionsList}>
            <ListItem text="Laddu" address="/" />
            <ListItem text="Laddu" address="/" />
            <ListItem text="Laddu" address="/" />
            <ListItem text="Laddu" address="/" />
            <ListItem text="Laddu" address="/" />
            <ListItem text="Laddu" address="/" />
            <ListItem text="Laddu" address="/" />
          </ul>
        </div>
      </div>
    );
  }
}


