import { Fragment } from 'react';
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
  path: '/invoice',
}, {
  title: 'Expenses',
  key: 'expenses',
  path: '/expense',
}, {
  title: 'Organizations',
  key: 'organization',
  path: '/organization',
  children: [{
    title: 'Add',
    key: 'organization.add',
    path: '/organization/add',
  }, {
    title: 'Edit',
    key: 'organization.edit',
    path: '/organization/5bad458b39b04708096d26c9/edit',
  }, {
    title: 'Invoice Preferences',
    key: 'organization.invoice-preferences',
    path: '/organization/5bad458b39b04708096d26c9/invoice-preferences',
  }],
}];

const findByPath = (pathname, menu2) => {
  for (let i = 0; i < menu2.length; i += 1) {
    const item = menu2[i];
    if (item.path === pathname) {
      return item;
    }
    if (item.children) {
      return findByPath(pathname, item.children);
    }
  }
  return undefined;
};

function CoreNav(props) {
  const { pathname } = props;
  const activeKey = (findByPath(pathname, menu) || {}).key;

  const parentActiveKey = activeKey ? activeKey.split('.')[0] : null;
  return (
    <Container>
      <Logo>
        The Klick App.
      </Logo>
      <Menu>
        {menu.map(item => (
          <Fragment key={item.key}>
            <MenuItem active={activeKey === item.key}>
              <Link href={item.path} passHref>
                {/* eslint-disable */}
                <a>
                {/* eslint-enable */}
                  {item.title}
                </a>
              </Link>
            </MenuItem>
            {item.children && parentActiveKey === item.key && item.children.map(child => (
              <MenuItem child key={child.key} active={pathname === child.path}>
                <Link href={child.path} passHref>
                  {/* eslint-disable */}
                  <a>
                  {/* eslint-enable */}
                    {child.title}
                  </a>
                </Link>
              </MenuItem>
            ))}
          </Fragment>
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

const getProperties = (p) => {
  if (p.child) {
    if (p.active) {
      return `
        background-color: rgba(0, 0, 0, 0.13);
      `;
    }
    return `
      background-color: rgba(0, 0, 0, 0.2);

      &:hover, &:focus, &:active {
        background-color: rgba(0, 0, 0, 0.13);
      }
    `;
  }
  if (p.active) {
    return 'background-color: rgba(0, 0, 0, 0.08)';
  }
  return `
    background-color: transparent;
    
    &:hover, &:focus, &:active {
      background-color: rgba(0, 0, 0, 0.08);
    }
  `;
};

const MenuItem = styled.li`
  padding: 12px 16px 12px ${p => (p.child ? '48px' : '32px')};
  height: 52px;
  line-height: 28px;
  box-sizing: border-box;
  color: #FFF;
  list-style-type: none;
  cursor: pointer;
  will-change: background-color, border-left-width;
  border: 0;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.8);
  ${p => getProperties(p)};
  border-left-width: ${p => (p.active ? '4px' : '0')};
  transition: background-color 0.1s linear, border-left-width 0.1s linear;

  > a {
    display: block;
    width: 100%;
    height: 100%;
    color: #FFF;
    text-decoration: none;
  }
  
`;

export default CoreNav;
