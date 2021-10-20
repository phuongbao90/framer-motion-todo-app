import {
  memo,
  // useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useTodoState } from "contexts/Todo";
import { compareDesc, parse } from "date-fns";
import { motion, useAnimation } from "framer-motion";
import { useTodoDispatch } from "contexts/Todo";
import TodoContent from "components/Todo/Content";
import { useHistory } from "react-router-dom";
import DeleteMessage from "components/Todo/DeleteMessage";

const ulVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      duration: 0.4,
      ease: [0.5, 0, 0.2, 1],
    },
  },
};

const liVariant = {
  show: () => {
    return {
      opacity: 1,
      scale: 1,
    };
  },
  hidden: () => {
    return {
      opacity: 0,
      scale: 0.7,
    };
  },
};

const StyledUl = styled(motion.ul)`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

// const StyledLi = styled.li`
const StyledLi = styled(motion.li)`
  padding-bottom: 0.5rem;
  /* background: green; */
`;

const Todo = memo(
  ({ id, isSelected = false, content, category, finished }) => {
    const dragControl = useAnimation();
    // const constraintsRef = useRef(null);
    const dispatch = useTodoDispatch();
    const [isDeleteMsgHidden, setDeleteMsgHidden] = useState(true);
    const [isDragging, setDragging] = useState(false);
    const history = useHistory();

    const handleDelete = async (id) => {
      await dispatch({
        type: "REMOVE",
        payload: {
          id: id,
        },
      });
    };

    const handleUndo = () => {
      setDeleteMsgHidden(true);
      dragControl.stop();
      return dragControl.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
        },
      });
    };

    // swipe to the left -> remove
    const handleDragEnd = async ({ info }) => {
      const offset = info.offset.x;
      const velocity = info.velocity.x;
      if (offset < -110 || velocity < -500) {
        await dragControl.start({
          x: "-300px",
          opacity: 0,
          transition: {
            duration: 0.6,
          },
        });
        return setDeleteMsgHidden(false);
      } else {
        await dragControl.start({
          x: "0px",
          opacity: 1,
          transition: {
            duration: 0.6,
          },
        });
      }
    };

    const onTap = () => {
      if (!isSelected) {
        // dispatch({ type: "SELECTED", payload: { id } });
        history.push(`/${id}`);
      }
    };

    return (
      <StyledLi
        layout // needed for child delay animation
        variants={liVariant}
        // ref={constraintsRef}
      >
        <motion.div
          layout // needed for remove animation
          className="drag-container cursor-pointer z-10"
          // className="drag-container cursor-pointer z-10 bg-purple-500"
          animate={dragControl}
          drag="x"
          // dragConstraints={constraintsRef} // cause problem when sidebar is open
          dragConstraints={{ left: 0, right: 0 }}
          dragDirectionLock
          onDragStart={() => setDragging(true)}
          onDragEnd={(event, info) => {
            handleDragEnd({ event, info });
            setDragging(false);
          }}
        >
          <TodoContent
            isSelected={isSelected}
            category={category}
            content={content}
            id={id}
            onTap={onTap}
            isDragging={isDragging}
            finished={finished}
          />
        </motion.div>
        <DeleteMessage
          handleUndo={handleUndo}
          isDeleteMsgHidden={isDeleteMsgHidden}
          handleDelete={handleDelete}
          id={id}
        />
      </StyledLi>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

const List = ({ selectedTodoId }) => {
  const { todos } = useTodoState();

  return (
    <>
      {todos && (
        <StyledUl
          layout
          data-layer="list"
          variants={ulVariant}
          animate="show"
          initial="hidden"
        >
          {todos
            .sort((a, b) => {
              return compareDesc(
                parse(a.created_at, "dd/MM/yyyy HH:mm:ss", new Date()),
                parse(b.created_at, "dd/MM/yyyy HH:mm:ss", new Date())
              );
            })
            .map((todo) => (
              <Todo
                key={todo.id}
                isSelected={todo.id === selectedTodoId}
                {...todo}
              />
            ))}
        </StyledUl>
      )}
    </>
  );
};

export default List;
