import { useSelector } from "react-redux";
import styled from "styled-components";
import OrderForm from "../ui/OrderForm";
import MovieInCart from "../ui/MovieInCart";
const CeneterDiv = styled.div`
  //margin: 10rem;
  //border: 2px solid #fff;
  //height: fit-content;
  //width: fit-content;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 10rem;
  /* grid-auto-flow: row;
  grid-auto-rows: 1fr; */
  //justify-content: center;
  background-color: var(--background-color-main);
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
// const Empty = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;
// const ButtonContinue = styled.button`
//   border: 1px solid var(--color-brand-main);
//   color: var(--background-color-hover);
//   text-transform: uppercase;
//   border-radius: var(--border-radius-lg);
//   transition: all 1s;
//   &:hover {
//     color: var(--color-brand-main);
//   }
// `;
const Text = styled.p`
  text-transform: uppercase;
  overflow-wrap: normal;
  text-align: center;
`;
function Cart() {
  const cart = useSelector((store) => store.movies.cart);
  //console.log(cart);

  return (
    <CeneterDiv>
      <StyledRow>
        <Text>movie</Text>
        <Text>date</Text>
        <Text>seats</Text>
        <Text>price</Text>
      </StyledRow>

      <>
        {cart.map((movie) => (
          <MovieInCart movie={movie} key={movie.movieID + movie.dayShowTime} />
        ))}
      </>
      <OrderForm cart={cart} />
      {/* <ButtonContinue onClick={() => setShowForm((s) => !s)}>
            continue to payment
          </ButtonContinue> */}

      {/* {showForm && <Stripe />} */}
    </CeneterDiv>
  );
}

export default Cart;
