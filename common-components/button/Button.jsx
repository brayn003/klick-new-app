import styled from 'styled-components';

function Button(props) {
  return <StyledButton {...props} />;
}

export const StyledButton = styled.button`
  background-image: linear-gradient(to bottom right, #4064d8, #4ad8dd); 
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  will-change: box-shadow;
  height: 40px;
  padding: 0 24px;
  line-height: 40px;
  color: #FFF;
  width: ${p => (p.block ? '100%' : 'auto')};
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

StyledButton.defaultProps = {
  block: false,
};

export default Button;
