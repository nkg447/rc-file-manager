// @flow
import React, { Component } from 'react';
import SideBar from './sidebar/SideBar';
import Content from './content/Content';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <SideBar></SideBar>
        <Content></Content>
      </div>
    );
  }
}
