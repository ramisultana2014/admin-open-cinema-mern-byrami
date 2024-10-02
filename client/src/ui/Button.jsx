import styled, { css } from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  text-transform: uppercase;
  text-align: center;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1.4rem;
      padding: 0.4rem 0.8rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.size === "med" &&
    css`
      font-size: 1.8rem;
      font-weight: 700;
      padding: 1rem 1.4rem;
    `}
    ${(props) =>
    props.vari === "prim" &&
    css`
      color: var(--color-brand-main);
      background-color: var(--background-color-main);
      transition: all 1s;
      &:hover {
        color: var(--color-brand-hover);
        background-color: var(--background-color-hover);
      }
    `}
    ${(props) =>
    props.vari === "cancel" &&
    css`
      background-color: none;
      color: yellow;
      &:hover {
        background-color: var(--color-brand-hover);
        color: red;
      }
    `}
    ${(props) =>
    props.vari === "search" &&
    css`
      &:hover {
        border: 2px solid var(--color-brand-main);
      }
    `}
`;
export default Button;
