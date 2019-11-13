import React from 'react';
import connect from 'react-redux';
import styles from './search.css';
import searchFiles from '../../utils/searchFilesWithName';

function onChange(event) {
  props.keyUp(event.target.value);
}

export default function Search(props) {
  return (
    <input
      onChange={onChange}
      className={styles.search}
      placeholder="Search.."
    />
  );
}
