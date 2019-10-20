import React, { Component } from 'react';
import styles from './ContentBody.css';
import FileItem from '../../components/fileItem/FileItem';

const path = require('path');
export default class ContentBody extends Component {
  onDoubleClickHandler = file => {
    const folderPath = path.join(this.props.address, file.name);
    this.props.changeAddress(folderPath);
  };

  render() {
    const { files} = this.props;
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
