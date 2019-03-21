import ExpenseView from 'components/expense/ExpenseView';

function Page() {
  return (
    <ExpenseView />
  );
}

Page.getInitialProps = () => ({ title: 'Expense' });

export default Page;
