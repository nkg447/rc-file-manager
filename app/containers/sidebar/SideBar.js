import React, { Component } from 'react';
import styles from './Sidebar.css';
import ListItem from '../../components/sidebar/ListItem';
import { connect } from 'react-redux';
import { changeAddress } from '../../actions/fileManager';

const path = require('path');
class SideBar extends Component {
  constructor(props) {
    super(props);
    this.sideList = {
      Home: '',
      Desktop: 'Desktop',
      Documents: 'Documents',
      Downloads: 'Downloads',
      Music: 'Music',
      Pictures: 'Pictures',
      Videos: 'Videos'
    };
  }

  render = () => {
    let newPath;
    let { sideList} = this;
    let {home, address} = this.props.dirs;
    let {changeAddress} = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Sidebar</h1>
        </div>
        <div>
          <ul className={styles.optionsList}>
            {Object.keys(sideList).map(addr => {
              newPath = path.join(home, sideList[addr]);
              return (
                <ListItem
                  text={addr}
                  address={newPath}
                  className={address === newPath?styles.activeListItem:null}
                  onClick={redirPath => changeAddress(redirPath)}
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
