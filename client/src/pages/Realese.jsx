import styled from "styled-components";
import { useGetNewCreatedMovies } from "../features/movies/useGetNewCreatedMovies";
import Heading from "../ui/Heading";
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
function Realese() {
  const { isPending, newRealeses } = useGetNewCreatedMovies();
  if (isPending) return <LoadingPage />;
  //tableconsole.log(newRealeses.newRealeses);
  return (
    <Menus>
      <CeneterDiv>
        <Heading as="h1">new realese</Heading>
        <StyledRow>
          <Text></Text>
          <Text>movie</Text>
          <Text>seats</Text>
          <Text>price</Text>
          <Text>categ</Text>
        </StyledRow>
        <>
          {newRealeses?.newRealeses?.map((movie) => (
            <MovieInMoviesList movie={movie} key={movie._id} />
          ))}
        </>
      </CeneterDiv>
    </Menus>
  );
}

export default Realese;
