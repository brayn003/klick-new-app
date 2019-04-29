import { shape } from 'prop-types';

import ExpenseForm from 'components/expense/ExpenseForm';

const Page = ({ query }) => {
  const { expenseId } = query;
  return <ExpenseForm expenseId={expenseId} />;
};

Page.propTypes = {
  query: shape({}),
};

Page.defaultProps = {
  query: {},
};

Page.getInitialProps = () => ({ title: 'Create Expense' });

export default Page;
