import Navigation from "components/Navigation";
import AddTodoButton from "components/Button/AddTodoButton";
import Carousel from "components/Category/Carousel";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useSidebar } from "contexts/Sidebar";
import Lists from "components/List/index";
// import { useTodoDispatch } from "contexts/Todo";
// import { format, add } from "date-fns";
// import { v4 as uuidv4 } from "uuid";

const StyledContent = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.background};
  border-radius: 30px;
  z-index: 2;
  h1 {
    color: ${({ theme }) => theme.textColorPrimary};
  }

  h5 {
    color: ${({ theme }) => theme.textColorSecondaryLight};
  }
`;

const variants = {
  container: {
    visible: {
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    hidden: {
      scale: 0.87,
      x: "70%",
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  },
};

const Content = ({ toggleIsAddTodoOpen }) => {
  const { isSidebarOpen, toggleIsSidebarOpen } = useSidebar();
  // const dispatch = useTodoDispatch();

  return (
    <StyledContent
      className={`content-wrapper ${!isSidebarOpen && ""}`}
      initial="visible"
      animate={isSidebarOpen ? "hidden" : "visible"}
      variants={variants.container}
      layoutTransition
      {...(isSidebarOpen && {
        onClick: () => toggleIsSidebarOpen(),
      })}
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <div
        className="content h-full overflow-y-scroll"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <Navigation />

        <main className="pl-6 mt-20">
          <div className="my-6">
            <h1 className="text-3xl font-bold">What's up, Olivia!</h1>
          </div>
          <section className="mb-10">
            <h5 className="uppercase font-semibold mb-6 text-sm">categories</h5>
            <Carousel />
          </section>

          <section className="pr-6">
            <h5 className="uppercase font-semibold mb-6 text-sm">
              Today's tasks
            </h5>
            {/* <button
              className="mb-10 z-50"
              onClick={() =>
                dispatch({
                  type: "add",
                  payload: {
                    id: uuidv4(),
                    category: "business",
                    dueDate: format(
                      add(new Date(), { days: 7 }),
                      "dd/MM/yyyy HH:mm:ss"
                    ),
                    content: `testing ${format(
                      new Date(),
                      "dd/MM/yyyy HH:mm:ss"
                    )}`,
                    created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
                    finished: false,
                    active: true,
                  },
                })
              }
            >
              Add
            </button> */}

            <Lists />
          </section>
        </main>
        <AddTodoButton toggleIsAddTodoOpen={toggleIsAddTodoOpen} />
      </div>
    </StyledContent>
  );
};

export default Content;
