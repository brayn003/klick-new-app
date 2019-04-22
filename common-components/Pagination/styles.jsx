import styled from 'styled-components';

export const Container = styled(({ align, ...rest }) => <div {...rest} />)`
  height: 40px;
  width: auto;
  text-align: ${p => p.align};
  margin-bottom: 24px;
`;

Container.defaultProps = {
  align: 'right',
};

export const PageButton = styled.button`
  height: 100%;
  background-image: ${p => (p.active ? 'linear-gradient(to bottom right,#4064d8,#4ad8dd)' : 'none')};
  color: ${p => (p.active ? 'white' : 'inherit')};
  background-color: #FFFFFF;
  cursor: pointer;
  width: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  border: none;
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  margin-right: 8px;
  will-change: box-shadow;
  transition: box-shadow 0.1s linear;
  text-align: center;
  vertical-align: top;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    /* background-color: ${p => (p.active ? 'linear-gradient(to bottom right,#4064d8,#4ad8dd)' : 'rgba(71, 152, 219, 0.2)')} ; */
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }

  &:focus, &:active {
    outline: 0;
  }
`;

PageButton.defaultProps = {
  active: false,
};
