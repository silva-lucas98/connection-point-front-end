import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  box-shadow: 0px 4px 4px var(--grey-3);
  background-color: var(--white);
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 600px) {
    max-width: 25rem;
    height: fit-content;
  }
`;

export default Container;
