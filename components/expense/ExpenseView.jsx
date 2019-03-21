// import { useState, useEffect } from 'react';
import styled from 'styled-components';

// import { getInvoices } from 'apis/invoice-apis';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import DropDown from 'common-components/controls/DropDown';
import { FlexRow, FlexCol } from 'common-components/table/FlexTable';
// import useForm from 'hooks/useForm';

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

function InvoiceView() {
  // const [expenses, set] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const { formField, getValues } = useForm();
  // const values = getValues();

  // useEffect(() => {
  //   setLoading(true);
  //   const { status, ...rest } = values;
  //   getInvoices({ status: status === 'all_status' ? undefined : status, ...rest })
  //     .then((res) => {
  //       setLoading(false);
  //       setInvoices(res);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // }, [values.serial, values.status]);

  return (
    <Container>
      <ActionBar>
        <SearchContainer>
          <Input
            // {...formField('serial')}
            placeholder="Search expenses"
            block
          />
        </SearchContainer>
        <ActionContainer>
          <Actions>
            <DropDown
              // {...formField('status')}
              buttonProps={{ block: true }}
              options={options}
            />
          </Actions>
        </ActionContainer>
      </ActionBar>
      <Card>
        <FlexRow>
          <FlexCol bold flex="0 0 100px">Date</FlexCol>
          <FlexCol align="center" bold flex="1 1 auto">Description</FlexCol>
          <FlexCol bold flex="0 0 100px">Category</FlexCol>
          <FlexCol bold flex="0 0 100px">Created by</FlexCol>
          <FlexCol bold flex="0 0 100px">Account Type</FlexCol>
          <FlexCol align="right" bold flex="0 0 100px">Amount</FlexCol>
          <FlexCol align="center" bold flex="0 0 100px">&nbsp;</FlexCol>
        </FlexRow>

        {/* goes into map */}
        <FlexRow>
          <FlexCol flex="0 0 100px">23 Jan 2019</FlexCol>
          <FlexCol flex="1 1 auto">Some nice thing not ellipsis</FlexCol>
          <FlexCol flex="0 0 100px">Government fees</FlexCol>
          <FlexCol flex="0 0 100px">Arnav Kapadia</FlexCol>
          <FlexCol flex="0 0 100px">Personal</FlexCol>
          <FlexCol align="right" flex="0 0 100px">$ 102.43</FlexCol>
          <FlexCol flex="0 0 100px">&nbsp;</FlexCol>
        </FlexRow>
        <FlexRow>
          <FlexCol flex="0 0 100px">23 Jan 2019</FlexCol>
          <FlexCol flex="1 1 auto">Some nice thing not ellipsis</FlexCol>
          <FlexCol flex="0 0 100px">Government fees</FlexCol>
          <FlexCol flex="0 0 100px">Arnav Kapadia</FlexCol>
          <FlexCol flex="0 0 100px">Personal</FlexCol>
          <FlexCol align="right" flex="0 0 100px">$ 4.32</FlexCol>
          <FlexCol flex="0 0 100px">&nbsp;</FlexCol>
        </FlexRow>
        <FlexRow>
          <FlexCol flex="0 0 100px">23 Jan 2019</FlexCol>
          <FlexCol flex="1 1 auto">Some nice thing not ellipsis</FlexCol>
          <FlexCol flex="0 0 100px">Government fees</FlexCol>
          <FlexCol flex="0 0 100px">Arnav Kapadia</FlexCol>
          <FlexCol flex="0 0 100px">Personal</FlexCol>
          <FlexCol align="right" flex="0 0 100px">$ 66.63</FlexCol>
          <FlexCol flex="0 0 100px">&nbsp;</FlexCol>
        </FlexRow>
        {/* map ends here */}

      </Card>
    </Container>
  );
}

const Container = styled.div`
`;

const ActionBar = styled.div`
  height: 40px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: 400px;
`;

const ActionContainer = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 16px;
`;

const Actions = styled.div`
  width: 120px;
  display: inline-block;
`;


export default InvoiceView;
