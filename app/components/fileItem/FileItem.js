import React, { Component } from 'react';
import styles from './FileItem.css';
import { connect } from 'react-redux';
import { FOLDER_ICON, FILE_ICON } from '../../assets';
import Colors from '../../theme/Color';

export default props => {
  const { file, selected, ...otherProps } = props;
  const isDirectory = file.isDirectory();
  const icon = isDirectory ? (
    <FOLDER_ICON
      className={styles.icon}
      color={selected ? Colors.selectedFileIcon : Colors.fileIcon}
    />
  ) : (
    <FILE_ICON
      className={styles.icon}
      color={selected ? Colors.selectedFileIcon : Colors.fileIcon}
    />
  );
  return (
    <div
      className={selected ? styles.selectedContainer : styles.container}
      {...otherProps}
    >
      {icon}
      <p className={styles.name}>
        {file.name.substring(0, 18) + (file.name.length > 18 ? '...' : '')}
      </p>
    </div>
  );
};
