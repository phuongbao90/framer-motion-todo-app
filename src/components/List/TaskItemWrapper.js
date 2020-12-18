import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const TaskListItemWrapper = ({ children, handleDelete, id, active }) => {
  const breakPoint = -70;
  const controls = useAnimation();

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
      <motion.div
        animate={controls}
        drag="x"
        dragDirectionLock
        onDragEnd={(event, info) => handleDragEnd({ event, info })}
        dragConstraints={{ top: 0, bottom: 0 }}
        className="z-20"
      >
        {children}
      </motion.div>
    </>
  );
};

export default TaskListItemWrapper;
