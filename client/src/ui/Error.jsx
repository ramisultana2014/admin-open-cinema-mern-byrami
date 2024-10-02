import styled from "styled-components";

const CenterDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  letter-spacing: 2px;
  font-size: 3rem;
`;
function Error({ children }) {
  return <CenterDiv>{children}</CenterDiv>;
}

export default Error;
