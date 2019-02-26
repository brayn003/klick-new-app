import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const menu = [{
  title: 'Dashboard',
  key: 'dashboard',
  path: '/',
}, {
  title: 'Invoices',
  key: 'invoices',
  path: '/invoices',
}, {
  title: 'Expenses',
  key: 'expenses',
  path: '/expenses',
}];

function CoreNav(props) {
  const { pathname } = props;
  return (
    <Container>
      <Logo>
        The Klick App.
      </Logo>
      <Menu>
        {menu.map(item => (
          <MenuItem key={item.key} active={pathname === item.path}>
            <Link href={item.path} passHref>
              {/* eslint-disable */}
              <a>
              {/* eslint-enable */}
                {item.title}
              </a>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}

CoreNav.propTypes = {
  pathname: PropTypes.string,
};

CoreNav.defaultProps = {
  pathname: null,
};

const Container = styled.nav`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom right, #4064d8, #4ad8dd); 
  box-shadow: rgba(175, 175, 175, 0.5) 2px 0px 8px 0px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
`;

const Logo = styled.p`
  font-size: 1.6em;
  color: #FFF;
  text-align: center;
  padding-bottom: 32px;
  padding-top: 32px;
  margin: 0;
`;

const Menu = styled.ul`
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 16px 16px 16px 32px;
  height: 64px;
  line-height: 32px;
  box-sizing: border-box;
  color: #FFF;
  list-style-type: none;
  cursor: pointer;
  will-change: background-color, border-left-width;
  border: 0;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.8);
  background-color: ${p => (p.active ? 'rgba(0, 0, 0, 0.13)' : 'transparent')};
  border-left-width: ${p => (p.active ? '4px' : '0')};
  transition: background-color 0.1s linear, border-left-width 0.1s linear;

  > a {
    display: block;
    width: 100%;
    height: 100%;
    color: #FFF;
    text-decoration: none;
  }
  
  &:hover, &:focus, &:active {
    background-color: ${p => (p.active ? 'rgba(0, 0, 0, 0.13)' : 'rgba(0, 0, 0, 0.04)')};
  }
`;

export default CoreNav;
