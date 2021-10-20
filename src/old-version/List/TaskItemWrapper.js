import styled from "styled-components";
import {
  useEffect,
  memo,
  // useState,
  useRef,
} from "react";
// import { Link, useHistory } from "react-router-dom";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useTodoDispatch } from "contexts/Todo";

const StyledLi = styled(motion.li)`
  position: relative;
  /* background: ${(props) => props.theme.listBackground}; */
  margin-bottom: 8px;
`;

const StyledContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  pointer-events: none;
  background: red;

  ${({ isSelected }) =>
    isSelected &&
    `
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 9999;
    overflow: hidden;
    padding: 40px 0;
  `}
`;

const variants = {
  item: {
    initial: () => {
      console.log("run initial in item");
      return {
        background: "red",
        opacity: 0,
        y: 0,
        zIndex: 2,
        position: "relative",
        transition: {},
      };
    },
    collapsed: () => {
      console.log("initialize collapsed state");
      return {
        // background: "transparent",
        position: "relative",
        borderRadius: "18px",
        background: "yellow",
        opacity: 1,
        y: 0,
        x: 0,
        zIndex: 2,
        scale: 1,
        transition: {
          duration: 0.4,
        },
      };
    },

    exit: ({ active }) => {
      console.log("initialize exit state");
      if (!active) {
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
  content: {
    initial: () => {
      return {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "block",
        pointerEvents: "none",
      };
    },
    expanded: () => {
      console.log("initialize expanded state");
      return {
        position: "fixed",
        background: "red",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        overflow: "hidden",
        transition: {
          // duration: 0.4,
          // delay: 0.4,
          duration: 3,
        },
      };
    },
  },
};

const ItemContainer = memo(
  ({
    children,
    // handleDelete,
    id,
    active,
    isSelected = false,
    // setDragged = false,
  }) => {
    const breakPoint = -70;
    const controls = useAnimation();
    const contentAnimationControl = useAnimation();
    const containerRef = useRef(null);
    // const liRef = useRef(null);
    const dispatch = useTodoDispatch();
    // const history = useHistory();
    const zIndex = useMotionValue(isSelected ? 99 : 0);

    function checkZIndex() {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected) {
        zIndex.set(0);
      }
    }

    const handleDelete = (id) => {
      console.log("run handleDelete");
      dispatch({
        type: "remove",
        payload: {
          id: id,
        },
      });
      controls.start("exit");
    };

    // const handleUndo = (id) => {
    //   dispatch({
    //     type: "undo",
    //     payload: {
    //       id: id,
    //     },
    //   });
    //   controls.stop();
    //   // return controls.start("visible");
    // };

    const handleExpand = () => {
      // controls.start("expanded");
      contentAnimationControl.start("expanded");
    };

    const handleDragEnd = async ({ event, info }) => {
      if (info.offset.x < breakPoint) {
        // swipe to the left -> remove
        await controls.start({
          x: "-300px",
          opacity: 0,
          transition: {
            duration: 0.6,
          },
        });

        await handleDelete(id);
      } else {
        // return to initial position
        await controls.start({
          x: "0px",
          opacity: 1,
          transition: {
            duration: 0.6,
          },
        });
      }
    };

    useEffect(() => {
      if (active) {
        controls.start({
          x: "0px",
          opacity: 1,
          transition: {
            duration: 0.6,
          },
        });
      }
    }, [active]);

    return (
      <>
        <StyledLi
          // layout
          ref={containerRef}
          className={`StyledLi relative z-20 ${isSelected && "open"}`}
          animate={controls}
          variants={variants.item}
          drag={isSelected ? false : "x"}
          dragDirectionLock
          initial="initial"
          onDragEnd={(event, info) => {
            console.log("run onDragEnd");
            handleDragEnd({ event, info });
          }}
          dragConstraints={{ top: 0, bottom: 0 }}
          isSelected={isSelected}
          custom={{
            active: active,
            isSelected,
          }}
        >
          <StyledContainer
            layout
            className="StyledContainer"
            transition={{ duration: 2 }}
            variants={variants.content}
            initial="initial"
            animate={contentAnimationControl}
            onTap={() => {
              console.log("run onTap");
              handleExpand();
            }}
          >
            {children}
          </StyledContainer>
          {/* {!isSelected && (
            <Link
              to={id}
              className={`card-open-link`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          )} */}
        </StyledLi>
      </>
    );
  }
);

export default ItemContainer;
