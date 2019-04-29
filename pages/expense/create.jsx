import ExpenseForm from 'components/expense/ExpenseForm';

function Page() {
  return (
    <ExpenseForm />
  );
}

Page.getInitialProps = () => ({ title: 'Create Expense' });

export default Page;
