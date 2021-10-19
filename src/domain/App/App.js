import React from "react";
import styled from "styled-components";
import Sidebar from "components/Sidebar/";
import Main from "domain/App/Main";

const StyledContainer = styled.div`
  width: 25rem;
  height: 48.75rem;
  overflow-y: scroll;
  display: grid;
  scrollbar-width: none;
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
