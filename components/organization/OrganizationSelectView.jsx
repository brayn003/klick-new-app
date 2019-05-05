import { useEffect, useState } from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'common-components/button/Button';
import Animate from 'common-components/animate/Animate';
import { ActionBar, ActionContainer } from 'common-components/form-helpers';
import { getOrganizations } from 'apis/organization-apis';
import { setActiveOrgAction } from 'store/organization/active';
import Pagination from 'common-components/Pagination';

function OrganizationSelectView(props) {
  const { meId } = props;
  const [organizations, setOrganizations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getOrganizations({ user: meId, page: activePage })
      .then((res) => {
        setLoading(false);
        setOrganizations(res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [activePage]);

  const onClickOrganizationCard = (organization) => {
    const { setActiveOrganization } = props;
    setActiveOrganization(organization.id);
    Router.push('/');
  };

  const onClickAddNew = () => {
    Router.push('/organization/create');
  };

  return (
    <>
      <ActionBar>
        <ActionContainer>
          <Button
            onClick={onClickAddNew}
            style={{
              marginLeft: 'auto',
            }}
          >
            New Organization
          </Button>
        </ActionContainer>
      </ActionBar>
      <Container>
        {loading && (<p>Loading ...</p>)}
        <Animate delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[12, 0]}>
          {organizations && organizations.docs.map(organization => (
            <Card
              role="presentation"
              key={organization.id}
              onClick={() => { onClickOrganizationCard(organization); }}
            >
              <BgImg src={organization.logo} />
              <Title>{organization.name}</Title>
            </Card>
          ))}
        </Animate>
        {/* {!loading && (
        <Card
          key="add-new"
          role="presentation"
          onClick={onClickAddNew}
        >
          <FlexBox>
            <AddNew>
              + Add new
            </AddNew>
          </FlexBox>
        </Card>
        )} */}
      </Container>
      <Pagination
        active={activePage}
        total={organizations && organizations.pages}
        onChange={setActivePage}
      />
    </>
  );
}

OrganizationSelectView.propTypes = {
  meId: string.isRequired,
  setActiveOrganization: func,
};

OrganizationSelectView.defaultProps = {
  setActiveOrganization: () => {},
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100%);
  box-sizing: border-box;
  flex-wrap: wrap;
`;

const Card = styled.div`
  height: ${p => `${p.width * 1.4142}px`};
  width: ${p => `${p.width}px`};
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  margin-bottom: 24px;
  cursor: pointer;
  background-color: #FFF;
  transition: box-shadow 0.1s linear;
  box-sizing: border-box;
  padding: 12px;
  position: relative;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }
`;

Card.defaultProps = {
  width: 200,
  thumbnail: null,
};

const BgImg = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  ${p => (p.src ? `background-image: url(${p.src});` : '')}
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;


const Title = styled.h3`
  font-weight: 400;
  font-size: 1.2em;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  border-top: 1px solid #EFEFEF;
  background-color: #FFF;
`;

const mapStateToProps = (state) => {
  const { me } = state.user;
  return { meId: (me.value || {}).id };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveOrganization: setActiveOrgAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSelectView);
