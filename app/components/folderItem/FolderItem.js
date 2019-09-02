import React, { Component } from 'react';
import styles from './FolderItem.css';

export default class FolderItem extends Component {
  render() {
    return (
      <div className={styles.container}>
        <p className={styles.title}>{this.props.children.name}</p>
      </div>
    );
  }
}
