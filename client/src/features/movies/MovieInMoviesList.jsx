import styled from "styled-components";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash, HiOutlineNewspaper } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import MovieDetail from "./MovieDetail";
import CreateEditMovie from "../../ui/CreateEditMovie";
import ConfirmDelete from "../../ui/ConfirmDelete";
const Text = styled.p`
  text-transform: uppercase;
  text-align: center;

  width: 6rem;
  @media screen and (max-width: 900px) {
    font-size: 1.2rem;
  }
`;
const StyledRow = styled.div`
  display: flex;

  //justify-items: center;
  align-items: center;
  font-size: 1.6rem;
  gap: 2rem;
  font-weight: 400;
  position: relative;
  padding: 1rem 2rem;
  border-bottom: 1px solid #000;
  transition: all 0.5s;

  & * {
    flex: 1;
  }
  &:hover {
    cursor: pointer;
    color: var(--background-color-hover);
  }
`;
const Img = styled.img`
  //width: 100%; /* Full width of the container */
  //max-width: 10rem; /* Ensures it doesn't exceed 10rem */
  // min-width: 6rem; /* Ensures it doesn't shrink below 5rem */
  width: clamp(6rem, 100%, 10rem);
  aspect-ratio: 1;
`;
const DivMenus = styled.div`
  position: absolute;
  top: 4.7rem;
  right: 1rem;
  z-index: 999;
`;
const ButtonI = styled.button`
  background-color: var(--color-brand-200);
  display: block;
  //z-index: 999;
  border: none;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  ${(props) => (props.mar === "m-r" ? "margin-right:0.5rem;" : "")};
  transition: all 0.3s;
  margin-bottom: 2px;
  &:hover {
    color: ${(props) =>
      props.type === "red"
        ? "var(--color-red-800 )"
        : "var(--color-brand-main)"};
    scale: 1.1;
  }
`;
function MovieInMoviesList({ movie }) {
  //console.log(movie);
  //   console.log(
  //     movie.showDays.reduce((acc, cur) => acc + cur.availableSeats.length, 0)
  //   );
  // Convert buffer to blob URL
  const createImageURL = (bufferData) => {
    if (!bufferData) return null;
    const blob = new Blob([Uint8Array.from(bufferData.data)], {
      type: "image/jpeg",
    });
    return URL.createObjectURL(blob);
  };

  // Create image URL from buffer data
  const imageURL = createImageURL(movie.movieImage1);
  return (
    <StyledRow>
      <Text>
        <Img src={imageURL || `/img/${movie.image1.pic}`} alt={movie.title} />
      </Text>
      <Text>{movie.title}</Text>
      <Text>
        {movie.showDays.reduce(
          (acc, cur) => acc + cur.availableSeats.length,
          0
        )}
      </Text>
      <Text>{movie.price}</Text>
      <Text>{movie.category}</Text>
      <DivMenus>
        {/* Menus must wrap the parent div */}
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={movie._id} />
            {/* Menus.Toggle is just button to open the Menus.List */}
            <Menus.List id={movie._id}>
              {/* children of Modal.Open must be button du to clone to add the onclick so we can match name in Modal.Window */}
              <Modal.Open nameToOpenWindow="details">
                <ButtonI>
                  <HiOutlineNewspaper /> see details
                </ButtonI>
              </Modal.Open>
              <Modal.Open nameToOpenWindow="update">
                <ButtonI>
                  <HiPencil /> update movie
                </ButtonI>
              </Modal.Open>
              <Modal.Open nameToOpenWindow="delete">
                <ButtonI type="red">
                  <HiTrash /> delete movie
                </ButtonI>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="details">
              {/* closeWindow is now pass to MovieDetail du to clone  */}
              <MovieDetail movie={movie} />
            </Modal.Window>
            <Modal.Window name="update">
              {/* closeWindow is now pass to MovieDetail du to clone so to use we write it as props in CreateEditMovie */}
              <CreateEditMovie movieToEdit={movie} />
            </Modal.Window>
            <Modal.Window name="delete">
              {/* closeWindow is now pass to MovieDetail du to clone so to use we write it as props in ConfirmDelete */}
              <ConfirmDelete movieToDelete={movie} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </DivMenus>
    </StyledRow>
  );
}

export default MovieInMoviesList;
