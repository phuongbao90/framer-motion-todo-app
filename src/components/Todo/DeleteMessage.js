import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

const variants = {
  messageContainer: {
    initial: {
      opacity: 0,
      zIndex: -1,
      display: "block",
    },
    visible: ({ isDeleteMsgHidden }) => {
      if (!isDeleteMsgHidden) {
        return {
          opacity: [0, 1, 1, 0],
          zIndex: 10,
          transition: {
            times: [0, 0.1, 0.9, 1],
            duration: 2.4,
          },
          transitionEnd: {
            display: "none",
          },
        };
      }
    },
  },
};

const DeleteMessage = ({ id, handleUndo, isDeleteMsgHidden, handleDelete }) => {
  return (
    <motion.div
      className="delete-message absolute top-0 w-full h-full"
      initial="initial"
      animate={!isDeleteMsgHidden ? "visible" : "initial"}
      variants={variants.messageContainer}
      custom={{ isDeleteMsgHidden, handleDelete, id }}
      onAnimationComplete={(definition) => {
        if (definition === "visible") {
          handleDelete(id);
        }
      }}
    >
      <div className="flex items-center pl-5 py-3 w-full h-full">
        <span className="mr-4">
          <FiTrash2 className="text-gray-500 text-lg" />
        </span>
        <span className="text-gray-500 text-base">The task was deleted</span>
        <span
          className="uppercase font-semibold px-3 py-2 border-2 border-solid border-gray-400 rounded-3xl ml-auto text-xs cursor-pointer text-gray-400"
          onClick={() => handleUndo(id)}
        >
          undo
        </span>
      </div>
    </motion.div>
  );
};

export default DeleteMessage;
