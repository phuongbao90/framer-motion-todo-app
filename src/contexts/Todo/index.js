import { createContext, useReducer, useContext } from "react";
import initialTodos from "assets/data/defaultTodos.json";

const TodoContext = createContext();
const TodoDispatchContext = createContext();

function TodoReducer(state, action) {
  // console.log(state.todos);
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "UPDATE":
      return {
        ...state,
        todos: [
          ...state.todos.reduce((acc, curr) => {
            if (curr.id === action.payload.id) {
              // curr.finished = !curr.finished;
              // console.log(curr);
              // console.log(action.payload);
              // curr[action.payload] = action.payload;
              curr.content = action.payload.content;
            }
            acc.push(curr);
            return acc;
          }, []),
        ],
      };

    case "FIND":
      return {
        ...state,
        selectedTodo: Object.assign(
          {},
          state.todos.find((el) => el.id === action.payload.id)
        ),
      };

    case "REMOVE":
      return {
        ...state,
        todos: state.todos.filter((t) => {
          if (t.id === action.payload.id) {
            return false;
          }
          return t;
        }),
      };

    case "NOT_SAVE":
      // console.log(state.todos.pop());
      return {
        ...state,
        todos: [...state.todos],
      };

    case "UNDO":
      return {
        ...state,
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

    case "SELECTED":
      return {
        ...state,
        selectedTodo: Object.assign(
          {},
          state.todos.find((el) => el.id === action.payload.id)
        ),
      };

    case "DESELECTED":
      return {
        ...state,
        selectedTodo: null,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(TodoReducer, {
    todos: initialTodos,
    // isEditing: true,
    selectedTodo: null,
  });
  // console.log(state);

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

// function useSelectedTodo() {
//   const context = useContext(TodoContext);

//   if (context === undefined) {
//     throw new Error("useTodoState must be used within a TodoProvider");
//   }

//   return context;
// }

export {
  TodoProvider,
  TodoContext,
  useTodoDispatch,
  useTodoState,
  // useSelectedTodo,
};
