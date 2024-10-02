import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
  HiFire,
} from "react-icons/hi2";
import styled from "styled-components";
const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  grid-row: 1/-1;
`;
const StyledLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--background-color-hover);

    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  //like a:hover,a:active,a.ctive
  //thats the way we add active class in NavLink
  &:hover,
  &:active,
  &.active {
    color: var(--color-brand-main);
    //background-color: var(--background-color-hover);
    border-radius: var(--border-radius-sm);
  }
  // like a svg {}
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    //color: var(--color-grey-400);
    transition: all 0.3s;
  }
  /* &:hover svg,
  &:active svg,
  &.active svg {
    color: var(--color-brand-main);
  } */
`;
function MainNav() {
  return (
    <NavList>
      <ul>
        <li>
          <StyledLink to="/movieslist">
            <HiOutlineHome />
            <span>movies</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/newrealse">
            <HiFire />
            <span>newrealse</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/orders">
            <HiOutlineCalendarDays />
            <span>orders</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/reservationconfirm">
            <HiOutlineUsers />
            <span>reservation confirm</span>
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/addmovie">
            <HiOutlineCog6Tooth />
            <span>add movie</span>
          </StyledLink>
        </li>
      </ul>
    </NavList>
  );
}

export default MainNav;
