import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:  ${props => shade(0.1, props.theme.colors.background)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  padding: 0 20px 0 20px;
  width: 100%;
  width: 500px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  > a {
    color: ${props => props.theme.colors.secondaryText};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${props => shade(0.15, props.theme.colors.secondaryText)};
    }
  }
`;

export const Form = styled.form`
    width: 100%;
    margin: 50px 0;
    gap: 16px;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 16px;
    }
`;
