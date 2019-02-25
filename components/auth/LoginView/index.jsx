import Link from 'next/link';

import {
  Container,
  Logo,
  Title,
  Description,
  Card,
  Label,
  Input,
  SubActionBar,
  Anchor,
  Button,
} from './styles';

function LoginView() {
  return (
    <Container>
      <div>
        <Logo>The Klick App.</Logo>
        <Title>Log In</Title>
        <Description>Raise invoices. Track your expenses. Get started.</Description>
        <Card>
          <Label>Email</Label>
          <Input placeholder="abc@example.com" />
          <Label>Password</Label>
          <Input style={{ marginBottom: 8 }} placeholder="********" />
          <SubActionBar>
            <Link href="/forgot-password" passHref>
              <Anchor>Forgot Password?</Anchor>
            </Link>
          </SubActionBar>
          <Button>Log in</Button>
        </Card>
      </div>
    </Container>
  );
}


export default LoginView;
