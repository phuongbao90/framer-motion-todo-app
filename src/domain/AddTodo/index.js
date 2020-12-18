import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiX, FiChevronUp, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { BiRadioCircleMarked } from "react-icons/bi";
import { useTodoDispatch } from "contexts/Todo";
import { format, add } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const StyledContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const StyledExitButton = styled(motion.button)`
  position: absolute;
  top: 5%;
  right: 10%;
  border: 1.5px solid ${({ theme }) => theme.sidebarIconColor};
  border-radius: 50%;
  color: ${({ theme }) => theme.iconColor};
  padding: 9px;

  &:active,
  &:focus {
    outline: none;
  }
`;
const StyledAddTodoForm = styled(motion.form)`
  width: 100%;
  height: 100%;
  z-index: 9;

  .wrapper {
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    z-index: 9;
    color: ${({ theme }) => theme.textColorSecondaryDark};
  }

  input {
    width: 80%;
    background: transparent;
    font-size: 20px;
    outline: none;
  }

  .rounded-full {
    padding: 0.25rem;

    svg {
      font-size: 2rem;
    }
  }
`;
const StyledAddTodoButton = styled(motion.button)`
  position: absolute;
  bottom: 5%;
  right: 10%;
  display: flex;
  align-items: center;
  padding: 11px 24px;
  background: ${({ theme }) => theme.buttonBackground};
  box-shadow: 0 0 5px ${({ theme }) => theme.buttonBackground},
    0 0 10px ${({ theme }) => theme.buttonBackground};
  color: white;
  border-radius: 20px;

  &:active,
  &:focus {
    outline: none;
  }
`;
const StyledPopupBackground = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  background: ${({ theme }) => theme.listBackground};
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 18px;
  border-radius: 50%;
  overflow: hidden;
`;

const variants = {
  container: {
    visible: {
      opacity: 1,
      zIndex: 9,
    },
    hidden: {
      zIndex: 0,
      opacity: 0,
      transition: {
        delay: 1,
        // delay: 1.2,
      },
    },
  },
  exitButton: {
    visible: {
      opacity: 1,
      y: "0px",
      zIndex: 9,
      transition: {
        delay: 0.4,
        duration: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
      y: "-20px",
    },
  },
  form: {
    visible: {
      opacity: 1,
      zIndex: 9,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      zIndex: 0,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
    collapsed: {
      opacity: 0,
      zIndex: 0,
      transition: {
        duration: 0,
      },
    },
  },
  addTodoButton: {
    visible: {
      opacity: 1,
      y: "0px",
      zIndex: 9,
      transition: {
        delay: 0.4,
        duration: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      zIndex: 0,
      transition: {
        duration: 0.3,
      },
      y: "-40px",
    },
  },
  popupBackground: {
    visible: () => {
      console.log("run visible");
      return {
        display: "block",
        width: 0,
        height: 0,
        scale: 50,

        zIndex: 8,
        opacity: 1,
        transition: {
          ease: [0.5, 1, 0.89, 1],
          duration: 0.5,
        },
      };
    },
    hidden: () => {
      console.log("run hidden");
      return {
        scale: 1,

        left: "50%",
        transform: "translate(-50%, 0%)",

        padding: "18px 18px",
        borderRadius: "50%",
        overflow: "hidden",
        transition: {
          ease: [0.5, 1, 0.89, 1],
          duration: 0.4,
          delay: 0.7,
        },
        transitionEnd: {},
      };
    },
    collapsed: () => {
      console.log("run collapsed");
      return {
        scale: 1,

        transition: {
          duration: 0,
        },
        transitionEnd: {
          display: "none",
        },
      };
    },
  },
};

const AddTodo = ({ isAddTodoOpen, toggleIsAddTodoOpen }) => {
  const [isNewTodoAdded, setIsNewTodoAdded] = useState(false);
  const [
    { content, category, dueDate, created_at, active, finished },
    setTodo,
  ] = useState({
    content: "testing 123",
    category: "business",
    dueDate: format(add(new Date(), { days: 7 }), "dd/MM/yyyy HH:mm:ss"),
    created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
    active: true,
    finished: false,
  });
  const dispatch = useTodoDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim().length >= 3) {
      setIsNewTodoAdded((prev) => !prev);
      dispatch({
        type: "add",
        payload: {
          id: uuidv4(),
          content: content,
          category: "business",
          dueDate: format(add(new Date(), { days: 7 }), "dd/MM/yyyy HH:mm:ss"),
          created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
          active: true,
          finished: false,
        },
      });

      toggleIsAddTodoOpen();
      setTodo({
        content: "testing 123",
      });
    }
  };

  useEffect(() => {
    if (isAddTodoOpen === true) {
      setIsNewTodoAdded(() => false);
    }
  }, [isAddTodoOpen]);

  const handleChange = (e) => {
    // e.target.name = e.target.value;
    setTodo({
      content: e.target.value,
    });
  };

  return (
    <StyledContainer
      initial="hidden"
      animate={isAddTodoOpen ? "visible" : "hidden"}
      variants={variants.container}
    >
      <StyledExitButton
        initial="hidden"
        animate={isAddTodoOpen ? "visible" : "hidden"}
        variants={variants.exitButton}
        onClick={() => toggleIsAddTodoOpen()}
      >
        <FiX className="text-2xl" />
      </StyledExitButton>
      <StyledAddTodoForm
        initial="hidden"
        animate={
          isAddTodoOpen ? "visible" : isNewTodoAdded ? "collapsed" : "hidden"
        }
        variants={variants.form}
        onSubmit={handleSubmit}
      >
        <div className="wrapper">
          <div>
            <input
              value={content}
              type="text"
              placeholder="Enter new task"
              name="content"
              onChange={handleChange}
              required
              minLength="3"
            />
          </div>
          <div className="flex items-center justify-center mt-12">
            <span className="flex items-center px-4 py-2 border-gray-500 border-2 rounded-3xl mr-3">
              <span className="mr-3">
                <FiCalendar />
              </span>
              <span>Today</span>
            </span>
            <span className="p-2 border-gray-500 border-2 rounded-full">
              <BiRadioCircleMarked className="text-2xl" />
            </span>
          </div>
        </div>
        <div>
          <StyledAddTodoButton
            type="submit"
            initial="hidden"
            animate={isAddTodoOpen ? "visible" : "hidden"}
            variants={variants.addTodoButton}
          >
            <span className="mr-3 text-sm">New task</span>
            <span>
              <FiChevronUp />
            </span>
          </StyledAddTodoButton>
        </div>
      </StyledAddTodoForm>
      <StyledPopupBackground
        initial="hidden"
        animate={
          isAddTodoOpen ? "visible" : isNewTodoAdded ? "collapsed" : "hidden"
        }
        variants={variants.popupBackground}
      />
    </StyledContainer>
  );
};

export default AddTodo;
