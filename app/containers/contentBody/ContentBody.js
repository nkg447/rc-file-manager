import React, { Component } from 'react';
import styles from './ContentBody.css';
import FileItem from '../../components/fileItem/FileItem';
import { shell } from 'electron';
import ContextMenu from '../../components/contextMenu/contextMenu';
import FileSystemService from '../../utils/FileSystemService';
import { SelectableGroup } from 'react-selectable-fast';
import SelectingRect from '../../components/selectingRect/selectingRect';

const path = require('path');
export default class ContentBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      selectedFiles: [],
      showContextMenu: false,
      contextMenuBounds: {},
      selectingRectBounds: {}
    };
    this.isMouseDown = false;
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
      FileSystemService.isTrashDir(this.props.address) // if true then permanentDelete, else moveToTrash
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
      this.setState({
        ...this.props,
        selectedFiles: [],
        showContextMenu: false
      });
    }

    try {
      document.getElementById('mainContent').focus();
    } catch (err) {}
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

  openSelectedFile = () => {
    if (this.state.selectedFiles.length > 0)
      this.onDoubleClickHandler(this.state.selectedFiles[0]);
  };

  changeSelectedFileIndexBy = n => {
    this.setState(prevState => {
      let selectedFileIndex = -1;
      selectedFileIndex = prevState.files.indexOf(prevState.selectedFiles[0]);
      selectedFileIndex = (selectedFileIndex + n) % prevState.files.length;
      if (selectedFileIndex < 0) selectedFileIndex += prevState.files.length;
      return { selectedFiles: [prevState.files[selectedFileIndex]] };
    });
  };

  moveSelectedFilesToTrash = () => {
    this.state.selectedFiles.forEach(file => {
      this.onDeleteHandler(file);
    });
    this.setState({ selectedFiles: [] });
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

      case 'Enter':
        this.openSelectedFile();
        break;

      case 'Backspace':
        this.props.navigateAddress('prev');
        break;

      case 'Delete':
        this.moveSelectedFilesToTrash();
        break;

      default:
        console.log(e.key, 'key pressed');
        break;
    }
  };

  handleSelection = selectedFiles => {
    selectedFiles = selectedFiles.map(selectedFile => selectedFile.props.file);
    this.isMouseDown = false;
    this.setState({ selectedFiles, selectingRectBounds: {} });
  };

  mouseMoveHandler = (e: React.MouseEvent) => {
    e.persist();
    if (this.isMouseDown) {
      this.setState(prevState => {
        return {
          selectingRectBounds: {
            ...prevState.selectingRectBounds,
            x2: e.clientX,
            y2: e.clientY
          }
        };
      });
    }
  };

  render() {
    const { files, address, selectedFiles, fileIconSize } = this.state;
    this.updateState();
    return (
      <>
        <SelectingRect {...this.state.selectingRectBounds}></SelectingRect>
        <SelectableGroup onSelectionFinish={this.handleSelection} resetOnStart>
          <div
            className={styles.container}
            onKeyDown={this.keyPressHandler}
            tabIndex="-1"
            id="mainContent"
            onMouseDownCapture={e => {
              this.isMouseDown = true;
              this.setState({
                selectingRectBounds: {
                  x1: e.clientX,
                  y1: e.clientY
                }
              });
            }}
            onMouseMoveCapture={this.mouseMoveHandler}
          >
            {files.map((file, i) => (
              <FileItem
                key={i}
                file={file}
                address={address}
                onDoubleClick={this.onDoubleClickHandler.bind(this, file)}
                onContextMenu={e => this.onContext(e, file)}
                fileIconSize={fileIconSize}
                selected={selectedFiles.includes(file)}
              ></FileItem>
            ))}
          </div>
        </SelectableGroup>
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
            isTrashDir={FileSystemService.isTrashDir(address)}
          ></ContextMenu>
        ) : null}
      </>
    );
  }
}
