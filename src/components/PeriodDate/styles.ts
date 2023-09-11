import styled from 'styled-components';
import * as Constants from '../../constants';

export const Container = styled.div`
  align-items: center;
`;

export const SelectDate = styled.p`
  width: 220px;
  text-align: center;
  color: ${props => props.theme.colors.primaryText};

  font-size: ${Constants.FONT_SIZE.desktop.large};
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${Constants.FONT_SIZE.tablet.large};
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${Constants.FONT_SIZE.mobile.large};
  }
`;
