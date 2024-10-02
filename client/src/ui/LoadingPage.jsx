import Spinner from "./Spinner";
import styled from "styled-components";
const CenterDiv = styled.div`
  display: flex;

  height: 100vh;
  align-items: center;
  justify-content: center;
`;
const Text = styled.span`
  font-size: 4rem;
  transform: translateY(-4%);
  @media screen and (max-width: 370px) {
    font-size: 3rem;
  }
`;
function LoadingPage() {
  return (
    <CenterDiv>
      <Spinner />
      <Text>NLINE CINEMA BOOKING</Text>
    </CenterDiv>
  );
}

export default LoadingPage;
