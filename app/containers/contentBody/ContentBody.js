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
    FileSystemService.deleteFile(
      filePath,
      FileSystemService.TRASH_DIR === this.props.address // if true then permanentDelete, else moveToTrash
    );
    this.setState(prevState => ({
      files: prevState.files.filter(f => f.name !== file.name),
      showContextMenu: false
    }));
  };

  updateState = () => {
    if (
      this.state.address !== this.props.address ||
      this.state.fileIconSize !== this.props.fileIconSize
    ) {
      this.setState({ ...this.props, selected: {}, showContextMenu: false });
    }
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

  changeSelectedFileIndexBy = n => {
    this.setState(prevState => {
      let selectedFileIndex = -1;
      Object.keys(prevState.selected)
        .filter(key => prevState.selected[key])
        .forEach(key => (selectedFileIndex = +key));
      selectedFileIndex = (selectedFileIndex + n) % prevState.files.length;
      if (selectedFileIndex < 0) selectedFileIndex += prevState.files.length;
      return { selected: { [selectedFileIndex]: true } };
    });
  };

  moveSelectedFilesToTrash = () => {
    Object.keys(this.state.selected)
      .filter(key => this.state.selected[key])
      .forEach(key => {
        this.onDeleteHandler(this.state.files[key]);
      });
  };

  keyPressHandler = e => {
    switch (e.key) {
      case 'ArrowRight':
        this.changeSelectedFileIndexBy(1);
        break;

      case 'ArrowLeft':
        this.changeSelectedFileIndexBy(-1);
        break;

      case 'ArrowUp':
      case 'ArrowDown':
        const container = document.getElementById('mainContent');
        if (container.children.length > 1) {
          const c1Bounds = container.children[0].getBoundingClientRect();
          const c2Bounds = container.children[1].getBoundingClientRect();
          if (c1Bounds.top === c2Bounds.top) {
            const width = c2Bounds.left - c1Bounds.left;
            const noOfItemsInARow = Math.floor(container.offsetWidth / width);
            if (e.key === 'ArrowUp')
              this.changeSelectedFileIndexBy(-noOfItemsInARow);
            else this.changeSelectedFileIndexBy(noOfItemsInARow);
          } else {
            if (e.key === 'ArrowUp') this.changeSelectedFileIndexBy(-1);
            else this.changeSelectedFileIndexBy(1);
          }
        }
        break;

      case 'Delete':
        this.moveSelectedFilesToTrash();
        break;

      default:
        console.log(e.key, 'key pressed');
        break;
    }
  };

  render() {
    const { files, address, selected, fileIconSize } = this.state;
    this.updateState();
    return (
      <>
        <div
          onClick={() =>
            this.setState({ showContextMenu: false, selected: {} })
          }
          className={styles.container}
          onKeyDown={this.keyPressHandler}
          tabIndex="1"
          id="mainContent"
        >
          {files.map((file, i) => (
            <FileItem
              key={i}
              file={file}
              address={address}
              onDoubleClick={this.onDoubleClickHandler.bind(this, file)}
              onClick={e => {
                e.stopPropagation(); // to not execute the onClick of outer div
                this.selectFile(i);
              }}
              selected={selected[i] ? true : false}
              onContextMenu={e => this.onContext(e, file)}
              fileIconSize={fileIconSize}
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
