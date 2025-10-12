import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
`;

export const SelectDate = styled.p`
  width: 220px;
  text-align: center;
  color: ${props => props.theme.colors.primaryText};

  font-size: ${({ theme }) => theme.fontSize.desktop.LG};
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.tablet.LG};
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.mobile.LG};
  }
`;
