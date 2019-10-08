import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends Component {
  render() {
    const { onClick, address, text, ...otherProps } = this.props;
    return (
      <li
        onClick={() => onClick(this.props.address)}
        data-address={address}
        {...otherProps}
      >
        {text}
      </li>
    );
  }
}
