import { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import Animate from 'common-components/animate/Animate';

const menu = [{
  title: 'Dashboard',
  key: 'dashboard',
  path: '/',
}, {
  title: 'Invoices',
  key: 'invoice',
  path: '/invoice',
  children: [{
    title: 'Create',
    key: 'invoice.create',
    path: '/invoice/create',
  }, {
    title: 'Edit',
    key: 'invoice.edit',
    path: '/invoice/edit',
    dynamic: true,
  }],
}, {
  title: 'Expenses',
  key: 'expense',
  path: '/expense',
  children: [{
    title: 'Create',
    key: 'expense.create',
    path: '/expense/create',
  }, {
    title: 'Edit',
    key: 'expense.edit',
    path: '/expense/edit',
    dynamic: true,
  }],
}, {
  title: 'Organizations',
  key: 'organization',
  path: '/organization',
  children: [{
    title: 'Create',
    key: 'organization.create',
    path: '/organization/create',
  }, {
    title: 'Edit',
    key: 'organization.edit',
    path: '/organization/edit',
    dynamic: true,
  }, {
    title: 'Invoice Preferences',
    key: 'organization.invoice-preferences',
    path: '/organization/invoice-preferences',
    dynamic: true,
  }],
}];

const findByPath = (pathname, menu2) => {
  for (let i = 0; i < menu2.length; i += 1) {
    const item = menu2[i];
    if (item.path === pathname) {
      return item;
    }
    if (item.children) {
      const found = findByPath(pathname, item.children);
      if (found) {
        return found;
      }
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
        <Animate delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[12, 0]}>
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
              {item.children && parentActiveKey === item.key && item.children.map((child) => {
                if (child.dynamic && child.path !== pathname) {
                  return null;
                }
                return (
                  <MenuItem child key={child.key} active={pathname === child.path}>
                    {!child.dynamic ? (
                      <Link href={child.path} passHref>
                        {/* eslint-disable */}
                      <a>
                      {/* eslint-enable */}
                        {child.title}
                      </a>
                      </Link>
                    ) : child.title}
                  </MenuItem>
                );
              })}
            </Fragment>
          ))}
        </Animate>
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
        padding-left: 48px;
      `;
    }
    return `
      background-color: rgba(0, 0, 0, 0.2);
      padding-left: 52px;

      &:hover, &:focus, &:active {
        background-color: rgba(0, 0, 0, 0.13);
      }
    `;
  }
  if (p.active) {
    return `
      background-color: rgba(0, 0, 0, 0.08);
      padding-left: 28px;
    `;
  }
  return `
    background-color: transparent;
    padding-left: 32px;
    
    &:hover, &:focus, &:active {
      background-color: rgba(0, 0, 0, 0.08);
    }
  `;
};

const MenuItem = styled.li`
  padding-top: 12px;
  padding-right: 16px;
  padding-bottom: 12px;
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
