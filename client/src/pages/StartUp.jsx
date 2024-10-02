import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import SignUpForm from "../ui/SignUpForm";
import { useState } from "react";
import LoginForm from "../ui/LoginForm";
const MainStartUp = styled.main`
  background-color: var(--body-background-color);
  text-align: center;
  padding: 3rem;
  display: grid;
  /* grid-auto-flow: row;
  grid-auto-rows: 1fr; */
  grid-template-columns: 1fr;

  gap: 5rem;
`;
const DivButton = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  justify-content: center;
`;
function StartUp() {
  const [showLogInForm, setShowLogInForm] = useState(false);
  return (
    <MainStartUp>
      <Heading as="h1">your in online cinema controller page</Heading>
      <Modal>
        <DivButton>
          <Button
            size="med"
            vari="prim"
            onClick={() => setShowLogInForm((s) => !s)}
          >
            log in
          </Button>

          <Modal.Open nameToOpenWindow="signupform">
            <Button size="med" vari="prim">
              sign up
            </Button>
          </Modal.Open>
        </DivButton>
        <Modal.Window name="signupform">
          {/* closeWindow is now pass to SignUpForm du to clone */}
          <SignUpForm />
        </Modal.Window>
      </Modal>
      {showLogInForm && (
        <>
          <LoginForm />
        </>
      )}
    </MainStartUp>
  );
}

export default StartUp;
