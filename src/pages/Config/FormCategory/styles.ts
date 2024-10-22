import styled, { css } from 'styled-components';
import { tint, shade } from 'polished';

import Button from '../../../components/Button';
import { FormStyles } from '../../../styles/commons';

export const Container = styled.div`
  form {
    ${FormStyles}
  }
`;

export const Footer = styled.div`
  padding-top: 20px;
  /* border-top: 2px solid ${props => props.theme.colors.tertiary}; */
  display: flex;
  justify-content: flex-end;

  button + button {
    margin-left: 32px;
  }
`;

export const CancelButton = styled(Button)`

  background-color: ${props =>
    props.theme.title === 'dark'
      ? props.theme.colors.background
      : shade(0.2, props.theme.colors.background)};

  &:hover {
    background-color: ${props =>
      props.theme.title === 'dark'
        ? tint(0.05, props.theme.colors.background)
        : shade(0.25, props.theme.colors.background)};
  }


  ${({ theme }) =>
    theme.title === 'dark' &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.secondary};
    `};


  &:disabled {
    background-color: ${props =>
      props.theme.title === 'dark'
        ? props.theme.colors.background
        : shade(0.2, props.theme.colors.background)};
    opacity: 0.5;
    /* background: ${props =>
      props.theme.title === 'dark'
        ? tint(0.025, props.theme.colors.background)
        : shade(0.12, props.theme.colors.background)}; */
  }
`;
