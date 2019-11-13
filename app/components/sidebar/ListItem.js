import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ListItem.css';

export default props => {
  const { item, active, text, ...otherProps } = props;
  return (
    <li
      data-address={item.path}
      className={active ? styles.activeListItem : styles.listItem}
      {...otherProps}
    >
      <p>{text}</p>
      {item.icon ? (
        <FontAwesomeIcon icon={item.icon} className={styles.icon} />
      ) : null}
    </li>
  );
};
