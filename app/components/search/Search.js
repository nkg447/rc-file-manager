import React from 'react';
import connect from 'react-redux';
import styles from './search.css';
import searchFiles from "../../utils/searchFilesWithName"

export default function Search(props){
  function onChange(event){
    props.keyUp(event.target.value);
  }
  return (
    <input onChange={onChange} className={styles.search} placeholder={'Search..'} />
  )
}
