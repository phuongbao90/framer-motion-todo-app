import styled from "styled-components";
import { useEffect, memo, useRef, useState } from "react";
import {
  // AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import { useTodoDispatch } from "contexts/Todo";
import TodoContent from "components/Todo/Content";
import { VariantTodo } from "components/Todo/variants";
import {
  POPUP_OPEN_DURATION,
  POPUP_OPEN_DELAY,
  POPUP_CLOSE_DURATION,
  POPUP_CLOSE_DELAY,
} from "utils/CONSTANTS";
import DeleteMessage from "components/Todo/DeleteMessage";

const StyledDiv = styled(motion.div)``;
const StyledDragContainer = styled(motion.div)`
  background: ${(props) => props.theme.listBackground};
`;

// const Todo = memo(
const Todo = memo(
  ({ id, active, isSelected = false, content }) => {
    const breakPoint = -70;
    const controls = useAnimation();
    const containerRef = useRef(null);
    const listRef = useRef(null);
    const minHeight = useMotionValue(0);
    const dispatch = useTodoDispatch();
    const [shouldHidden, setHidden] = useState(false);
    const [isDragged, setIsDragged] = useState(false);

    const handleDelete = async (id) => {
      // console.log("run handleDelete");
      await dispatch({
        type: "remove",
        payload: {
          id: id,
        },
      });
      await controls.start("exit");
    };

    const handleUndo = (id) => {
      setHidden(false);
      dispatch({
        type: "undo",
        payload: {
          id: id,
        },
      });
      controls.stop();
      minHeight.set(containerRef.current.offsetHeight);
      return controls.start({
        x: 0,
        // y: 0,
        opacity: 1,
        height: "100%",
        transition: {
          duration: 0.6,
        },
        transitionEnd: {
          y: 0,
        },
      });
    };

    const handleDragEnd = async ({ event, info }) => {
      console.log("init handleDragEnd");
      if (info.offset.x < breakPoint) {
        // swipe to the left -> remove
        await controls.start({
          x: "-300px",
          opacity: 0,
          transition: {
            duration: 0.6,
          },
        });
        await setHidden(true);
        await minHeight.set(0);
        await handleDelete(id);
      }
    };

    // to persist selected todo height when expanding
    useEffect(() => {
      // minHeight.set(containerRef.current.offsetHeight);
      // console.log(containerRef);
      if (containerRef.current) {
        // console.log("run");
        minHeight.set(containerRef.current.offsetHeight || 74);
      }
      // console.log(minHeight.get());
    }, [containerRef]);

    return (
      <>
        <motion.li
          ref={containerRef}
          className={`list-item StyledLi flex flex-col justify-center`}
          style={{
            minHeight: shouldHidden ? 0 : minHeight.get(),
          }}
        >
          <StyledDiv
            layout
            initial={false}
            className={`list-item-content-container w-full h-full
            ${
              isSelected
                ? "fixed top-0 left-0 right-0 overflow-hidden"
                : "relative"
            }
            `}
            // className={`list-item-content-container w-full h-full relative`}
            animate={{
              zIndex: isSelected ? 10 : 0,
              marginBottom: shouldHidden ? "0px" : "12px",
            }}
            transition={{
              duration: isSelected ? POPUP_OPEN_DURATION : POPUP_CLOSE_DURATION,
              delay: isSelected ? POPUP_OPEN_DELAY : POPUP_CLOSE_DELAY,
              marginBottom: {
                delay: 3,
              },
              zIndex: {
                delay: isSelected ? 0 : 1,
              },
            }}
          >
            <StyledDragContainer
              layout
              initial="initial"
              ref={listRef}
              className={`list-item-content drag-wrapper w-full h-full overflow-hidden  ${
                isSelected
                  ? "rounded-none transform-none"
                  : "rounded-xl transform"
              }
              `}
              animate={controls}
              variants={VariantTodo}
              drag={isSelected ? false : "x"} //! breaking cause
              // drag={"x"} //! breaking cause
              dragDirectionLock
              onDragEnd={(event, info) => {
                handleDragEnd({ event, info });
                setIsDragged(false);
              }}
              dragConstraints={{ top: 0, bottom: 0, right: 0, left: 0 }}
              transition={{
                type: "tween",
                delay: isSelected ? 0 : 0.2,
              }}
            >
              {/* <div className="tap-wrapper"> */}
              <TodoContent
                isSelected={isSelected}
                content={content}
                id={id}
                isDragged={isDragged}
              />
              {/* </div> */}
            </StyledDragContainer>

            <DeleteMessage
              id={id}
              active={active}
              handleUndo={handleUndo}
              shouldHidden={shouldHidden}
            />
          </StyledDiv>
        </motion.li>
      </>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

export default Todo;
