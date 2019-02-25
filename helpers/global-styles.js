import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    border: 0;
  }

  body {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    color: #333;
  }

  #__next {
    min-height: 100vh;
    display: flex;
  }

`;
