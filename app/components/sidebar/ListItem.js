import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ListItem.css';
import { EJECT_ICON } from '../../assets';

export default props => {
  const { item, active, text, ...otherProps } = props;
  return (
    <li
      data-address={item.path}
      className={active ? styles.activeListItem : styles.listItem}
      {...otherProps}
    >
      <p>{text}</p>
      {item.external ? (
        <img src={EJECT_ICON} className={styles.icon}></img>
      ) : null}
    </li>
  );
};
