import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    border: 0;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    font-family: 'Poppins';
    font-size: 14px;
  }

  #__next {
    height: 100%;
  }

`;
