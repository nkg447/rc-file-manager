import React, { Component } from 'react';
import styles from './FolderItem.css';

export default class FolderItem extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.children.name}</h3>
      </div>
    );
  }
}
