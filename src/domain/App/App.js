import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "components/Sidebar/";
import Content from "domain/Content";
import AddTodo from "domain/AddTodo";

const StyledContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 33px;
  background: ${({ theme }) => theme.background};
`;

function App() {
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const toggleIsAddTodoOpen = () => {
    setIsAddTodoOpen((prev) => !prev);
  };

  return (
    <StyledContainer>
      <Sidebar />
      <Content
        isAddTodoOpen={isAddTodoOpen}
        toggleIsAddTodoOpen={toggleIsAddTodoOpen}
      />
      <AddTodo
        isAddTodoOpen={isAddTodoOpen}
        toggleIsAddTodoOpen={toggleIsAddTodoOpen}
      />
    </StyledContainer>
  );
}

export default App;
