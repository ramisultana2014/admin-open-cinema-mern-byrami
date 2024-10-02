import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useDeleteMovie } from "../features/movies/useDeleteMovie.JS";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  color: red;
  & p {
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ closeWindow, movieToDelete }) {
  const { deleteMovie, isPending: isdeleting } = useDeleteMovie();
  return (
    <StyledConfirmDelete>
      <Heading as="h4">Delete {movieToDelete.title}</Heading>
      <p>
        Are you sure you want to delete {movieToDelete.title} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button disabled={isdeleting} onClick={closeWindow}>
          Cancel
        </Button>
        <Button
          disabled={isdeleting}
          onClick={() => deleteMovie(movieToDelete._id)}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
