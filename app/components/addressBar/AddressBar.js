import React, { Component } from 'react';
import styles from './AddressBar.css';

export default props => {
  const { address, changeAddress } = props;
  const [path, setPath] = React.useState(address);
  const [oldPath, setOldPath] = React.useState(address);
  if (oldPath !== address) {
    setPath(address);
    setOldPath(address);
  }
  return (
    <div className={styles.container}>
      <input
        className={styles.addressBar}
        type="text"
        value={path}
        onChange={e => setPath(e.target.value)}
        onKeyUp={e => (e.key === 'Enter' ? changeAddress(path) : null)}
      ></input>
    </div>
  );
};
