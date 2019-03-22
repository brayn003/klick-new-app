import ExpenseForm from 'components/expense/ExpenseForm';

function Page2() {
  return (
    <ExpenseForm />
  );
}

Page2.getInitialProps = () => ({ title: 'Create Expense' });

export default Page2;
