// import { useState } from "react";
import { useTodoState } from "contexts/Todo";
import { compareDesc, parse } from "date-fns";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todo from "components/Todo/index";
import { motion, AnimatePresence } from "framer-motion";
import CreateNewTodoButton from "components/Button/CreateNewTodoButton";

const List = ({ match, history }) => {
  const { todos } = useTodoState();
  // const [isDragged, setDragged] = useState(false);
  // console.log(match);
  // console.log(history);
  return (
    <>
      <motion.ul
        // layout
        initial={{
          display: "flex",
          flexDirection: "column",
          alignContent: "start",
        }}
      >
        <AnimatePresence initial={true}>
          {todos
            .sort((a, b) => {
              return compareDesc(
                parse(a.created_at, "dd/MM/yyyy HH:mm:ss", new Date()),
                parse(b.created_at, "dd/MM/yyyy HH:mm:ss", new Date())
              );
            })
            .map((el) => {
              return (
                <Todo
                  key={el.id}
                  isSelected={match.params.id === el.id}
                  history={history}
                  {...el}
                />
              );
            })}
        </AnimatePresence>
      </motion.ul>
      <CreateNewTodoButton />
    </>
  );
};

const TaskList = () => (
  <Router>
    <Route path={["/:id", "/"]} component={List} />
  </Router>
);

export default TaskList;
