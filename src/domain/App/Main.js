import Navigation from "components/Navigation";
import Carousel from "components/Category/Carousel";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import { useSidebar } from "contexts/Sidebar";
import List from "components/Todo/List";
import Item from "components/Todo/Item";
import {
  useState,
  // useRef,
  // useReducer,
  useEffect,
} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateNewTodoButton from "components/Button/CreateNewTodoButton";
import { useTodoState } from "contexts/Todo";
import { v4 as uuidv4 } from "uuid";
import { useTodoDispatch } from "contexts/Todo";
import breakpoints from "utils/breakpoints";
import { useIsSmall } from "hooks/useMediaQuery";

const variants = {
  container: {
    visible: {
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
      transitionEnd: {
        x: 0,
        y: 0,
      },
    },
    hidden: ({ isSmall }) => ({
      scale: 0.87,
      x: "70%",
      borderRadius: isSmall && "2.5rem",
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
      transitionEnd: {},
    }),
  },
};

const StyledContent = styled(motion.main)`
  background: ${({ theme }) => theme.background};
  z-index: 1;
  overflow-y: scroll;
  scrollbar-width: none;

  h1 {
    color: ${({ theme }) => theme.textColorPrimary};
  }

  h5 {
    color: ${({ theme }) => theme.textColorSecondaryLight};
  }
  grid-area: 1/1;

  /* -------------------------------------------------------------------------- */
  height: 100vh;

  @media only screen and ${breakpoints.device.xs} {
    border-radius: 2.5rem;
    height: 100%;
    max-height: 100vh;
  }
`;

const Store = ({ match }) => {
  let { id: selectedTodoId } = match.params;
  const dispatch = useTodoDispatch();
  const { selectedTodo } = useTodoState();

  useEffect(() => {
    if (selectedTodoId) {
      dispatch({ type: "FIND", payload: { id: selectedTodoId } });
    }
  }, [selectedTodoId, dispatch]);

  return (
    <>
      <List selectedTodoId={selectedTodoId} />
      <AnimatePresence>
        {selectedTodoId && selectedTodo && (
          <Item id={selectedTodoId} selectedTodo={selectedTodo} key="item" />
        )}
      </AnimatePresence>
    </>
  );
};

const CreateNewTodo = () => {
  const [isCreating, setCreating] = useState(false);
  const dummyId = uuidv4();
  return (
    <>
      <CreateNewTodoButton setCreating={setCreating} />
      <AnimatePresence>
        {isCreating && (
          <Item
            key="item"
            isEditing={false}
            setCreating={setCreating}
            isCreating={isCreating}
            id={dummyId}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Main = () => {
  const { isSidebarOpen, toggleIsSidebarOpen } = useSidebar();
  const isSmall = useIsSmall();
  // const initialDataView = {
  //   viewType: "list",
  // };
  // const [viewState, dataViewDispatch] = useReducer(reducer, initialDataView);
  // const viewRef = useRef(null);

  // function reducer(viewState, action) {
  //   switch (action.type) {
  //     case "list":
  //       return { ...viewState, viewType: "list" };
  //     case "edit":
  //       return { ...viewState, viewType: "edit" };
  //     case "reset":
  //       return { ...viewState, viewType: "list" };
  //     default:
  //       throw new Error();
  //   }
  // }

  return (
    <StyledContent
      className={`content-wrapper layer ${!isSidebarOpen && ""}`}
      initial="visible"
      animate={isSidebarOpen ? "hidden" : "visible"}
      variants={variants.container}
      {...(isSidebarOpen && {
        onClick: () => toggleIsSidebarOpen(),
      })}
      custom={{
        isSmall,
      }}
    >
      <AnimateSharedLayout type="crossfade">
        <div
          className="layer content h-full overflow-y-scroll relative"
          data-layer="list"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <Navigation />

          <div className="pl-8">
            <div className="my-6">
              <h1 className="text-3xl font-bold">What's up, Olivia!</h1>
            </div>
            <section className="">
              <h5 className="uppercase font-semibold mb-6 text-sm">
                categories
              </h5>
              <Carousel />
            </section>

            <section className="pr-8 pb-12">
              <h5 className="uppercase font-semibold mb-6 text-sm">
                Today's tasks
              </h5>

              <Router>
                <Route path={["/:id", "/"]} component={Store} />
              </Router>
            </section>
          </div>

          <Router>
            <Route path={["/:id", "/"]} component={CreateNewTodo} />
          </Router>
        </div>
      </AnimateSharedLayout>
    </StyledContent>
  );
};

export default Main;

/* -------------------------------------------------------------------------- */

/* <Router>
          <Route
            path={["/:id", "/"]}
            dataViewDispatch={dataViewDispatch}
            render={(props) => (
              <AnimatePresence layoutId={selectedId}>
                {selectedId && (
                  <Edit {...props} dataViewDispatch={dataViewDispatch} />
                )}
              </AnimatePresence>
            )}
          />
        </Router> */
