import React, { Component } from 'react';
import styles from './FolderItem.css';
import { connect } from 'react-redux';
import { changeAddress } from '../../actions/fileManager';
import path from 'path';

class FolderItem extends Component {
  onClickHandler = () => {
    const folderPath = path.join(this.props.parent, this.props.name);
    this.props.changeAddress(folderPath);
  };
  render() {
    return (
      <div onClick={this.onClickHandler} className={styles.container}>
        <p className={styles.title}>{this.props.name}</p>
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
