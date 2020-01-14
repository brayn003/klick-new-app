import styled from 'styled-components';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import { DEVICE } from 'helpers/style-helper';

import Card from 'common-components/card/Card';
import { Row as GenRow, Col } from 'common-components/FlexGrid';
import ExpenseCategoryPieSection from './ExpenseCategoryPieSection';

function DashboardView({ activeOrg }) {
  return (
    <Container>
      <Row gutter={24}>
        <Col>
          <Card title="Invoices" />
        </Col>
        <Col>
          <Card title="Expenses">
            <ExpenseCategoryPieSection organization={activeOrg} />
          </Card>
        </Col>
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

const Row = styled(GenRow)`
  ${DEVICE.mobile} {
    flex-basis: 0;
    flex-wrap: wrap;
  }
`;

export default connect(mapStateToProps, null)(DashboardView);
