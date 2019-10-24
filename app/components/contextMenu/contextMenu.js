import React from 'react';
import ContextMenuItem from './contextMenuItem';

export default props => {
  const { bounds, onOpen, onDelete } = props;
  return (
    <div style={{ ...styles.container, top: bounds.y, left: bounds.x }}>
      <ContextMenuItem onClick={onOpen}>Open</ContextMenuItem>
      <ContextMenuItem onClick={onDelete}>Delete</ContextMenuItem>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    border: '1px solid lightgray',
    display: 'flex',
    flexDirection: 'column'
  }
};