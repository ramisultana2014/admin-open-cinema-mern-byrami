import { differenceInMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Heading from "./Heading";
import StyledLink from "./StyledLink";
const CenDiv = styled.div`
  background-color: var(--background-color-main);
  display: grid;
  width: 80rem;
  height: 100vh;
  grid-template-columns: 40rem;
  justify-items: center;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 1rem 4rem;
  margin: 0 auto;
`;
function ProtectedRoutes({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const logintime = JSON.parse(localStorage.getItem("logintime"));
  const [isSessionValid, setIsSessionValid] = useState(false);
  //console.log(new Date(logintime));
  //console.log(location.pathname);
  useEffect(() => {
    if (logintime) {
      const isStillHaveTime = differenceInMinutes(
        new Date(),
        new Date(logintime)
      );
      //console.log(differenceInMinutes(new Date(), new Date(logintime)));
      // Assuming a session timeout of 30 minutes for example
      const sessionTimeout = 55;

      if (isStillHaveTime < sessionTimeout) {
        setIsSessionValid(true);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("logintime");
        setIsSessionValid(false);
      }
    }
  }, [logintime, location.pathname]);
  if (token && isSessionValid) {
    return <div>{children}</div>;
  }
  return (
    <CenDiv>
      <Heading as="h2">sessionTimeout</Heading>

      <StyledLink to="/">please log in again</StyledLink>
    </CenDiv>
  );
}

export default ProtectedRoutes;
