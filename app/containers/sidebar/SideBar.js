import React, { Component } from 'react';
import { connect } from 'react-redux';
import fs from 'fs';
import styles from './Sidebar.css';
import ListItem from '../../components/sidebar/ListItem';
import SidebarTop from '../../components/sidebar/SidebarTop';
import { changeAddress, navigateAddress } from '../../actions/fileManager';
import searchFiles from '../../utils/searchFilesWithName';
import FileSystemService from '../../utils/FileSystemService';

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
    const { sideList } = this;
    const { home, address } = this.props.dirs;
    const { changeAddress, navigateAddress } = this.props;
    // searchFiles("surv",address);

    return (
      <div className={styles.container}>
        <SidebarTop {...this.props.dirs} {...this.props}></SidebarTop>
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
    changeAddress: address => dispatch(changeAddress(address)),
    navigateAddress: toAddress => dispatch(navigateAddress(toAddress))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
