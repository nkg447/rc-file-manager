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
  const { file, address, fileIconSize, selected, ...otherProps } = props;
  const isDirectory = file.isDirectory();
  const iconStyle = {
    height: fileIconSize
  };
  const containerStyle = {
    height: fileIconSize+30,
    width: fileIconSize+30
  };
  const icon = isDirectory ? (
    <FOLDER_ICON
      style={iconStyle}
      color={selected ? Colors.selectedFileIcon : Colors.fileIcon}
    />
  ) : isImage(file.name) ? (
    <img src={path.join(address, file.name)} style={iconStyle} />
  ) : (
    <FILE_ICON
      style={iconStyle}
      color={selected ? Colors.selectedFileIcon : Colors.fileIcon}
    />
  );
  return (
    <div
      className={selected ? styles.selectedContainer : styles.container}
      style={containerStyle}
      {...otherProps}
    >
      {icon}
      <p className={styles.name}>
        {file.name.substring(0, 18) + (file.name.length > 18 ? '...' : '')}
      </p>
    </div>
  );
};
