import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, #4064d8, #4ad8dd); 
`;

export const Card = styled.div`
  background-color: #FFFFFF;
  width: 400px;
  height: auto;
  padding: 24px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
`;

export const Title = styled.h1`
  font-size: 2em;
  color: #FFF;
`;

export const Description = styled.p`
  margin-bottom: 0;
  margin-top: 0;
  margin-bottom: 24px;
  color: #FFF;
`;

export const Input = styled.input`
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

export const Label = styled.label`
  margin-bottom: 8px;
  display: block;
  font-weight: 700;
`;

export const Button = styled.button`
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

export const SubActionBar = styled.div`
  text-align: right;
  margin-bottom: 32px;
`;

export const Anchor = styled.a`
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

export const Logo = styled.p`
  font-size: 3em;
  color: #FFF;
  text-align: center;
  letter-spacing: 2px;
  margin-top: 0;
`;
