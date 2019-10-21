import React, { Component } from 'react';
import styles from './ContentBody.css';
import FileItem from '../../components/fileItem/FileItem';
import { shell } from 'electron';

const path = require('path');
export default class ContentBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      selected: {}
    };
  }

  onDoubleClickHandler = file => {
    const filePath = path.join(this.props.address, file.name);
    if (file.isDirectory()) {
      this.props.changeAddress(filePath);
    } else {
      shell.openItem(filePath);
    }
  };

  updateState = () => {
    this.setState({ ...this.props, selected: {} });
  };

  selectFile = fileIndex => {
    this.setState(prevState => ({
      selected: {
        // uncomment the following to make it multi-select
        // ...prevState.selected,
        [fileIndex]: prevState.selected[fileIndex] ? false : true
      }
    }));
  };

  render() {
    const { files, address, selected } = this.state;
    if (address !== this.props.address) {
      this.updateState();
    }
    return (
      <div className={styles.container}>
        {files.map((file, i) => (
          <FileItem
            key={i}
            file={file}
            address={address}
            onDoubleClick={this.onDoubleClickHandler.bind(this, file)}
            onClick={this.selectFile.bind(this, i)}
            selected={selected[i] ? true : false}
          ></FileItem>
        ))}
      </div>
    );
  }
}
