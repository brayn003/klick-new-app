import { string, shape, func } from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DEVICE } from 'helpers/style-helper';

import DropDown from 'common-components/controls/DropDown';
import ButtonLink from 'common-components/button/ButtonLink';
import { clearToken } from 'helpers/auth-service';

import { resetTokenAction } from 'store/auth/token';
import { resetActiveOrgAction } from 'store/organization/active';

function CoreTopBar(props) {
  const {
    title,
    me,
    activeOrganization,
    pathname,
    resetToken,
    resetActiveOrg,
  } = props;
  const options = [{
    title: 'Select Organization',
    key: '/organization',
  }, {
    title: 'Logout',
    key: 'logout',
  }];

  const onChangeAvatarMenu = (key) => {
    if (key === 'logout') {
      clearToken(true);
      resetToken();
      resetActiveOrg();
    } else {
      Router.push(key);
    }
  };

  return (
    <TopBar>
      <Title>{title}</Title>
      <ActionsContainer>
        <DropDown
          value={pathname}
          options={options}
          onChange={onChangeAvatarMenu}
        >
          {() => (
            <AvatarButton>
              <AvatarTextContainer>
                <AvatarText small>
                  {me.value && me.value.name}
                </AvatarText>
                <AvatarText>
                  {activeOrganization && activeOrganization.value && activeOrganization.value.name}
                </AvatarText>
              </AvatarTextContainer>
              <Avatar />
            </AvatarButton>
          )}
        </DropDown>
      </ActionsContainer>
    </TopBar>
  );
}

CoreTopBar.propTypes = {
  title: string,
  me: shape({}),
  activeOrganization: shape({}),
  pathname: string,
  resetActiveOrg: func,
  resetToken: func,
};

CoreTopBar.defaultProps = {
  title: null,
  me: {},
  activeOrganization: {},
  pathname: null,
  resetActiveOrg: () => {},
  resetToken: () => {},
};

const TopBar = styled.div`
  height: 80px;
  line-height: 32px;
  padding: 32px 24px 16px 24px;
  box-sizing: border-box;
  display: flex;
`;

const ActionsContainer = styled.div`
  flex: 1;
  margin-top: -4px;
  margin-bottom: -4px;
  display: flex;
`;

const Title = styled.p`
  font-size: 1.6em;
  margin: 0;
  flex: 0 0 260px;

  ${DEVICE.mobile} {
    padding-top: 4px;
    font-size: 1.1em;
    flex: 1;
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.1);
  display: inline-block;
  border-radius: 24px;
  vertical-align: middle;
`;

const AvatarText = styled.p`
  margin: 0;
  padding: 0 24px;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
  line-height: 100%;
  line-height: 20px;
  font-size: ${p => (p.small ? '0.8em' : '1em')};
  font-weight: ${p => (p.bold ? 700 : 400)};
`;

AvatarText.defaultProps = {
  small: false,
  bold: false,
};

const AvatarButton = styled(ButtonLink)`
  padding: 0;
  height: 48px;
  border-radius: 24px;
  display: flex;
  margin-left: auto;
  align-items: center;
`;

export const AvatarTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = (state) => {
  const { user: { me }, organization } = state;
  return {
    me,
    activeOrganization: organization.active,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  resetToken: resetTokenAction,
  resetActiveOrg: resetActiveOrgAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoreTopBar);
