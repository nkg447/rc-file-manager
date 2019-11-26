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
    onRefresh,
    onRename,
    isTrashDir,
    onNewFolder,
    onOpenInTerminal,
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
          ) : (
            <ContextMenuItem onClick={onRename}>Rename</ContextMenuItem>
          )}
        </>
      ) : (
        <>
          <ContextMenuItem onClick={onNewFolder}>New Folder</ContextMenuItem>
          <ContextMenuItem onClick={onRefresh}>Refresh</ContextMenuItem>
          <ContextMenuItem onClick={onPaste}>Paste</ContextMenuItem>
          <ContextMenuItem onClick={onOpenInTerminal}>
            Open in Terminal
          </ContextMenuItem>
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
