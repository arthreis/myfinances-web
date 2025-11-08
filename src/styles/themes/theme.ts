export default interface Theme {
  title: string;

  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    success: string;
    danger: string;
    overlay: string;

    primaryText: string;
    secondaryText: string;
    tertiaryText: string;

    white: string;
    black: string;
  };
  layout: {
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    maxContainer: string;
  };
  fontSize: {
    mobile: FontSizeType;
    tablet: FontSizeType;
    desktop: FontSizeType;
  };
}

export type FontSizeType = {
  XS: string;
  SM: string;
  MD: string;
  LG: string;
  XL: string;
};
