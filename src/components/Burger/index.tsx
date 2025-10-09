import type React from 'react';
import * as Styles from './styles';
import Logo from '@/assets/logo.svg';
import { Link } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import { useTheme } from '@/hooks/theme';
import { IconSwitcherContainer } from '../Header/styles';
import { FiMoon, FiSun } from 'react-icons/fi';
import { shade } from 'polished';

interface BurgueProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
  setOpen(open: boolean): void;
}

export default function Burger({
  open,
  setOpen,
  ...props
}: BurgueProps): React.JSX.Element {
  const isExpanded = open;
  const { toggleTheme, theme } = useTheme();
  return (
    <Styles.Container open={open}>
      <Styles.Burger
        aria-label="Toggle menu"
        aria-expanded={isExpanded}
        open={open}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <span />
        <span />
        <span />
      </Styles.Burger>

      <Link to="/home">
        <img src={Logo} alt="MyFinances" />
      </Link>

      <div>
        <ReactSwitch
          onChange={() => toggleTheme()}
          checked={theme.title === 'dark'}
          className="theme-switcher"
          checkedIcon={
            <IconSwitcherContainer>
              <FiMoon color={theme.colors.primaryText} />
            </IconSwitcherContainer>
          }
          uncheckedIcon={
            <IconSwitcherContainer align="flex-end">
              <FiSun color={theme.colors.secondary} />
            </IconSwitcherContainer>
          }
          height={20}
          width={50}
          handleDiameter={20}
          offColor={shade(0.15, theme.colors.primary)}
          onColor={shade(0.2, theme.colors.primary)}
        />
      </div>
    </Styles.Container>
  );
}
