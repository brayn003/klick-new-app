import styled from 'styled-components';

function ButtonLink(props) {
  return (
    <StyledButtonLink {...props} />
  );
}

const StyledButtonLink = styled.button`
  height: 40px;
  padding: 0 12px;
  line-height: 40px;
  border-radius: 20px;
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  will-change: box-shadow, background-color, color;
  transition: box-shadow 0.1s linear, background-color 0.1s linear, color 0.1s linear ;
  color: #999;

  &:hover, &:focus, &:active {
    outline: 0;
  }

  &:hover {
    background-color: #FFF;
    color: #4798db;
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }
`;

export default ButtonLink;