import styled from 'styled-components';

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  /* padding-top: 8px; */
  /* padding-right: 8px; */
  padding: 8px;
  height: 40px;
  will-change: opacity;
  opacity: 0;
  transition: opacity 0.1s linear;
  background-color: rgba(0, 0, 0, 0.3);
  /* box-shadow: 0 0 12px 12px rgba(0, 0, 0, 0.18); */
  /* border-top-left-radius: 20px; */
  border-bottom-left-radius: 20px;
`;

export default Actions;
