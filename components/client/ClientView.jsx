import { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';
import { connect } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi';

// import DropDown from 'common-components/controls/DropDown';
import Button from 'common-components/button/Button';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Table from 'common-components/table/Table';
import Pagination from 'common-components/Pagination';
import IconButton from 'common-components/button/IconButton';
import useForm from 'hooks/useForm';

import { getOrganizations } from 'apis/organization-apis';


const ClientView = ({
  activeOrg,
}) => {
  const [clientes, setClientes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const { formField, getValues } = useForm();
  const values = getValues();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getOrganizations({
        referrer: activeOrg.id,
        verified: false,
        page: activePage,
        ...values,
      });
      setLoading(false);
      setClientes(res);
      setActivePage(res.page);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [...Object.values(values), activePage]);

  const onClickEdit = (client) => {
    Router.push(`/client/edit?clientId=${client.id}`, `/client/edit/${client.id}`);
  };

  // const onDeleteClient = () => {
  //   console.log('delete client');
  // };

  // const onChangeDropDown = (key, client) => {
  //   if (key === 'delete') onDeleteClient(client);
  // };

  const cols = [{
    title: 'Name',
    key: 'name',
  }, {
    title: 'Email',
    key: 'email',
  }, {
    title: 'Mobile',
    key: 'phone',
  }, {
    title: 'State',
    key: 'defaultBranch.state.name',
  }, {
    title: '',
    key: 'action',
    width: '14%',
    align: 'right',
    render: r => (
      <>
        <IconButton
          onClick={() => { onClickEdit(r); }}
          tooltipText="Edit Client"
        >
          <FiEdit2 />
        </IconButton>
        {/* <DropDown
          options={[{
            title: 'Delete',
            key: 'delete',
          }]}
          onChange={(key) => { onChangeDropDown(key, r); }}
        >
          <IconButton tooltipText="More Options">
            <FiMoreVertical />
          </IconButton>
        </DropDown> */}
      </>
    ),
  }];


  return (
    <>
      <Container>
        <ActionBar>
          <SearchContainer>
            <Input
              {...formField('name')}
              placeholder="Search clientes"
              block
            />
          </SearchContainer>
          <ActionContainer>
            <Button
              onClick={() => { Router.push({ pathname: '/client/create' }); }}
              style={{
                marginLeft: 'auto',
              }}
            >
            New Client
            </Button>
          </ActionContainer>
        </ActionBar>
        <Card>
          <Table
            loading={loading}
            cols={cols}
            data={(clientes || {}).docs || []}
            rowKey="id"
          />
        </Card>
        <Pagination
          active={activePage}
          total={(clientes || {}).pages}
          onChange={setActivePage}
        />
      </Container>
    </>
  );
};

ClientView.propTypes = {
  activeOrg: shape({}),
};

ClientView.defaultProps = {
  activeOrg: {},
};

const Container = styled.div`
`;

const ActionBar = styled.div`
  height: 40px;
  margin-bottom: 24px;
  display: flex;
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

export default connect(mapStateToProps, null)(ClientView);
