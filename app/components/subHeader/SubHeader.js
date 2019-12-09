import React, { Component } from 'react';
import styled from 'styled-components';
import { Color } from '../../theme';
import { inherits } from 'util';

export default props => {
  const { onEmptyBin, ...otherProps } = props;
  const EmptyButton = onEmptyBin ? ButtonActive : ButtonInactive;
  return (
    <Container {...otherProps}>
      <P>Trash</P>
      <ButtonContainer>
        <ButtonInactive>Restore</ButtonInactive>
        <EmptyButton onClick={onEmptyBin}>Empty</EmptyButton>
      </ButtonContainer>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${Color.sidebarBackground};
  border: 1px solid ${Color.sidebarBorder};
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
  max-width: 150px;
`;
const Button = styled.button`
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid lightgray;
  cursor: pointer;
`;
const ButtonInactive = styled(Button)`
  background-color: ${Color.sidebarBackground};
  color: ${Color.fileName};
  cursor: not-allowed;
`;
const ButtonActive = styled(Button)`
  background-color: ${Color.selectedSidebarItemBackground};
  color: ${Color.fileName};
`;
const P = styled.p`
  color: ${Color.fileName};
`;
