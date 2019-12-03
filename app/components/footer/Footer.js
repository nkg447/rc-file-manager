import React, { Component } from 'react';
import styles from './Footer.css';
import { Color } from '../../theme';
import styled from 'styled-components';

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
    const newFileIconSize =
      fileIconSize + ((e.clientX - dialOffset) * 70) / 100;
    if (
      newFileIconSize >= MIN_FILE_ICON_SIZE &&
      newFileIconSize <= MAX_FILE_ICON_SIZE
    )
      fileIconSizeHandler(newFileIconSize);
  };
  return (
    <Container>
      <NumberOfItems>{files.length} items</NumberOfItems>
      <FontSizeDial>
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
      </FontSizeDial>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  border-top: 1px solid;
  display: flex;
  justify-content: space-between;
`;
const NumberOfItems = styled.div`
  color: gray;
`;
const FontSizeDial = styled.div`
  width: 100px;
  height: 5px;
  display: flex;
  border-radius: 5px;
`;
