import { Outlet, useNavigate } from "react-router-dom";
import MainNav from "./MainNav";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Header = styled.header`
  //height: 10rem;
  grid-column: 2/3;
  display: flex;
  justify-content: end;
  padding: 1rem;
`;
const Main = styled.main`
  //background-color: var(--color-grey-50);
  padding: 1rem 2rem;
  //overflow: scroll;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("logintime");
    // queryClient.setQueryData(["user"], null);
    // queryClient.setQueryData(["movies"], []);
    queryClient.removeQueries();

    navigate("/", { replace: true });
  }
  return (
    <StyledLayout>
      <Header>
        {/* <h1>open cenima manager</h1> */}
        <button onClick={handleLogOut}>logout</button>
      </Header>
      <MainNav />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledLayout>
  );
}

export default AppLayOut;
