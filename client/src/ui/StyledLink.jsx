import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: 2rem;
  padding: 1rem 3rem;
  text-transform: uppercase;
  border: 2px solid yellow;
  transition: all 1s;
  &:hover {
    border: none;
  }
`;
export default StyledLink;
