import React, { Component } from 'react';
import styles from './FileItem.css';
import { connect } from 'react-redux';
import { FOLDER_ICON, FILE_ICON } from '../../assets';
import Colors from '../../theme/Color';
const mime = require('mime-types');
const path = require('path');

const isImage = address => {
  const mimeType = mime.lookup(address);
  return mimeType && mimeType.startsWith('image');
};

export default props => {
  const { file, address, selected, ...otherProps } = props;
  const isDirectory = file.isDirectory();
  const icon = isDirectory ? (
    <FOLDER_ICON
      className={styles.icon}
      color={selected ? Colors.selectedFileIcon : Colors.fileIcon}
    />
  ) : isImage(file.name) ? (
    <img src={path.join(address, file.name)} className={styles.icon} />
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
