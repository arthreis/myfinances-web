/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import { shade } from 'polished';

import ReactSwitch from 'react-switch';

import { useTheme } from '../../hooks/theme';

import { Container, IconSwitcherContainer } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
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
          <img src={Logo} alt="GoFinances" />
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
                <FiMoon color={theme.colors.defaultText} />
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

          <Link to="/">
            <FiArrowLeft size={20} /> Sair
          </Link>
        </div>
      </header>
    </Container>
  );
}

export default Header;
