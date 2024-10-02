import styled from "styled-components";

const Text = styled.p`
  text-transform: uppercase;
  overflow-wrap: normal;
  text-align: center;
`;
const StyledRow = styled.div`
  display: flex;

  justify-items: center;
  align-items: center;
  font-size: 1.6rem;
  gap: 2rem;
  font-weight: 400;
  padding: 1rem 2rem;
  & * {
    flex: 1;
  }
`;
function MovieInCart({ movie }) {
  //console.log("movie", movie);

  return (
    <StyledRow>
      <Text>{movie.movieTitle}</Text>
      <Text>
        {movie.dayShowTime.slice(0, 3)} {movie.dayShowTime.slice(-2)}
      </Text>
      <Text> {movie.seats.length}</Text>
      <Text> {movie.price * movie.seats.length}</Text>
    </StyledRow>
  );
}

export default MovieInCart;
