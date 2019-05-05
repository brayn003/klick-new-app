import OrganizationForm from 'components/organization/OrganizationForm';

function Page() {
  return (
    <OrganizationForm />
  );
}

Page.getInitialProps = async (ctx) => {
  const { getState } = ctx.reduxStore;
  const state = getState();
  return {
    title: 'New Organization',
    layout: {
      sidebar: { show: !!state.organization.active.value },
    },
  };
};

export default Page;
