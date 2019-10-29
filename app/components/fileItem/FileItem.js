import React, { Component } from 'react';
import styles from './FileItem.css';
import { connect } from 'react-redux';
import Colors from '../../theme/Color';
const mime = require('mime-types');
const path = require('path');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faFile,
  faFileAlt,
  faFilePdf,
  faFileCode,
  faFileArchive,
  faFileAudio,
  faFileCsv,
  faFileVideo
} from '@fortawesome/free-solid-svg-icons';

const programmingLanguages = [
  'java',
  'html',
  'json',
  'css',
  'javascript',
  'jsx'
];
const addressToIcon = (address: String) => {
  const mimeType = String(mime.lookup(address));
  if (programmingLanguages.filter(e => mimeType.indexOf(e) != -1).length != 0)
    return faFileCode;
  if (mimeType.startsWith('text')) return faFileAlt;
  if (mimeType.startsWith('audio')) return faFileAudio;
  if (mimeType.startsWith('video')) return faFileVideo;
  if (mimeType.indexOf('pdf') != -1) return faFilePdf;
  if (mimeType.indexOf('csv') != -1) return faFileCsv;
  if (mimeType.indexOf('zip') != -1 || mimeType.indexOf('compressed') != -1)
    return faFileArchive;
  return faFile;
};

const isImage = address => {
  const mimeType = mime.lookup(address);
  return mimeType && mimeType.startsWith('image');
};

export default props => {
  const { file, address, fileIconSize, selected, ...otherProps } = props;
  const isDirectory = file.isDirectory();
  const iconStyle = {
    fontSize: fileIconSize,
    height: fileIconSize
  };
  const containerStyle = {
    height: fileIconSize + 35,
    width: fileIconSize + 30
  };
  const icon = isDirectory ? (
    <FontAwesomeIcon
      icon={faFolder}
      style={iconStyle}
      color={selected ? Colors.selectedFileIcon : Colors.fileIcon}
    />
  ) : isImage(file.name) ? (
    <img src={path.join(address, file.name)} style={iconStyle} />
  ) : (
    <FontAwesomeIcon
      icon={addressToIcon(file.name)}
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
