import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
`;

export const SelectDate = styled.p`
  font-size: 24px;
  width: 220px;
  text-align: center;
  color: ${props => props.theme.colors.primaryText};
`;
