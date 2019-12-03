import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentBody from '../contentBody/ContentBody';
import styles from './Content.css';
import globalStyles from '../../app.global.css';
import searchFilesWithName from '../../utils/searchFilesWithName';
import {
  changeAddress,
  navigateAddress,
  filesToCopy,
  filesToCut
} from '../../actions/fileManager';
import styled from 'styled-components';
import { Color } from '../../theme';

const fs = require('fs');
const _ = require('lodash');

const MAX_FILE_ICON_SIZE = 100;
const MIN_FILE_ICON_SIZE = 30;
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileIconSize: 50,
      files: [],
      address: props.fileManagerState.address,
      updateFiles: false
    };
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
    }
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
  };

  // TODO: Create action in store and call the search function here with debounce
  searchValueChange = searchFor => {
    if (searchFor.trim() !== '') {
      // _.debounce(input => {
      //   this.props.fetchClient Suggestions(input);
      // }, 500);
      const searchResult = searchFilesWithName(searchFor);
    }
  };

  fileIconSizeHandler = size => {
    this.setState({ fileIconSize: size });
  };

  refresh = () => {
    this.setState({ updateFiles: true });
  };

  render() {
    const { address } = this.props.fileManagerState;
    let { files } = this.state;
    if (this.state.updateFiles || this.state.address !== address) {
      files = this.readDir();
      this.setState({ updateFiles: false, files, address });
    }
    return (
      <Container>
        <Header
          address={address}
          searchValueChange={this.searchValueChange}
          changeAddress={this.props.changeAddress}
        ></Header>
        <ContentBody
          {...this.props.fileManagerState}
          files={files}
          changeAddress={this.props.changeAddress}
          navigateAddress={this.props.navigateAddress}
          setFilesToCopy={this.props.setFilesToCopy}
          setFilesToCut={this.props.setFilesToCut}
          fileIconSize={this.state.fileIconSize}
          refresh={this.refresh}
        />
        <Footer
          fileIconSizeHandler={this.fileIconSizeHandler}
          fileIconSize={this.state.fileIconSize}
          files={files}
        ></Footer>
      </Container>
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
    navigateAddress: toAddress => dispatch(navigateAddress(toAddress)),
    setFilesToCopy: files => dispatch(filesToCopy(files)),
    setFilesToCut: files => dispatch(filesToCut(files))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Color.contentBackground};
`;
