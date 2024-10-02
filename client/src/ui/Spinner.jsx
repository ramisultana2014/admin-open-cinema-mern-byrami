import styled from "styled-components";
// const rotate = keyframes`
//   to {
//     transform: rotate(1turn)
//   }
// `;
const Spinner = styled.div`
  width: 50px;
  aspect-ratio: 1;
  color: var (--color-brand-main);
  border-radius: 50%;
  display: grid;
  z-index: 100;
  background: conic-gradient(from 90deg at 4px 4px, #0000 90deg, currentColor 0) -4px -4px /
      calc(50% + 2px) calc(50% + 2px),
    radial-gradient(
        farthest-side,
        currentColor 6px,
        #0000 7px calc(100% - 6px),
        currentColor calc(100% - 5px)
      )
      no-repeat;
  animation: s10 2s infinite linear;
  position: relative;
  &::before {
    content: "";
    border-radius: inherit;
    background: inherit;
    transform: rotate(45deg);
  }
  @keyframes s10 {
    to {
      transform: rotate(0.5turn);
    }
  }
  @media screen and (max-width: 370px) {
    width: 40px;
    height: 40px;
  }
`;

export default Spinner;
