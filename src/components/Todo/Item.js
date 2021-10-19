import React from "react";
import CloseButton from "components/Todo/CloseButton";
import Options from "components/Todo/Options";
import UpdateTaskButton from "components/Todo/UpdateTaskButton";
import styled, { css } from "styled-components";
import { motion, useCycle } from "framer-motion";
import { FiFolderPlus, FiFlag, FiMoon } from "react-icons/fi";
import {
  ITEM_MAIN_TRANSITION_DURATION,
  ITEM_INNER_TRANSITION_DURATION,
} from "utils/CONSTANTS";
import TextareaAutosize from "react-autosize-textarea";
import { useState } from "react";

const Overlay = styled(motion.div).attrs(({ variants: overlay }) => {
  // return {
  //   initial: "hidden",
  //   overlay,
  // };
})`
  /* background: ${({ theme }) => theme.listBackground}; */

  ${({ current }) => {
    if (current) {
      return css`
        background: transparent;
      `;
    }

    if (!current) {
      // console.log("overlay 3");
      return css`
        background: ${({ theme }) => theme.listBackground};
      `;
    }
  }}
`;

// const Container = styled.div`
// const Container = styled(motion.div)`
//   opacity: 1;
//   z-index: 999;
//   border-radius: 2.5rem;
//   overflow: hidden;
//   position: fixed;
//   top: calc((100% - 48.75rem) / 2);
//   bottom: calc((100% - 48.75rem) / 2);
//   left: calc((100% - 25rem) / 2);
//   right: calc((100% - 25rem) / 2);
//   display: block;
//   width: 100%;
//   height: 100%;
//   max-width: 25rem;
//   max-height: 48.75rem;
// `;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background: transparent; */
  /* background: ${({ theme }) => theme.listBackground}; */
  color: ${({ theme }) => theme.textColorPrimary};
  padding: 2rem;
  z-index: 30;

  /* -------------------------------------------------------------------------- */
  position: fixed;
  top: calc((100% - 48.75rem) / 2);
  bottom: calc((100% - 48.75rem) / 2);
  right: calc((100% - 25rem) / 2);
  left: calc((100% - 25rem) / 2);
  max-width: 25rem;
  max-height: 48.75rem;
  border-radius: 2.5rem;

  ${({ isCreating, current }) => {
    if (!isCreating) {
      // console.log("content 1");
      return css`
        background: ${({ theme }) => theme.listBackground};
      `;
    }

    if (isCreating && !current) {
      // console.log("content 2");
      return css`
        background: transparent;
      `;
    }

    if (isCreating && current) {
      // console.log("content 3");
      return css`
        background: ${({ theme }) => theme.listBackground};
      `;
    }
  }}
`;

const variants = {
  main: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      // transition: {},
    },
    exit: {
      opacity: 0,
    },
  },

  actions: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: ITEM_INNER_TRANSITION_DURATION,
        delay: ITEM_MAIN_TRANSITION_DURATION + 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: ITEM_INNER_TRANSITION_DURATION,
        delay: 0,
      },
    },
  },
  overlay: {
    visible: ({ isCreating }) => {
      // console.log("run visible");
      if (isCreating) {
        return {
          scale: 40,
          transition: {
            ease: [0.5, 1, 0.89, 1],
            duration: 0.4,
          },
          transitionEnd: {
            opacity: 1,
            zIndex: 30,
          },
        };
      }
    },
    hidden: ({ isCreating }) => {
      // console.log("run hidden");
      return {
        opacity: 1,
        zIndex: 40,
        position: "absolute",
        right: "1.5rem",
        bottom: "1.5rem",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        // transitionEnd: {},
      };
    },
    collapsed: () => {
      console.log("run collapsed");
      return {
        scale: 1,
        transition: {
          duration: 0,
        },
      };
    },
  },
};

const Textwrapper = styled(motion.div)`
  position: absolute;
  top: 25%;
  width: 80%;
`;

const Actions = styled(motion.div)`
  position: absolute;
  top: 66%;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  justify-content: center;
`;

const Item = ({
  id,
  selectedTodo: todo,
  isEditing = true,
  setCreating,
  isCreating,
}) => {
  const [content, setContent] = useState(todo ? todo.content : "");
  // track background states of <Overlay /> and <Content />
  // if one has a background, the other must be transparent
  const [current, cycleCurrent] = useCycle(false, true);
  const handleUpdate = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Overlay
        initial="hidden"
        animate={isCreating ? "visible" : "hidden"}
        className="overlay z-40"
        variants={variants.overlay}
        custom={{
          isCreating,
        }}
        current={current}
      />
      <Content
        style={{ pointerEvents: "auto" }}
        layoutId={`todo-container-${id}`}
        isCreating={isCreating}
        current={current}
        onLayoutAnimationComplete={() => {
          console.log("onLayoutAnimationComplete");
          !current && cycleCurrent();
        }}
      >
        <CloseButton
          variants={variants}
          setCreating={setCreating}
          isCreating={isCreating}
        />
        <Textwrapper layoutId={`content-container-${id}`}>
          <TextareaAutosize
            className="w-full outline-none bg-transparent z-0 cursor-pointer text-2xl overflow-auto"
            value={content}
            autoFocus
            onChange={handleUpdate}
            style={{
              maxHeight: "135px",
              scrollbarWidth: "none",
            }}
            spellCheck="false"
          />
        </Textwrapper>
        <Options variants={variants} category={todo && todo.category} />
        <Actions
          initial={variants.actions.initial}
          animate={variants.actions.animate}
          exit={variants.actions.exit}
          className="text-2xl space-x-12 text-gray-800"
        >
          <FiFolderPlus className="text-gray-500 cursor-pointer" />
          <FiFlag className="text-gray-500 cursor-pointer" />
          <FiMoon className="text-gray-500 cursor-pointer" />
        </Actions>
        <UpdateTaskButton
          variants={variants}
          id={id}
          content={content}
          isEditing={isEditing}
          setCreating={setCreating}
        />
      </Content>
    </>
  );
};

export default Item;
