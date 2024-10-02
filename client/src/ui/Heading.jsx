import styled, { css } from "styled-components";

const Heading = styled.h1`
  text-transform: uppercase;
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 700;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: 2px;
    `}
`;
export default Heading;
