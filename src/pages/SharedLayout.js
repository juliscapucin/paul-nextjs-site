import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import "../styles/pages.scss";
import "../styles/base.scss";

const opacityTransitionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, when: "beforeChildren" },
  },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const curtainContainerVariants = {
  visible: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.2 },
  },
  exit: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.2 },
  },
};

const curtainVariants = {
  hidden: { x: "0%" },
  visible: {
    x: "100%",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: { x: "0%", transition: { duration: 0.3, ease: "easeInOut" } },
};

function SharedLayout() {
  return (
    <>
      <Navbar />
      <motion.div
        variants={opacityTransitionVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <motion.div className='transition' variants={curtainContainerVariants}>
          <motion.div
            className='transition-unit'
            variants={curtainVariants}
          ></motion.div>
          <motion.div
            className='transition-unit'
            variants={curtainVariants}
          ></motion.div>
          <motion.div
            className='transition-unit'
            variants={curtainVariants}
          ></motion.div>
          <motion.div
            className='transition-unit'
            variants={curtainVariants}
          ></motion.div>
        </motion.div>
        <Outlet />
      </motion.div>
    </>
  );
}

export default SharedLayout;
