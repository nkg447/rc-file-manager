import React, { Component } from 'react';
import styles from './FileItem.css';
import { connect } from 'react-redux';
import { FOLDER_ICON, FILE_ICON } from '../../assets';

export default props => {
  const { file, ...otherProps } = props;
  const isDirectory = file.isDirectory();
  const icon = isDirectory ? FOLDER_ICON : FILE_ICON;
  return (
    <div className={styles.container} {...otherProps}>
      <img src={icon} className={styles.icon}></img>
      <p className={styles.name}>
        {file.name.substring(0, 18) + ((file.name.length > 18) ? '...' : '')}
      </p>
    </div>
  );
};
