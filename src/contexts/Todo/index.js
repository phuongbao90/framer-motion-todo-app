import { createContext, useReducer, useContext } from "react";
import initialTodos from "assets/data/defaultTodos.json";

const TodoContext = createContext();
const TodoDispatchContext = createContext();

function TodoReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        todos: [...state.todos, action.payload],
      };

    case "update":
      return {
        todos: [
          ...state.todos.reduce((acc, curr) => {
            if (curr.id === action.payload.id) {
              curr.finished = !curr.finished;
            }
            acc.push(curr);
            return acc;
          }, []),
        ],
      };

    case "remove":
      return {
        todos: [
          ...state.todos.reduce((acc, curr) => {
            if (curr.id === action.payload.id) {
              //!FIXME somehow dont work
              curr.active = false;
            }
            acc.push(curr);
            return acc;
          }, []),
        ],
      };

    case "undo":
      return {
        todos: [
          ...state.todos.reduce((acc, curr) => {
            if (curr.id === action.payload.id) {
              curr.active = true;
            }
            acc.push(curr);
            return acc;
          }, []),
        ],
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: initialTodos,
  });

  return (
    <TodoContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}
function useTodoState() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoState must be used within a TodoProvider");
  }

  return context;
}
function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error("useTodoDispatch must be used within a TodoProvider");
  }

  return context;
}

export { TodoProvider, TodoContext, useTodoDispatch, useTodoState };
