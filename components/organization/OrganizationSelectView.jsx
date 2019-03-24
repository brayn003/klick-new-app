import { useEffect, useState } from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getOrganizations } from 'apis/organization-apis';
import { setActiveOrganizationAction } from 'store/organization/active';

function OrganizationSelectView(props) {
  const { meId } = props;
  const [organizations, setOrganizations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrganizations({ user: meId })
      .then((res) => {
        setLoading(false);
        setOrganizations(res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const onClickOrganizationCard = (organization) => {
    const { setActiveOrganization } = props;
    setActiveOrganization(organization.id);
    Router.push('/');
  };

  return (
    <Container>
      {loading && (<p>Loading ...</p>)}
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
      {!loading && (
      <Card
        key="add-new"
        role="presentation"
      >
        <FlexBox>
          <AddNew>
            + Add new
          </AddNew>
        </FlexBox>
      </Card>
      )}
    </Container>
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
  justify-content: center;
  width: calc(100%);
  box-sizing: border-box;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-right: -12px;
`;

const Card = styled(({ width, ...rest }) => <div {...rest} />)`
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
  margin: 12px;
  box-sizing: border-box;
  padding: 12px;
  position: relative;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }
`;

const BgImg = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  ${p => (p.src ? `background-image: url(${p.src});` : '')}
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AddNew = styled.p`
  text-align: center;
  margin: 0;
  font-size: 1.2em;
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

Card.defaultProps = {
  width: 200,
  thumbnail: null,
};

const mapStateToProps = (state) => {
  const { me } = state.user;
  return { meId: me.value.id };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveOrganization: setActiveOrganizationAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSelectView);
