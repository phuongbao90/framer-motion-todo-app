import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

const variants = {
  messageContainer: {
    hidden: {
      opacity: 0,
      zIndex: -1,
    },
    visible: {
      display: "flex",
      opacity: 1,
      zIndex: -1,
      transition: {
        duration: 0.4,
      },
    },
  },
  message: {
    hidden: {
      opacity: 1,
      zIndex: -1,
    },
    visible: {
      opacity: 1,
    },
  },
};

const DeleteMessage = ({ id, active, handleUndo }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (active) {
      controls.start({
        opacity: 0,
        zIndex: -1,
      });
    } else {
      controls.start({
        display: "flex",
        opacity: 1,
        zIndex: 1,
        transition: {
          duration: 0.2,
        },
      });
    }
  }, [active]);

  return (
    <motion.div className="absolute top-0 w-full h-full" animate={controls}>
      <motion.div
        initial="hidden"
        variants={variants.message}
        animate={!active ? "visible" : "hidden"}
        className="flex items-center pl-5 py-3 w-full"
      >
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
      </motion.div>
    </motion.div>
  );
};

export default DeleteMessage;
