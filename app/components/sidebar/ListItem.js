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
      <p>{text}</p>
      {item.icon ? <StyledFontAwesomeIcon icon={item.icon} /> : null}
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
    background-color: ${Color.selectedFileIcon};
    color: #2c2e3b;
  }
`;
const ActiveListItem = styled(ListItem)`
  background-color: ${Color.selectedFileIcon};
  color: ${Color.sidebarBackground} !important;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
`;
