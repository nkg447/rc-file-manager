import React, { Component } from 'react';
import styles from './FolderItem.css';
import { connect } from 'react-redux';
import { changeAddress } from '../../actions/fileManager';
import path from 'path';
import { FOLDER_ICON } from '../../assets';

class FolderItem extends Component {
  onClickHandler = () => {
    const folderPath = path.join(this.props.parent, this.props.name);
    this.props.changeAddress(folderPath);
  };
  render() {
    const { name } = this.props;
    return (
      <div className={styles.container}>
        <img src={FOLDER_ICON} className={styles.icon}></img>
        <p>{name}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    changeAddress: address => dispatch(changeAddress(address))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderItem);
