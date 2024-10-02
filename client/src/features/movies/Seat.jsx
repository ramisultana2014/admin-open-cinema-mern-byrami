import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addMovieSeats } from "../../context/movieSlice";

const StyledSeat = styled.button`
  width: 5rem;
  height: 5rem;
  border: 1px solid var(--color-brand-main);
  border-radius: var(--border-radius-md);
  background-color: ${(props) =>
    props.taken
      ? "var(--background-color-hover)"
      : "var(--background-color-main)"};
  color: ${(props) =>
    props.taken ? "var(--color-brand-hover)" : "var(--color-brand-main)"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;

  &:hover {
    border: none;
    border-radius: var(--border-radius-md);
    background-color: var(--background-color-hover);
    color: var(--color-brand-hover);
    scale: ${(props) => (props.taken ? "1" : "1.1")};
  }
`;
function Seat({ seat, movieSeats }) {
  const isavailable = movieSeats?.includes(seat);
  const selectedSeatsArray = useSelector((store) => store.movies.movieSeats);
  //console.log(selectedSeatsArray);
  const isInselectedSeatsArray = selectedSeatsArray.includes(seat);
  const dispatch = useDispatch();
  return (
    <StyledSeat
      taken={!isavailable || isInselectedSeatsArray ? "taken" : ""}
      disabled={!isavailable}
      onClick={() => {
        dispatch(addMovieSeats(seat));
      }}
    >
      {isavailable ? seat : <HiXMark />}
    </StyledSeat>
  );
}

export default Seat;
