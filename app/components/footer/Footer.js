import React, { Component } from 'react';
import styles from './Footer.css';

const MAX_FILE_ICON_SIZE = 100;
const MIN_FILE_ICON_SIZE = 30;

const getFileIconSizeInPercentage = size => {
  return (
    ((size - MIN_FILE_ICON_SIZE) * 100) /
    (MAX_FILE_ICON_SIZE - MIN_FILE_ICON_SIZE)
  );
};

export default props => {
  const { files, fileIconSize, fileIconSizeHandler } = props;
  const activeWidth = getFileIconSizeInPercentage(fileIconSize);
  const onDragHandler = (e: React.DragEvent) => {
    if (e.clientX === 0) return;
    const dialOffset = document.getElementById('fontSizeDial').offsetLeft;
    fileIconSizeHandler(fileIconSize + ((e.clientX - dialOffset) * 70) / 100);
  };
  return (
    <div className={styles.container}>
      <div className={styles.numberOfItems}>{files.length} items</div>
      <div className={styles.fontSizeDial}>
        <div
          draggable
          onDrag={onDragHandler}
          id="fontSizeDial"
          className={styles.dial}
          style={{ left: `${activeWidth}%` }}
        ></div>
        <div className={styles.statusBar}>
          <div
            className={styles.activeStatus}
            style={{ width: `${activeWidth}%` }}
          ></div>
          <div
            className={styles.inActiveStatus}
            style={{ width: `${100 - activeWidth}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
