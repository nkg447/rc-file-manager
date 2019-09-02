import React, { Component } from 'react';
import styles from './FileItem.css';

export default class FileItem extends Component {
  render() {
    return (
      <div className={styles.container}>
        <p className={styles.title}>{this.props.children.name}</p>
      </div>
    );
  }
}
