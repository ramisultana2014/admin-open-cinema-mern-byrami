import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  :root {
    
      /* Grey */
      --color-grey-0: #fff;
      --color-grey-50: #f9fafb;
      --color-grey-100: #f3f4f6;
      --color-grey-200: #e5e7eb;
      --color-grey-300: #d1d5db;
      --color-grey-400: #9ca3af;
      --color-grey-500: #6b7280;
      --color-grey-600: #4b5563;
      --color-grey-700: #374151;
      --color-grey-800: #1f2937;
      --color-grey-900: #111827;
    
      --color-red-100: #fee2e2;
      --color-red-800: #991b1b;
      --body-background-color:#000;
     
      --background-color-main: #1A1A1A;
      --background-color-hover:#FFFCE6;
 /* Indigo */
      --color-brand-main: #ffe21a;
      --color-brand-hover: #332D00;
      
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

      --image-grayscale: 0;
      --image-opacity: 100%;
    
    
   
      --border-radius-tiny: 3px;
      --border-radius-sm: 5px;
      --border-radius-md: 7px;
      --border-radius-lg: 9px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* like we dont need to define it in each element use hover and in Creating animations for dark mode  */
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Open Sans", sans-serif;
    color: var(--color-brand-main);
    background-color: var(--body-background-color);
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }

  select:disabled,
  input:disabled {
    background-color: var(--background-color-main);
    color: var(--color-brand-main);
  }

  input:focus,
  
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-brand-main);
    outline-offset: -1px;
  }

  /* Parent selector, finally 😃 */
  button:has(svg) {
    line-height: 0;
  }
button{
  background-color: var(--background-color-main);
  border: none;
}
  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img {
    max-width: 100%;

    
  }
`;
export default GlobalStyles;
