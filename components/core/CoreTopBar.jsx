import { string, shape } from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';

import DropDown from 'common-components/controls/DropDown';
import ButtonLink from 'common-components/button/ButtonLink';

function CoreTopBar(props) {
  const { title, me } = props;
  return (
    <TopBar>
      <Title>{title}</Title>
      <ActionsContainer>
        <DropDown
          options={[]}
        >
          {() => (
            <ButtonLink
              style={{
                padding: 0,
                height: 48,
                borderRadius: 24,
              }}
            >
              <AvatarText>
                {me.value && me.value.name}
              </AvatarText>
              <Avatar />
            </ButtonLink>
          )}
        </DropDown>
      </ActionsContainer>
    </TopBar>
  );
}

CoreTopBar.propTypes = {
  title: string,
  me: shape({}),
};

CoreTopBar.defaultProps = {
  title: null,
  me: {},
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
  text-align: right;
  margin-top: -4px;
  margin-bottom: -4px;
`;

const Title = styled.p`
  font-size: 1.6em;
  margin: 0;
  flex: 0 0 260px;
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
  line-height: 48px;
  padding: 0 24px;
  display: inline-block;
  vertical-align: middle;
  font-size: 1em;
`;

const mapStateToProps = (state) => {
  const { me } = state.user;
  return {
    me,
  };
};

export default connect(mapStateToProps, null)(CoreTopBar);
