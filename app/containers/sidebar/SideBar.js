import React, { Component } from 'react';
import styles from './Sidebar.css';
import ListItem from '../../components/sidebar/ListItem';
import { connect } from 'react-redux';
import { changeAddress } from '../../actions/fileManager';
import fs from 'fs';
import searchFiles from '../../utils/searchFilesWithName';
const USERNAME = require('os').userInfo().username;

const path = require('path');
class SideBar extends Component {
  constructor(props) {
    super(props);
    const { home } = props.dirs;
    this.sideList = {
      Home: { path: home },
      Desktop: { path: path.join(home, 'Desktop') },
      Documents: { path: path.join(home, 'Documents') },
      Downloads: { path: path.join(home, 'Downloads') },
      Music: { path: path.join(home, 'Music') },
      Pictures: { path: path.join(home, 'Pictures') },
      Videos: { path: path.join(home, 'Videos') },
      ...this.getMountedDevices()
    };
  }

  getMountedDevices = () => {
    // mounted devices
    const mountedDevices = {};
    fs.readdirSync(`/media/${USERNAME}/`, {
      withFileTypes: true
    }).forEach(file => {
      mountedDevices[file.name] = {
        path: path.join(`/media/${USERNAME}/`, file.name),
        external: true
      };
    });
    return mountedDevices;
  };

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
