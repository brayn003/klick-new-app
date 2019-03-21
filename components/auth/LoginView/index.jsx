import { useState } from 'react';
import Link from 'next/link';
import Input from 'common-components/controls/Input';
import useForm from 'hooks/useForm';
import { login } from 'apis/auth-apis';
import { setToken } from 'helpers/auth-service';
import Card from 'common-components/card/Card';
import Label from 'common-components/Label';
import Button from 'common-components/button/Button';

import {
  Container,
  Logo,
  Title,
  Description,
  SubActionBar,
  Anchor,
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
        <Card style={{ width: 400 }}>
          <Label>Email</Label>
          <Input
            style={{ marginBottom: 16 }}
            block
            {...formField('email')}
            placeholder="abc@example.com"
          />
          <Label>Password</Label>
          <Input
            {...formField('password')}
            block
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
            block
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
