/// <reference types="vite-plugin-svgr/client" />
import type React from 'react';
import { shade } from 'polished';
import { FiArrowLeft, FiMoon, FiSun } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import { useTheme } from '@/hooks/theme';
import Logo from '@/assets/logo.svg?react';
import { Container, IconSwitcherContainer } from './styles';

interface HeaderProps {
  size: 'small' | 'large';
  open: boolean;
}

function Header({
  size = 'large',
  open,
  ...props
}: HeaderProps): React.JSX.Element {
  const { toggleTheme, theme } = useTheme();

  return (
    <Container size={size} open={open} {...props}>
      <header>
        <Link to="/home">
          <Logo color={theme.colors.primaryText} height={35} />
        </Link>
        <div>
          <nav>
            <NavLink
              className={navData => (navData.isActive ? 'active-link' : '')}
              to="/home"
            >
              Home
            </NavLink>
            <NavLink
              className={navData => (navData.isActive ? 'active-link' : '')}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            {/* <NavLink
              className={navData => (navData.isActive ? 'active-link' : '')}
              to="/import"
            >
              Importar
            </NavLink> */}
            <NavLink
              className={navData => (navData.isActive ? 'active-link' : '')}
              to="/config"
            >
              Configurações
            </NavLink>
          </nav>

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
                <FiSun color={theme.colors.primaryText} />
              </IconSwitcherContainer>
            }
            height={20}
            width={50}
            handleDiameter={20}
            offColor={shade(0.15, theme.colors.background)}
            onColor={shade(0.9, theme.colors.background)}
          />

          <Link to="/">
            <FiArrowLeft size={20} /> Sair
          </Link>
        </div>
      </header>
    </Container>
  );
}

export default Header;
