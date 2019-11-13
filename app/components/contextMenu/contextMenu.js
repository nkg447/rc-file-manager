import React from 'react';
import ContextMenuItem from './contextMenuItem';

export default props => {
  const {
    bounds,
    onOpen,
    onDelete,
    onCopy,
    onCut,
    onPaste,
    isTrashDir,
    ...otherProps
  } = props;
  const { x, y, file } = bounds;
  return (
    <div style={{ ...styles.container, top: y, left: x }} {...otherProps}>
      {file ? (
        <>
          <ContextMenuItem onClick={onOpen}>Open</ContextMenuItem>
          <ContextMenuItem onClick={onCopy}>Copy</ContextMenuItem>
          <ContextMenuItem onClick={onCut}>Cut</ContextMenuItem>
          <ContextMenuItem onClick={onDelete}>
            {isTrashDir ? 'Delete from Trash' : 'Move to Trash'}
          </ContextMenuItem>
          {isTrashDir ? (
            <ContextMenuItem>Restore from Trash</ContextMenuItem>
          ) : null}
        </>
      ) : (
        <>
          <ContextMenuItem>New Folder</ContextMenuItem>
          <ContextMenuItem onClick={onPaste}>Paste</ContextMenuItem>
        </>
      )}
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
