import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import styles from './SidebarTop.css';
import { Color } from '../../theme';

export default props => {
  const { navigateAddress, currentStackIndex, navigationStack } = props;
  const canGo = to => {
    return to === 'prev'
      ? currentStackIndex > 0
      : navigationStack.length > currentStackIndex + 1;
  };
  const navigateOnClick = to => {
    if (canGo(to)) navigateAddress(to);
  };
  const PrevIconContainer = canGo('prev') ? ActiveIcon : Icon;
  const NextIconContainer = canGo('next') ? ActiveIcon : Icon;
  return (
    <Container>
      <LOGO>R C</LOGO>
      <Navigate>
        <PrevIconContainer
          onClick={() => navigateOnClick('prev')}
          icon={faChevronLeft}
        />
        <NextIconContainer
          onClick={() => navigateOnClick('next')}
          icon={faChevronRight}
        />
      </Navigate>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  padding: 0 10px;
  height: 70px;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid ${Color.sidebarBorder};
`;
const LOGO = styled.div`
  font-size: x-large;
`;
const Navigate = styled.div`
  width: 3rem;
  font-size: 2rem;
  display: flex;
  border: 1px solid;
`;
const Icon = styled(FontAwesomeIcon)`
  flex: 1;
  border: 1px solid;
  color: ${Color.sidebarBackground};
  background-color: ${Color.sidebar};
`;
const ActiveIcon = styled(FontAwesomeIcon)`
  flex: 1;
  border: 1px solid;
  color: ${Color.sidebar};
  cursor: pointer;
  &:hover {
    color: ${Color.sidebarBackground};
    background-color: ${Color.sidebar};
  }
`;
