import React, { Component } from 'react';
import styles from './ContentBody.css';
import FileItem from '../../components/fileItem/FileItem';
import { shell } from 'electron';
import ContextMenu from '../../components/contextMenu/contextMenu';
import FileSystemService from '../../utils/FileSystemService';

const path = require('path');
export default class ContentBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      selected: {},
      showContextMenu: false,
      contextMenuBounds: {}
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

  onDeleteHandler = file => {
    const filePath = path.join(this.props.address, file.name);
    FileSystemService.deleteFile(filePath);
    this.setState(prevState => ({
      files: prevState.files.filter(f => f.name !== file.name),
      showContextMenu: false
    }));
  };

  updateState = () => {
    this.setState({ ...this.props, selected: {}, showContextMenu: false });
  };

  selectFile = fileIndex => {
    this.setState(prevState => ({
      selected: {
        // uncomment the following to make it multi-select
        // ...prevState.selected,
        [fileIndex]: prevState.selected[fileIndex] ? false : true
      },
      showContextMenu: false
    }));
  };

  onContext = (e: React.MouseEvent, file) => {
    this.setState({
      showContextMenu: true,
      contextMenuBounds: {
        x: e.clientX,
        y: e.clientY,
        file: file
      }
    });
  };

  render() {
    const { files, address, selected } = this.state;
    if (address !== this.props.address) {
      this.updateState();
    }
    return (
      <>
        <div
          onClick={() => this.setState({ showContextMenu: false })}
          className={styles.container}
        >
          {files.map((file, i) => (
            <FileItem
              key={i}
              file={file}
              address={address}
              onDoubleClick={this.onDoubleClickHandler.bind(this, file)}
              onClick={this.selectFile.bind(this, i)}
              selected={selected[i] ? true : false}
              onContextMenu={e => this.onContext(e, file)}
            ></FileItem>
          ))}
        </div>
        {this.state.showContextMenu ? (
          <ContextMenu
            onOpen={this.onDoubleClickHandler.bind(
              this,
              this.state.contextMenuBounds.file
            )}
            onDelete={this.onDeleteHandler.bind(
              this,
              this.state.contextMenuBounds.file
            )}
            bounds={this.state.contextMenuBounds}
          ></ContextMenu>
        ) : null}
      </>
    );
  }
}
