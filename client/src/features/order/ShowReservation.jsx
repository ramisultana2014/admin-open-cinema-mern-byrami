import LoadingPage from "../../ui/LoadingPage";
import { useGetOrder } from "./useGetOrder";
import Error from "../../ui/Error";
import styled from "styled-components";
const CeneterDiv = styled.div`
  //margin: 10rem;
  color: var(--background-color-hover);
  //height: fit-content;
  //width: fit-content;
  padding: 2rem;
  display: grid;
  //grid-template-columns: 1fr;
  grid-template-areas: row;

  //margin-top: 10rem;
  /* grid-auto-flow: row;
  grid-auto-rows: 1fr; */
  //justify-content: center;
  background-color: var(--background-color-main);
  & p:hover {
    color: var(--color-brand-main);
  }
  & h3 {
    margin-bottom: 5rem;
    color: var(--color-brand-main);
  }
`;
const Header = styled.header`
  /* display: flex;
  justify-items: center;
  align-items: center;
  font-size: 1.6rem;
  gap: 1rem;
  font-weight: 400;
  padding: 1rem 2rem;
  & * {
    flex: 1;
  } */

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 20rem;
  justify-items: center;
  //align-items: center;

  gap: 2rem;
  margin-bottom: 3rem;
`;
const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: 40rem;
  gap: 2rem;

  //justify-items: center;
  align-items: center;
  border: 1px solid var(--background-color-hover);
  padding: 2rem;
  transform: translate(30%, 20%);
  & *:hover {
    color: var(--color-brand-main);
  }
`;
const StyledLi = styled.li``;
function ShowReservation() {
  const { order, isPending, error } = useGetOrder();
  if (isPending) return <LoadingPage />;
  if (error)
    return (
      <Error>
        <p> {error.message}</p>
      </Error>
    );
  //console.log(order.order);
  return (
    <CeneterDiv>
      <h3>online cinema Booking</h3>
      <Header>
        <p>booking information</p>
        <p>reservation email</p>
        <p>reservation number</p>
        <p>phoneNumber</p>
      </Header>
      <Header>
        <p></p>
        <p>
          <strong>{order.order.email}</strong>
        </p>
        <p>
          <strong>{order.order.ticketvervicationCode}</strong>
        </p>
        <p>
          <strong>{order.order.phoneNumber}</strong>
        </p>
      </Header>
      <Header>
        <h2>booking details</h2>
        {order.order.cart.map((item) => (
          <StyledUl key={item._id}>
            <StyledLi>
              movie title : <span>{item.movieTitle}</span>
            </StyledLi>
            <StyledLi>
              number of seats : <span>{item.numberOfSeats}</span>
            </StyledLi>
            <StyledLi>
              your seats are :
              {item.seats.map((s) => (
                <span key={s}> {s} </span>
              ))}
            </StyledLi>
            <StyledLi>showtime at :{item.dayShowTime}</StyledLi>
          </StyledUl>
        ))}
      </Header>
    </CeneterDiv>
  );
}

export default ShowReservation;

//  each obj in cart
//   ul
//    li movie title :
//     span= obj.movieTitle
//    li number of seats :
//     span= obj.numberOfSeats
//     .seat your seats are
//      each seat in obj.seats
//       span= seat
//    li showtime at
//     span= obj.dayS
