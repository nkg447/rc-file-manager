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
      folders: [],
      files: []
    };
  }

  componentDidMount() {
    const address = this.props.address;
    const files = fs.readdirSync(address, { withFileTypes: true });
    this.setState({
      folders: files.filter(file => file.isDirectory()),
      files: files.filter(file => file.isFile())
    });
  }

  render() {
    return (
      <div>
        {this.state.folders.map(folder => (
          <FolderItem>{folder}</FolderItem>
        ))}
        {this.state.files.map(file => (
          <FileItem>{file}</FileItem>
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
