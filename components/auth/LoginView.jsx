import styled from 'styled-components';
import Link from 'next/link';

function LoginView() {
  return (
    <Container>
      <div>
        <Title>Log In.</Title>
        <Description>Raise invoices. Track your expenses.</Description>
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

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, #4064d8, #4ad8dd); 
`;

const Card = styled.div`
  background-color: #FFFFFF;
  width: 400px;
  height: auto;
  padding: 24px;
  border-radius: 20px;
  /* box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px; */
  box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #FFF;
`;

const Description = styled.p`
  margin-bottom: 0;
  margin-top: 0;
  margin-bottom: 24px;
  color: #FFF;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  border: 0;
  background-color: transparent;
  border: 1px solid #CCC;
  padding: 6px 16px;
  box-sizing: border-box;
  will-change: box-shadow, border-color;
  line-height: 28px;
  border-radius: 20px;
  margin-bottom: 16px;
  transition: box-shadow 0.1s linear, border-color 0.1s linear;

  &:hover {
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }

  &:focus, &:active {
    outline: 0;
    border-color: #4798DB;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }

  &::placeholder {
    color: #DADADA;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  display: block;
  font-weight: 700;
`;

const Button = styled.button`
  background-image: linear-gradient(to bottom right, #4064d8, #4ad8dd); 
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  will-change: box-shadow;
  height: 40px;
  padding: 0 16px;
  line-height: 40px;
  color: #FFF;
  font-weight: 700;
  width: 100%;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  transition: box-shadow 0.1s linear;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }

  &:focus, &:active {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
    outline: 0;
  }
`;

const SubActionBar = styled.div`
  text-align: right;
  margin-bottom: 32px;
`;

const Anchor = styled.a`
  color: #4798db;
  font-size: 1em;
  text-decoration: none;

  border-bottom: 1px solid transparent;
  transition: border-color 0.1s linear;

  &:hover, &:active, &:focus {
    border-color: #4798db;
    outline: 0;
  }
`;

export default LoginView;
