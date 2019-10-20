import React, { Component } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentBody from '../contentBody/ContentBody';
import styles from './Content.css';
import globalStyles from '../../app.global.css';
import { connect } from 'react-redux';
import searchFilesWithName from '../../utils/searchFilesWithName';
import { changeAddress } from '../../actions/fileManager';

const fs = require('fs');
const _ = require('lodash');
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    }
  };

  // TODO: Create action in store and call the search function here with debounce
  searchValueChange = searchFor => {
    if (searchFor.trim() !== '') {
      // _.debounce(input => {
      //   this.props.fetchClient Suggestions(input);
      // }, 500);
      let searchResult = searchFilesWithName(searchFor);
    }
  };

  render() {
    let files = this.readDir();
    let { address } = this.props.fileManagerState;
    return (
      <div className={`${styles.container}`}>
        <Header searchValueChange={this.searchValueChange}></Header>
        <ContentBody
          files={files}
          address={address}
          changeAddress={this.props.changeAddress}
        />
        <Footer></Footer>
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
    changeAddress: address => dispatch(changeAddress(address))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
