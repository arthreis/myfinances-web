import React, { type HTMLAttributes } from 'react';
import type light from '../../styles/themes/light';
import * as S from './styles';

type Props = {
  bold?: boolean;
  size?: keyof typeof light.fontSize;
  color?: keyof typeof light.colors;
};

export type TypographyProps = Props & HTMLAttributes<HTMLSpanElement>;

export const Typography = ({
  children,
  ...rest
}: TypographyProps): React.ReactNode => {
  return <S.CustomText {...rest}>{children}</S.CustomText>;
};
