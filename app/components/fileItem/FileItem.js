import React, { Component } from 'react';
import styles from './FileItem.css';
import { FILE_ICON } from '../../assets';

export default class FileItem extends Component {
  render() {
    const { name, selected, ...otherProps } = this.props;
    return (
      <div className={styles.container} {...otherProps}>
        <img src={FILE_ICON} className={styles.icon}></img>
        <p className={styles.name}>{name.substring(0, 8) + '...'}</p>
      </div>
    );
  }
}
