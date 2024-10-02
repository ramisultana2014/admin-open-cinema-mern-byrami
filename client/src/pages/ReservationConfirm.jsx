import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.4rem;
  padding: 1rem 0;
  font-size: 1.8rem;
`;
const Input = styled.input`
  border: 1px solid var(--background-color-hover);
  background-color: var(--background-color-hover);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: #000;
  padding: 1.2rem 3.2rem;
`;
function ReservationConfirm() {
  const [ticketvervicationCode, setTicketvervicationCode] = useState();
  const navigate = useNavigate();

  function handlesearch(e) {
    e.preventDefault();
    if (!ticketvervicationCode) return;
    navigate(
      `/reservationconfirm/showreservation?ticketvervicationCode=${ticketvervicationCode}`
    );
  }
  return (
    <div>
      <form onSubmit={handlesearch}>
        <FormRow>
          <Input
            type="text"
            placeholder="search for order"
            onChange={(e) => setTicketvervicationCode(e.target.value)}
          />
          <Button size="med" vari="search">
            search
          </Button>
        </FormRow>
      </form>
    </div>
  );
}

export default ReservationConfirm;
