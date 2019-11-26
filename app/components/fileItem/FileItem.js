import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSelectable } from 'react-selectable-fast';
import styled from 'styled-components';
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
import { Color } from '../../theme';
import styles from './FileItem.css';

const mime = require('mime-types');
const path = require('path');

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

export default createSelectable(props => {
  const {
    file,
    address,
    fileIconSize,
    isSelected,
    isSelecting,
    selectableRef,
    selected,
    isToCut,
    rename,
    renameFileHandler,
    ...otherProps
  } = props;

  try {
    document.getElementById('fileRename').focus();
  } catch (err) {}

  const [fileName, setFileName] = React.useState(file.name);

  const isDirectory = file.isDirectory();
  const iconStyle = {
    fontSize: fileIconSize,
    maxHeight: fileIconSize,
    maxWidth: fileIconSize
  };
  const containerStyle = {
    width: fileIconSize + 30
  };
  const icon = isImage(file.name) ? (
    <img src={path.join(address, file.name)} style={iconStyle} />
  ) : (
    <FontAwesomeIcon
      icon={isDirectory ? faFolder : addressToIcon(file.name)}
      style={iconStyle}
      color={
        selected || isSelecting
          ? Color.selectedFileIcon
          : isToCut
          ? Color.onCutFileIcon
          : Color.fileIcon
      }
    />
  );

  const ContainerComponent =
    selected || isSelecting ? SelectedContainer : Container;

  return (
    <ContainerComponent
      style={containerStyle}
      ref={selectableRef}
      {...otherProps}
    >
      {icon}
      {rename ? (
        <Rename
          id="fileRename"
          value={fileName}
          onChange={e => {
            setFileName(e.target.value);
            e.stopPropagation();
          }}
          onKeyUp={e => {
            e.key === 'Enter' ? renameFileHandler(fileName) : null;
            e.stopPropagation();
          }}
          type="text"
        />
      ) : (
        <NameP>
          {selected
            ? file.name
            : file.name.substring(0, 28) + (file.name.length > 28 ? '...' : '')}
        </NameP>
      )}
    </ContainerComponent>
  );
});

const Container = styled.div`
  margin: 0.5rem;
  padding: 5px;
`;
const SelectedContainer = styled(Container)`
  border-radius: 10px;
  background-color: ${Color.sidebarBackground};
  color: white;
`;

const NameP = styled.p`
  font-size: 12px;
  word-break: break-all;
  width: 100%;
  color: currentColor;
`;
const Rename = styled.input`
  font-size: 12px;
  width: 100%;
  color: black;
`;
