// import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useTodoState } from "contexts/Todo";
import { compareDesc, parse } from "date-fns";
import DeleteMessage from "components/List/DeleteMessage";
import TaskItem from "components/List/TaskItem";
import TaskItemWrapper from "components/List/TaskItemWrapper";
import { useTodoDispatch } from "contexts/Todo";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";

const StyledListItem = styled(motion.li)`
  background: ${(props) => props.theme.listBackground};
`;

const variants = {
  list: {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  },
  item: {
    // removed- make the whole list hidden if any list was removed when sidebar is open
    //TODO further investigation needed
    // cause: auto apply hidden when sidebar is opened
    // temporaty fix: force initial state & removed hidden state
    // hidden: { opacity: 0, y: -100, x: 0 },
    initial: () => {
      console.log("run initial in item");
      return {
        // background: "transparent",
        opacity: 0,
        y: 0,
        zIndex: 2,
        position: "relative",
        transition: {},
      };
    },
    visible: () => {
      console.log("run visble in item");
      return {
        background: "transparent",
        opacity: 1,
        y: 0,
        x: 0,
        zIndex: 2,
        scale: 1,
        transition: {
          // duration: 2,
          // delay: 1,
        },
      };
    },
    exit: ({ active }) => {
      if (!active) {
        console.log("run exit in item");
        return {
          opacity: 0,
          height: 0,
          marginBottom: "0px",
          transition: {
            opacity: {
              delay: 2,
            },
            height: {
              delay: 2.2,
            },
            marginBottom: {
              delay: 2.2,
            },
          },
          transitionEnd: {
            display: "none",
          },
        };
      }
    },
  },
};

const Lists = () => {
  const { todos } = useTodoState();
  const itemControls = useAnimation();

  const dispatch = useTodoDispatch();

  // skip first rendering
  useDidUpdateEffect(() => {
    const sequence = async () => {
      return await itemControls.start(({ active, index }) => {
        console.log("run sequence in item");

        if (active && index === 0) {
          console.log("should run only 1");
          return {
            top: ["-100vh", "-5vh", "0vh"],
            opacity: [1, 1, 1],
            paddingBottom: ["100vh", "5vh", "0vh"],
            paddingTop: ["100vh", "5vh", "0vh"],
            paddingLeft: ["5vw", "5vw", "0vw"],
            paddingRight: ["5vw", "5vw", "0vw"],
            marginLeft: ["-5vw", "-5vw", "0vw"],
            marginRight: ["-5vw", "-5vw", "0vw"],
            borderRadius: ["0px", "0px", "18px"],
            zIndex: 4,
            transition: {
              ease: "easeInOut",
              duration: 1.4,
            },
            transitionEnd: {
              zIndex: 2,
              background: "transparent",
            },
          };
        }

        if (active) {
          return {
            y: 0,
            height: "auto",
            zIndex: 1,
            transition: {
              delay: 2,
            },
            transitionEnd: {
              opacity: 1,
              background: "transparent",
            },
          };
        }
      });
    };

    sequence();
  }, [todos.length]);

  const handleDelete = (id) => {
    dispatch({
      type: "remove",
      payload: {
        id: id,
      },
    });

    itemControls.start("exit");
  };

  const handleUndo = (id) => {
    dispatch({
      type: "undo",
      payload: {
        id: id,
      },
    });
    itemControls.stop();
    // return itemControls.start("visible");
  };

  return (
    <motion.ul initial="hidden" animate="visible" variants={variants.list}>
      <AnimatePresence initial={false}>
        {todos
          .sort((a, b) => {
            return compareDesc(
              parse(a.created_at, "dd/MM/yyyy HH:mm:ss", new Date()),
              parse(b.created_at, "dd/MM/yyyy HH:mm:ss", new Date())
            );
          })
          .map((el, i) => {
            return (
              <StyledListItem
                key={el.id}
                layout
                className="relative"
                // initial="hidden" // removed due to error
                variants={variants.item}
                animate={itemControls}
                custom={{
                  active: el.active,
                  index: i,
                }}
                style={{
                  marginBottom: "8px",
                  zIndex: 2,
                  borderRadius: "18px",
                }}
                initial="initial"
              >
                <TaskItemWrapper
                  id={el.id}
                  handleDelete={handleDelete}
                  active={el.active}
                >
                  <TaskItem
                    content={el.content}
                    category={el.category}
                    created_at={el.created_at}
                  />
                </TaskItemWrapper>
                <DeleteMessage
                  handleUndo={handleUndo}
                  id={el.id}
                  active={el.active}
                />
              </StyledListItem>
            );
          })}
      </AnimatePresence>
    </motion.ul>
  );
};

export default Lists;
