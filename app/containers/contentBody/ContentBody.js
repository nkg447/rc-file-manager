import React, { Component } from 'react';
import styles from './ContentBody.css';
import FileItem from '../../components/fileItem/FileItem';
import { shell } from 'electron';

const path = require('path');
export default class ContentBody extends Component {
  onDoubleClickHandler = file => {
    const filePath = path.join(this.props.address, file.name);
    if (file.isDirectory()) {
      this.props.changeAddress(filePath);
    } else {
      shell.openItem(filePath);
    }
  };

  render() {
    const { files, address } = this.props;
    return (
      <div className={styles.container}>
        {files.map((file, i) => (
          <FileItem
            key={i}
            file={file}
            onDoubleClick={this.onDoubleClickHandler.bind(this, file)}
          ></FileItem>
        ))}
      </div>
    );
  }
}
