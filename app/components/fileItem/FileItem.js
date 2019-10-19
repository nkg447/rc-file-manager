import React, { Component } from 'react';
import styles from './FileItem.css';
import { connect } from 'react-redux';
import { FOLDER_ICON, FILE_ICON } from '../../assets';

export default (props)=>{
  const { file, ...otherProps } = props;
  const isDirectory = file.isDirectory();
  const icon = isDirectory ? FOLDER_ICON : FILE_ICON;
  return (
    <div
      className={styles.container}
      {...otherProps}
    >
      <img src={icon} className={styles.icon}></img>
      <p className={styles.name}>{file.name}</p>
    </div>
  );
}

// class FolderItem extends Component {


//   render() {
    
//   }
// }

// const mapStateToProps = state => {
//   return {};
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(FolderItem);
