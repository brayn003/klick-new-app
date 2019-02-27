import { useState } from 'react';
import Link from 'next/link';
import Input from 'common-components/controls/Input';
import useForm from 'hooks/useForm';
import { login } from 'apis/auth-apis';
import { setToken } from 'helpers/auth-service';

import {
  Container,
  Logo,
  Title,
  Description,
  Card,
  Label,
  SubActionBar,
  Anchor,
  Button,
} from './styles';

function LoginView() {
  const { formField, getValues } = useForm();
  const [loading, setLoading] = useState(false);
  const onClickLogin = async () => {
    setLoading(true);
    const body = getValues();
    try {
      const res = await login(body);
      setToken(res.token, true);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Logo>The Klick App.</Logo>
        <Title>Log In</Title>
        <Description>Raise invoices. Track your expenses. Get started.</Description>
        <Card>
          <Label>Email</Label>
          <Input
            {...formField('email')}
            placeholder="abc@example.com"
          />
          <Label>Password</Label>
          <Input
            {...formField('password')}
            type="password"
            style={{ marginBottom: 8 }}
            placeholder="********"
          />
          <SubActionBar>
            <Link href="/forgot-password" passHref>
              <Anchor>Forgot Password?</Anchor>
            </Link>
          </SubActionBar>
          <Button
            loading={loading}
            onClick={onClickLogin}
          >
            Log in
          </Button>
        </Card>
      </div>
    </Container>
  );
}


export default LoginView;
