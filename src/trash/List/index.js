// import styled from "styled-components";
import {
  useState,
  // memo,
  // useRef
} from "react";
import {
  motion,
  AnimatePresence,
  // useAnimation,
  // useCycle,
  // useMotionValue,
} from "framer-motion";
import { useTodoState } from "contexts/Todo";
import { compareDesc, parse } from "date-fns";
import TaskItem from "components/List/TaskItem";
import ItemContainer from "components/List/TaskItemWrapper";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { useTodoDispatch } from "contexts/Todo";

// const variants = {
//   list: {
//     hidden: {
// opacity: 0,
// transition: {
//   when: "afterChildren",
// },
// transitionEnd: {
//   x: 0,
//   y: 0,
// },
// },
// visible: {
// opacity: 1,
// transition: {
//   when: "beforeChildren",
//   staggerChildren: 0.3,
// },
// transitionEnd: {
//   x: 0,
//   y: 0,
// },
//     },
//   },
// };

const List = ({ match, history }) => {
  const { todos } = useTodoState();
  const [isDragged, setDragged] = useState(false);

  return (
    <motion.ul
      // layout
      // initial="hidden"
      // animate="visible"
      // variants={variants.list}
      className="flex flex-col content-start"
    >
      {/* <AnimatePresence initial={false}> */}
      {todos
        .sort((a, b) => {
          return compareDesc(
            parse(a.created_at, "dd/MM/yyyy HH:mm:ss", new Date()),
            parse(b.created_at, "dd/MM/yyyy HH:mm:ss", new Date())
          );
        })
        .map((el) => {
          return (
            // <ItemContainer // <li><div>
            //   // layout
            //   key={el.id}
            //   isSelected={match.params.id === el.id}
            //   setDragged={setDragged}
            //   history={history}
            //   {...el}
            // >
            <TaskItem // <inner content>
              isSelected={match.params.id === el.id}
              history={history}
              isDragged={isDragged}
              // isExpanded={isExpanded}
              // setExpanded={setExpanded}
              {...el}
            />
            // </ItemContainer> // </div></li>
          );
        })}
      {/* </AnimatePresence> */}
    </motion.ul>
  );
};

// const TaskList = () => (
//   <Router>
//     <Route path={["/:id", "/"]} component={List} />
//   </Router>
// );

// export default TaskList;
