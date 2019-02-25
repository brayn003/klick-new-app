import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    border: 0;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
  }

  #__next {
    min-height: 100vh;
  }

`;
