import React from 'react';

export default props => {
  const { color } = props;
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="folder"
      className="prefix__svg-inline--fa prefix__fa-folder prefix__fa-w-16"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill={color ? color : '#6cccfc'}
        d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"
      />
    </svg>
  );
};
