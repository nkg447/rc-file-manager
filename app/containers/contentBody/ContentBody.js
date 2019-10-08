import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ContentBody.css';
import fs from 'fs';
import FileItem from '../../components/fileItem/FileItem';
import FolderItem from '../../components/folderItem/FolderItem';

class ContentBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      selectedFolder: null
    };
  }

  readDir = () => {
    const address = this.props.address;
    const files = fs.readdirSync(address, { withFileTypes: true });
    return {
      folders: files.filter(file => file.isDirectory()),
      files: files.filter(file => file.isFile())
    };
  };

  onFileSelect(type, index) {
    if (type === 'file')
      this.setState({
        selectedFile: index,
        selectedFolder: null
      });
    else
      this.setState({
        selectedFile: null,
        selectedFolder: index
      });
  }

  render() {
    const { files, folders } = this.readDir();
    return (
      <div className={styles.container}>
        {folders.map((folder, i) => (
          <FolderItem
            key={i}
            name={folder.name}
            parent={this.props.address}
            selected={this.state.selectedFolder === i}
            onClick={() => this.onFileSelect('folder', i)}
          ></FolderItem>
        ))}
        {files.map((file, i) => (
          <FileItem
            key={i}
            name={file.name}
            parent={this.props.address}
            selected={this.state.selectedFile === i}
            onClick={() => this.onFileSelect('file', i)}
          ></FileItem>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.fileManager.address
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentBody);
