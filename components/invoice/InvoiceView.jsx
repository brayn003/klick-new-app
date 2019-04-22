import { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';
import { MdArrowDropDown } from 'react-icons/md';

import { connect } from 'react-redux';

import { getInvoices } from 'apis/invoice-apis';
import Input from 'common-components/controls/Input';
import DropDown from 'common-components/controls/DropDown';
import useForm from 'hooks/useForm';
import Button from 'common-components/button/Button';
import ButtonLink from 'common-components/button/ButtonLink';
import Animate from 'common-components/animate/Animate';
import Pagination from 'common-components/Pagination';

import InvoiceCard from './InvoiceCard';

const pdfWidth = 200;

const options = [{
  title: 'All Status',
  key: 'all_status',
}, {
  title: 'Open',
  key: 'open',
}, {
  title: 'Closed',
  key: 'closed',
}, {
  title: 'Cancelled',
  key: 'cancelled',
}];

function InvoiceView(props) {
  const { activeOrg } = props;
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const { formField, getValues } = useForm();
  const values = getValues();

  useEffect(() => {
    setLoading(true);
    const { status, ...rest } = values;
    getInvoices({
      organization: activeOrg && activeOrg.id,
      status: status === 'all_status' ? undefined : status,
      page: activePage,
      ...rest,
    })
      .then((res) => {
        setLoading(false);
        setInvoices(res);
        setActivePage(res.page);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [values.serial, values.status, activePage]);

  return (
    <Container>
      <ActionBar>
        <SearchContainer>
          <Input
            {...formField('serial')}
            block
            placeholder="Search invoices"
          />
        </SearchContainer>
        <ActionContainer>
          <DropDown
            {...formField('status')}
            options={options}
          >
            {({ title }) => (
              <ButtonLink
                style={{
                  marginLeft: 24,
                  width: 140,
                  textAlign: 'center',
                }}
              >
                {title}
                <MdArrowDropDown style={{
                  fontSize: 24,
                  height: 40,
                  lineHeight: 40,
                  verticalAlign: 'top',
                }}
                />
              </ButtonLink>
            )}
          </DropDown>
          <Button
            onClick={() => { Router.push('/invoice/create'); }}
            style={{
              marginLeft: 'auto',
            }}
          >
          New Invoice
          </Button>
        </ActionContainer>
      </ActionBar>
      <CardContainer>
        {loading && 'Loading ...'}
        <Animate delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[12, 0]}>
          {!loading && invoices && invoices.docs.map(invoice => (
            <InvoiceCard
              key={invoice.id}
              width={pdfWidth}
              invoice={invoice}
            />
          ))}
        </Animate>
      </CardContainer>
      <Pagination
        active={activePage}
        total={invoices && invoices.pages}
        onChange={setActivePage}
      />
    </Container>
  );
}

InvoiceView.propTypes = {
  activeOrg: shape({}),
};

InvoiceView.defaultProps = {
  activeOrg: {},
};

const Container = styled.div`
`;

const ActionBar = styled.div`
  height: 40px;
  margin-bottom: 24px;
  display: flex;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: 400px;
`;

const ActionContainer = styled.div`
  flex: 1;
  display: flex;
`;

const mapStateToProps = (state) => {
  const activeOrg = state.organization.active.value;
  return {
    activeOrg,
  };
};

export default connect(mapStateToProps, null)(InvoiceView);
