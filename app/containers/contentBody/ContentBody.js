import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ContentBody.css';
import fs from 'fs';
import FileItem from '../../components/fileItem/FileItem';
import FolderItem from '../../components/folderItem/FolderItem';

class ContentBody extends Component {
  readDir = () => {
    console.log(this.props);
    const address = this.props.address;
    const files = fs.readdirSync(address, { withFileTypes: true });
    return {
      folders: files.filter(file => file.isDirectory()),
      files: files.filter(file => file.isFile())
    };
  };

  render() {
    const { files, folders } = this.readDir();
    return (
      <div className={styles.container}>
        {folders.map(folder => (
          <FolderItem
            name={folder.name}
            parent={this.props.address}
          ></FolderItem>
        ))}
        {files.map(file => (
          <FileItem name={file.name} parent={this.props.address}></FileItem>
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
