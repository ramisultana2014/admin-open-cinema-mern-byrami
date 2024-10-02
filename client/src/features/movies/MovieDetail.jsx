import styled, { css } from "styled-components";
import Heading from "../../ui/Heading";
import { useEffect, useState } from "react";
import AllSeats from "./AllSeats";
import { useDispatch, useSelector } from "react-redux";
import { addMovieDetails, addToCart } from "../../context/movieSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const StyledMain = styled.main`
  display: grid;

  grid-auto-flow: row;
  text-align: center;
  row-gap: 3rem;
  justify-items: center;
`;
const StyledFilter = styled.div`
  background-color: var(--background-color-main);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 3rem;
`;
const FilterButton = styled.button`
  background-color: var(--background-color-main);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--background-color-hover);
      color: var(--color-brand-hover);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--background-color-hover);
    color: var(--color-brand-hover);
  }
`;
const Paragraph = styled.p`
  width: 50rem;
  line-height: 1.6;
  font-size: 1.8rem;
`;
function MovieDetail({ movie }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [select, setSelect] = useState("");
  const [objectInShowDays, setObjectInShowDays] = useState(null);
  const selectedSeatsArray = useSelector((store) => store.movies.movieSeats);
  const movieDetails = useSelector((store) => store.movies.movieDetails);
  useEffect(
    function () {
      setObjectInShowDays(
        movie.showDays.find((el) => el.dayShowTime === select)
      );
    },
    [select, movie.showDays]
  );
  function handleAddToart() {
    const totaldayshowTimePrice = selectedSeatsArray.length * movie.price;
    const numberOfSeats = selectedSeatsArray.length;
    dispatch(
      addToCart({
        totaldayshowTimePrice,
        numberOfSeats,
        seats: selectedSeatsArray,
        ...movieDetails,
      })
    );
    navigate("/cart");
  }
  return (
    <StyledMain>
      <Heading as="h2">{movie.title}</Heading>
      <Paragraph>{movie.description}</Paragraph>
      <p> {movie.price} $ / SEAT</p>
      {selectedSeatsArray.length > 0 && (
        <Button vari="prim" size="small" onClick={handleAddToart}>
          add to cart
        </Button>
      )}

      <StyledFilter>
        {movie.showDays.map((el) => (
          <FilterButton
            key={el._id}
            onClick={() => {
              setSelect(el.dayShowTime);
              dispatch(
                addMovieDetails({
                  movieTitle: movie.title,
                  movieID: movie._id,
                  price: movie.price,
                  dayShowTime: el.dayShowTime,
                })
              );
            }}
            disabled={el.dayShowTime === select}
            active={el.dayShowTime === select ? "active" : ""}
          >
            {el.day} {el.showTimes}
          </FilterButton>
        ))}
      </StyledFilter>
      {select && <AllSeats movieSeats={objectInShowDays?.availableSeats} />}
    </StyledMain>
  );
}

export default MovieDetail;
