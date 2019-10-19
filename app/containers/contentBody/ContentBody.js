import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ContentBody.css';
import fs from 'fs';
import path from 'path';
import { changeAddress } from '../../actions/fileManager';
import FileItem from '../../components/fileItem/FileItem';

class ContentBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address
    };
  }

  readDir = () => {
    const address = this.props.address;
    const files = fs
      .readdirSync(address, { withFileTypes: true })
      .sort((f1, f2) => {
        if (f1.isDirectory() == f2.isDirectory()) {
          return f1.name.localeCompare(f2.name);
        }
        return f1.isDirectory() ? -1 : 1;
      });
    return files;
  };

  onDoubleClickHandler = file => {
    const folderPath = path.join(this.props.address, file.name);
    this.props.changeAddress(folderPath);
  };

  render() {
    const files = this.readDir();
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

const mapStateToProps = state => {
  return {
    address: state.fileManager.address
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAddress: address => dispatch(changeAddress(address))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentBody);
