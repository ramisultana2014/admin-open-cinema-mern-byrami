import { fixedSeats } from "../../helpers";
import Seat from "./Seat";
import styled from "styled-components";
const SeatContainer = styled.section`
  //width: clamp(200px, 70%, 400px);
  display: grid;
  grid-template-columns: repeat(6, 5rem);
  gap: 1rem;
`;
function AllSeats({ movieSeats }) {
  return (
    <SeatContainer>
      {fixedSeats.map((seat) => (
        <Seat seat={seat} key={seat} movieSeats={movieSeats} />
      ))}
    </SeatContainer>
  );
}

export default AllSeats;
