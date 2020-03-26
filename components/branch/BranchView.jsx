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

import { getBranches } from '../../apis/branch-apis';


const BranchView = ({
  activeOrg,
}) => {
  const [branches, setBranches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const { formField, getValues } = useForm();
  const values = getValues();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getBranches({
        organization: activeOrg.id,
        page: activePage,
        ...values,
      });
      setLoading(false);
      setBranches(res);
      setActivePage(res.page);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [...Object.values(values), activePage]);

  const onClickEdit = (branch) => {
    Router.push(`/branch/edit?branchId=${branch.id}`, `/branch/edit/${branch.id}`);
  };

  // const onDeleteBranch = () => {
  //   console.log('delete branch');
  // };

  // const onChangeDropDown = (key, branch) => {
  //   if (key === 'delete') onDeleteBranch(branch);
  // };

  const cols = [{
    title: 'Code',
    key: 'code',
  }, {
    title: 'Name',
    key: 'name',
  }, {
    title: 'GST No',
    key: 'gstNumber',
  }, {
    title: 'State',
    key: 'state.name',
  }, {
    title: '',
    key: 'action',
    width: '14%',
    align: 'right',
    render: r => (
      <>
        <IconButton
          onClick={() => { onClickEdit(r); }}
          tooltipText="Edit Expense"
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
              placeholder="Search branches"
              block
            />
          </SearchContainer>
          <ActionContainer>
            <Button
              onClick={() => { Router.push({ pathname: '/branch/create' }); }}
              style={{
                marginLeft: 'auto',
              }}
            >
            New Branch
            </Button>
          </ActionContainer>
        </ActionBar>
        <Card>
          <Table
            loading={loading}
            cols={cols}
            data={(branches || {}).docs || []}
            rowKey="id"
          />
        </Card>
        <Pagination
          active={activePage}
          total={(branches || {}).pages}
          onChange={setActivePage}
        />
      </Container>
    </>
  );
};

BranchView.propTypes = {
  activeOrg: shape({}),
};

BranchView.defaultProps = {
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

export default connect(mapStateToProps, null)(BranchView);
