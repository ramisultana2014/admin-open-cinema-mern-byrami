import styled from "styled-components";
import { useGetAllMovies } from "../features/movies/useGetAllMovies";
import LoadingPage from "../ui/LoadingPage";
import MovieInMoviesList from "../features/movies/MovieInMoviesList";
import Menus from "../ui/Menus";

const CeneterDiv = styled.div`
  //margin: 10rem;
  //border: 2px solid #fff;
  //height: fit-content;
  //width: fit-content;
  /* color: var(--background-color-hover); */
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  //height: 85vh;
  //overflow-y: scroll;
  /* grid-auto-flow: row;
  grid-auto-rows: 1fr; */
  //justify-content: center;
  background-color: var(--background-color-main);
`;
const StyledRow = styled.div`
  display: flex;

  // justify-items: center;
  align-items: center;
  font-size: 1.6rem;
  gap: 2rem;
  font-weight: 400;
  padding: 1rem 2rem;
  & * {
    flex: 1;
  }
`;
const Text = styled.p`
  text-transform: uppercase;
  text-align: center;

  width: 6rem;
  @media screen and (max-width: 900px) {
    font-size: 1.2rem;
  }
`;
function MoviesList() {
  const { movies, isPending } = useGetAllMovies();

  // console.log(movies?.movies);
  if (isPending) return <LoadingPage />;

  return (
    <Menus>
      <CeneterDiv>
        <StyledRow>
          <Text></Text>
          <Text>movie</Text>
          <Text>seats</Text>
          <Text>price</Text>
          <Text>categ</Text>
        </StyledRow>

        <>
          {movies?.movies?.map((movie) => (
            <MovieInMoviesList movie={movie} key={movie._id} />
          ))}
        </>
      </CeneterDiv>
    </Menus>
  );
}

export default MoviesList;
