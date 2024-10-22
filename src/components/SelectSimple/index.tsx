import React from 'react';
import ReactSelect from 'react-select';
import type { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

import { Container } from './styles';
import { useTheme } from '../../hooks/theme';

function SelectSimple({ ...rest }: StateManagerProps): React.JSX.Element {
  const myTheme = useTheme();

  return (
    <Container>
      <ReactSelect
        {...rest}
        classNamePrefix="react-select"
        theme={theme => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: myTheme.theme.colors.primary, //option hover
            primary: myTheme.theme.colors.secondary, //option selected background
            neutral0: myTheme.theme.colors.primary, //background color
            neutral20: myTheme.theme.colors.primaryText, //icon & border
            neutral80: myTheme.theme.colors.primaryText, //font selected
          },
        })}
      />
    </Container>
  );
}

export default SelectSimple;
