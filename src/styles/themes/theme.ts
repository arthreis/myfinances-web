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
    defaultText: string;
    successText: string;
    dangerText: string;
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
    XS: string;
    SM: string;
    MD: string;
    LG: string;
    XL: string;
  };
}
