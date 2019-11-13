import React from 'react';

export default props => {
  const { children, ...otherProps } = props;
  return (
    <button {...otherProps} style={styles.container}>
      {children}
    </button>
  );
};

const styles = {
  container: {
    padding: '0.5rem',
    borderBottom: '1px solid lightgray'
  }
};
