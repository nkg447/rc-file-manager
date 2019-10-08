import React, { Component } from 'react';
import styles from './FileItem.css';
import { FILE_ICON } from '../../assets';

export default class FileItem extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className={styles.container}>
        <img src={FILE_ICON} className={styles.icon}></img>
        <p>{name}</p>
      </div>
    );
  }
}
