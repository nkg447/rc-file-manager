import React, { Component } from 'react';

export default props => {
  const { x1, y1, x2, y2, ...otherProps } = props;
  if (x1 && x2 && y1 && y2) {
    const height = Math.abs(y1 - y2);
    const width = Math.abs(x1 - x2);
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    return (
      <div
        style={{
          ...styles.container,
          top: y,
          left: x,
          height: height,
          width: width
        }}
      ></div>
    );
  } else return null;
};

const styles = {
  container: {
    position: 'absolute',
    border: '1px dotted skyblue',
    backgroundColor: 'rgba(116, 177, 190, 0.5)'
  }
};
