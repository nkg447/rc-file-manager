// @flow
import React, { Component } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Content from './content/Content';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <SideBar></SideBar>
        <Content></Content>
      </div>
    );
  }
}
