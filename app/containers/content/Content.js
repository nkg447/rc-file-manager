import React, { Component } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentBody from '../contentBody/ContentBody';
import styles from './Content.css';
import globalStyles from '../../app.global.css';
import { connect } from 'react-redux';
import searchFilesWithName from '../../utils/searchFilesWithName';
import { changeAddress, navigateAddress } from '../../actions/fileManager';

const fs = require('fs');
const { ipcRenderer } = require('electron');
const _ = require('lodash');
const MAX_FILE_ICON_SIZE = 100;
const MIN_FILE_ICON_SIZE = 30;
class Content extends Component {
  count = 0;
  constructor(props) {
    super(props);
    this.state = {
      fileIconSize: 50,
      searching: false,
      files: []
    };
    ipcRenderer.on('search-reply', (event, arg) => {
      console.log(arg);
      
      if (arg === 'null') {
        this.setState({ files: [] });
      } else {
        this.setState(prevState => {
          prevState.files.push(arg);
          return {
            files: prevState.files
          };
        });
      }
    });
  }
  /**
   * Reads files and folders list on search result or
   * current directory and sends to content body
   */
  readDir = () => {
    const {
      searchComponent,
      searchResultsList,
      address
    } = this.props.fileManagerState;

    // Search is active
    // TODO: Implement search functionality and change the format of this result
    if (searchComponent) {
      return {
        folders: searchResultsList.folders,
        files: searchResultsList.files
      };
    } else {
      // Current directory files & folders
      try {
        const files = fs
          .readdirSync(address, { withFileTypes: true })
          .filter(file => !file.name.startsWith('.'))
          .sort((f1, f2) => {
            if (f1.isDirectory() == f2.isDirectory()) {
              return f1.name.localeCompare(f2.name);
            }
            return f1.isDirectory() ? -1 : 1;
          });
        return files;
      } catch (err) {
        return [];
      }
    }
  };

  // TODO: Create action in store and call the search function here with debounce
  searchValueChange = searchFor => {
    searchFor = searchFor.trim();
    if (!this.state.searching && searchFor.length !== 0)
      this.setState({ searching: true });
    else if (this.state.searching && searchFor.length === 0)
      this.setState({ searching: false });
    ipcRenderer.send('search-file', {
      searchFor,
      searchAt: this.props.fileManagerState.address
    });
  };

  fileIconSizeHandler = size => {
    this.setState({ fileIconSize: size });
  };

  render() {
    let files = this.state.searching ? this.state.files : this.readDir();
    let { address } = this.props.fileManagerState;
    return (
      <div className={`${styles.container}`}>
        <Header
          address={address}
          searchValueChange={this.searchValueChange}
          changeAddress={this.props.changeAddress}
        ></Header>
        <ContentBody
          files={files}
          address={address}
          changeAddress={this.props.changeAddress}
          navigateAddress={this.props.navigateAddress}
          fileIconSize={this.state.fileIconSize}
        />
        <Footer
          fileIconSizeHandler={this.fileIconSizeHandler}
          fileIconSize={this.state.fileIconSize}
          files={files}
        ></Footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fileManagerState: state.fileManager
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAddress: address => dispatch(changeAddress(address)),
    navigateAddress: toAddress => dispatch(navigateAddress(toAddress))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
