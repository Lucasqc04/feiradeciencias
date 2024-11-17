import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    transition: 0.5s all;
  }

  body {
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
  }

  a {
    color: ${({ theme }) => theme.linkColor};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.linkHoverColor};
  }

  :root {
  --backgroundColor: #ffffff;  
  --textColor: #333333;  
  --headerBackgroundColor: #f8f9fa; 
}

[data-theme='dark'] {
  --backgroundColor: #2c3e50; 
  --textColor: #ecf0f1;  
  --headerBackgroundColor: #34495e;  
}
`;

export default GlobalStyle;
