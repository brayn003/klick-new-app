import styled from 'styled-components';
import { connect } from 'react-redux';
import { shape } from 'prop-types';

import Card from 'common-components/card/Card';
import { Row, Col } from 'common-components/FlexGrid';
import ExpenseCategoryPieSection from './ExpenseCategoryPieSection';

function DashboardView({ activeOrg }) {
  return (
    <Container>
      <Row gutter={24}>
        <Col>
          <Card title="Expenses">
            <ExpenseCategoryPieSection organization={activeOrg} />
          </Card>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

DashboardView.propTypes = {
  activeOrg: shape({}),
};

DashboardView.defaultProps = {
  activeOrg: {},
};

const Container = styled.div``;

const mapStateToProps = ({ organization }) => ({
  activeOrg: organization.active.value,
});

export default connect(mapStateToProps, null)(DashboardView);
