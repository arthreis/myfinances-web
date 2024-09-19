import React from 'react';
import ReactSelect from 'react-select';
import type { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

import { Container } from './styles';
import { useTheme } from '../../hooks/theme';

function SelectSimple({ ...rest }: StateManagerProps): React.JSX.Element {
  const myTheme = useTheme();

  return (
    <Container>
      {
        <ReactSelect
          {...rest}
          classNamePrefix="react-select"
          theme={theme => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: myTheme.theme.colors.secondary, //option hover
              primary: myTheme.theme.colors.primary, //option selected
              neutral0: myTheme.theme.colors.secondary, //background color
            },
          })}
        />
      }
    </Container>
  );
}

export default SelectSimple;
