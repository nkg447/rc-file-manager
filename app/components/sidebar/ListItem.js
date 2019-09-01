import React, { Component } from 'react'
import PropTypes from 'prop-types'



export default class ListItem  extends Component {

 render() {
  return(
    <li data-address={this.props.address}>{this.props.text}</li>
    )
   }
 }

