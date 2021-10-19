import styled from "styled-components";
import { useEffect, memo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  // AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import { useTodoDispatch } from "contexts/Todo";
import TodoContent from "components/Todo/Content";
// import { VariantTodo } from "components/Todo/variants";
// import {
//   POPUP_OPEN_DURATION,
//   POPUP_OPEN_DELAY,
//   POPUP_CLOSE_DURATION,
//   POPUP_CLOSE_DELAY,
// } from "utils/CONSTANTS";
// import DeleteMessage from "components/Todo/DeleteMessage";

// const StyledDiv = styled(motion.div)``;
// const StyledDragContainer = styled(motion.div)`
//   background: ${(props) => props.theme.listBackground};
// `;

const StyledLi = styled(motion.li)`
  border-radius: 0.4rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
`;

const variant = {
  // default: () => {
  //   console.log("default state");
  //   return {
  //     position: "relative",
  //     background: "green",
  //     color: "black",
  //   };
  // },
  // expanded: () => {
  //   console.log("expand state");
  //   return {
  //     position: "fixed",
  //     top: 0,
  //     left: 0,
  //     right: 0,
  //     height: "100%",
  //     zIndex: 30,
  //   };
  // },
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

const Item = memo(
  ({ id, isSelected = false, content, dataViewDispatch, setSelectedId }) => {
    const breakPoint = -70;
    const controls = useAnimation();
    const dragRef = useRef(null);
    // const tapDiv = useRef(null);
    // const tapControl = useAnimation();
    // const listRef = useRef(null);
    const minHeight = useMotionValue(0);
    const dispatch = useTodoDispatch();
    const [shouldHidden, setHidden] = useState(false);
    const [isDragged, setIsDragged] = useState(false);
    const history = useHistory();

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
      minHeight.set(dragRef.current.offsetHeight);
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
      // minHeight.set(dragRef.current.offsetHeight);
      // console.log(dragRef);
      if (dragRef.current) {
        // console.log("run");
        minHeight.set(dragRef.current.offsetHeight || 74);
      }
      // console.log(minHeight.get());
    }, [dragRef]);

    const onTap = (event, info) => {
      console.log(isSelected);
      if (!isSelected) {
        history.push(`/${id}`);
        setSelectedId(id);
        // dataViewDispatch({ type: "edit" });
        // tapControl.start("expanded");
        // dispatch({
        //   type: "SELECTED",
        //   payload: {
        //     id: id,
        //   },
        // });
      } else {
        // tapControl.start("default");
      }
    };

    const onDrag = (event, info) => {
      console.log("Drag");
    };

    // useEffect(() => {
    //   console.log(isSelected);
    // }, [isSelected]);

    return (
      <StyledLi
        // layout
        // className="tap-container z-20 w-full"
        className=""
        variants={variant}
        // initial="initial"
        // animate="show"
        // animate={isSelected ? "expanded" : "default"}
        // ref={tapDiv}
        // animate={tapControl}
        // onTap={onTap}

        // className={`tap-container z-20 h-full w-full ${
        //   isSelected ? "fixed top-0 left-0 right-0 bg-red-400" : "relative"
        // }`}
      >
        <motion.div
          // className="drag-container w-full h-full cursor-pointer z-30"
          className="drag-container cursor-pointer z-30"
          ref={dragRef}
          drag="x"
          onDrag={onDrag}
          // onDragEnd={(event, info) => {}}
          dragConstraints={{ right: 0, left: 0 }}
          transition={{
            type: "tween",
            delay: isSelected ? 0 : 0.2,
          }}
          style={
            {
              // minHeight: "30px",
            }
          }
        >
          <TodoContent
            content={content}
            id={id}
            dataViewDispatch={dataViewDispatch}
            onTap={onTap}
          />
        </motion.div>
      </StyledLi>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

export default Item;
