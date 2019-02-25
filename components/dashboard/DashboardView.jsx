import styled from 'styled-components';

function DashboardView() {
  return (
    <Container>
      <Title>Dashboard</Title>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
`;

const Title = styled.p`
  font-size: 2em;
  margin: 0;
`;

export default DashboardView;
