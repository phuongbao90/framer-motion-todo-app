import React from "react";
import Sidebar from "components/Sidebar/";
import Main from "domain/App/Main";
import styled from "styled-components";
import breakpoints from "utils/breakpoints";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: grid;
  scrollbar-width: none;

  /* -------------------------------------------------------------------------- */
  max-height: 100vh;

  @media only screen and ${breakpoints.device.xs} {
    width: 25rem;
    height: 48.75rem;
  }
`;

function App() {
  return (
    <>
      <StyledContainer id="app">
        <Sidebar />
        <Main />
      </StyledContainer>
    </>
  );
}

export default App;
