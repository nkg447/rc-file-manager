import React, { Component } from 'react';
import styles from './FileItem.css';

export default class FileItem extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.children.name}</h3>
      </div>
    );
  }
}
