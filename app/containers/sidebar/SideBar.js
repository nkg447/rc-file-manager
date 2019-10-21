import React, { Component } from 'react';
import styles from './Sidebar.css';
import ListItem from '../../components/sidebar/ListItem';
import { connect } from 'react-redux';
import { changeAddress } from '../../actions/fileManager';
import fs from 'fs';
import searchFiles from '../../utils/searchFilesWithName';
import FileSystemService from '../../utils/FileSystemService'
const path = require('path');

class SideBar extends Component {
  constructor(props) {
    super(props);
    const { home } = props.dirs;
    this.sideList = {
      ...FileSystemService.getHomeDirectories(),
      ...FileSystemService.getMountedDevices()
    };
  }

  render = () => {
    let { sideList } = this;
    let { home, address } = this.props.dirs;
    let { changeAddress } = this.props;
    // searchFiles("surv",address);

    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Sidebar</h1>
        </div>
        <div>
          <ul className={styles.optionsList}>
            {Object.keys(sideList).map((addr, i) => {
              const newPath = sideList[addr].path;
              return (
                <ListItem
                  key={i}
                  text={addr}
                  item={sideList[addr]}
                  active={address === newPath}
                  onClick={() => changeAddress(newPath)}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  dirs: state.fileManager
});

const mapDispatchToProps = dispatch => {
  return {
    changeAddress: address => dispatch(changeAddress(address))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
