import React, { Component } from 'react';
import styled from 'styled-components';
import styles from './Header.css';
import Search from '../search/Search';
import AddressBar from '../addressBar/AddressBar';
import { Color } from '../../theme';

export default class Header extends Component {
  render() {
    return (
      <Container>
        <AddressBar {...this.props}></AddressBar>
        <Search keyUp={value => this.props.searchValueChange(value)} />
      </Container>
    );
  }
}

const Container = styled.div`
  border-bottom: 1px solid;
  height: 70px;
  background: ${Color.sidebarBackground};
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  display: flex;
`;
