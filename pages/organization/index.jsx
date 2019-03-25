import OrganizationSelectView from 'components/organization/OrganizationSelectView';

function Page() {
  return (
    <OrganizationSelectView />
  );
}

Page.getInitialProps = async (ctx) => {
  const { getState } = ctx.reduxStore;
  const state = getState();
  console.log(state);
  return {
    title: 'Select Organization',
    layout: {
      sidebar: { show: !!state.organization.active.value },
    },
  };
};

export default Page;
