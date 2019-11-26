import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import styles from './ListItem.css';
import { Color } from '../../theme';

export default props => {
  const { item, active, text, ...otherProps } = props;
  const ListItemComponent = active ? ActiveListItem : ListItem;
  return (
    <ListItemComponent data-address={item.path} {...otherProps}>
      <p><strong>{text}</strong></p>
      {item.icon ? <StyledFontAwesomeIcon icon={item.icon}/> : null}
    </ListItemComponent>
  );
};

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  text-align: center;
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${Color.selectedSidebarItemBackground};
    color: ${Color.selectedSidebarItem};
  }
`;
const ActiveListItem = styled(ListItem)`
  background-color: ${Color.selectedSidebarItemBackground};
  color: ${Color.selectedSidebarItem} !important;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
`;
