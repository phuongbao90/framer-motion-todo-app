import {
  BUTTONS_SLIDE_DURATION,
  BUTTONS_SLIDE_DELAY,
  POPUP_OPEN_DURATION,
  POPUP_OPEN_DELAY,
  POPUP_CLOSE_DURATION,
  POPUP_CLOSE_DELAY,
} from "utils/CONSTANTS";

export const VariantList = {
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
};

export const VariantContentContainer = {
  initial: () => {
    console.log("initialize initial state VariantContentContainer");
    return {
      // position: "relative",
      // background: "yellow",
      height: "100%",
      width: "100%",
    };
  },
  expanded: () => {
    console.log("initialize expanded state VariantContentContainer");
    return {
      position: "fixed",
      // inset: "0 0 auto",
      top: 0,
      left: 0,
      right: 0,
      // bottom: 0,
      height: "100%",
      width: "100%",
      overflow: "hidden",
      background: "red",
      zIndex: 10,

      transition: {
        duration: POPUP_OPEN_DURATION,
        delay: POPUP_OPEN_DELAY,
        // delay: 0,
      },
    };
  },
  collapsed: () => {
    console.log("initialize collapsed state VariantContentContainer");
    return {
      top: "100%",
      background: "blue",
      zIndex: 0,
      overflow: "hidden",
      transition: {
        duration: POPUP_CLOSE_DURATION,
        delay: POPUP_CLOSE_DELAY,
        // delay: 0,
      },
      transitionEnd: {
        position: "relative",
        x: 0,
        y: 0,
      },
    };
  },
};

export const VariantTodo = {
  // initial: () => {
  //   console.log("run initial in item VariantTodo");
  //   return {
  //     // borderRadius: "15px",
  //     transition: {},
  //   };
  // },
  // expanded: () => {
  //   console.log("initialize expanded state VariantTodo");
  //   return {};
  // },
  // collapsed: () => {
  //   console.log("initialize collapsed state VariantTodo");
  //   return {};
  // },
  exit: () => {
    console.log("initialize exit state VariantTodo");
    // if (!active) {
    return {
      opacity: 0,
      height: 0,
      // marginBottom: "0px",
      transition: {
        opacity: {
          delay: 3,
          // delay: 0,
        },
        height: {
          delay: 3,
          // delay: 0,
        },
        marginBottom: {
          delay: 2.2,
        },
      },
      transitionEnd: {
        display: "none",
      },
      // };
    };
  },
};

export const VariantContent = {};
export const VariantNewTaskButton = {
  visible: ({ isSelected }) => {
    // console.log(isSelected);
    if (isSelected) {
      // console.log("visible state");
      return {
        // y: [-20, 0],
        opacity: [0, 1],
        display: "flex",
        transition: {
          duration: BUTTONS_SLIDE_DURATION,
          delay: BUTTONS_SLIDE_DELAY,
        },
      };
    }
  },
  hidden: () => {
    return {
      opacity: 0,
      // y: "-20px",
      display: "none",
      transition: {
        duration: 0,
        delay: 0,
      },
    };
  },
};

export const VariantCloseButton = {
  visible: ({ isSelected }) => {
    if (isSelected) {
      return {
        opacity: 1,
        y: 0,
        zIndex: 9,
        display: "block",
        transition: {
          delay: BUTTONS_SLIDE_DELAY,
          duration: BUTTONS_SLIDE_DURATION,
        },
      };
    }
  },
  hidden: () => {
    return {
      opacity: 0,
      // y: "-20px",
      display: "none",
      transition: {
        duration: 0,
        delay: 0,
      },
    };
  },
};
export const VariantTodoOptions = {
  visible: ({ isSelected }) => {
    if (isSelected) {
      return {
        opacity: 1,
        y: [0, 0],
        zIndex: 9,
        display: "flex",
        transition: {
          delay: BUTTONS_SLIDE_DELAY,
          duration: BUTTONS_SLIDE_DURATION,
        },
      };
    }
  },
  hidden: () => {
    return {
      opacity: 0,
      // y: "-20px",
      display: "none",
      transition: {
        duration: 0,
        delay: 0,
      },
    };
  },
};
