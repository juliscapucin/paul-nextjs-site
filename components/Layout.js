import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import Header from "./Header";
import { AppProvider } from "@/data/context";

import styles from "@/styles/Layout.module.scss";

const opacityTransitionVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, when: "beforeChildren" },
  },
  exit: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const transitionContainerVariants = {
  visible: {
    x: 0,
    transition: { duration: 0.2, staggerChildren: 0.1 },
  },
  exit: {
    x: 0,
    transition: { duration: 0.2, staggerChildren: 0.1 },
  },
};

const transitionVariants = {
  hidden: { x: "0%" },
  visible: {
    x: "-100%",
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  exit: { x: "0%", transition: { duration: 0.1, ease: "easeInOut" } },
};

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <motion.div
      variants={opacityTransitionVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <motion.div
        className={styles.transition}
        variants={transitionContainerVariants}
      >
        <motion.div
          className={styles.transitionUnit}
          variants={transitionVariants}
        ></motion.div>
        <motion.div
          className={styles.transitionUnit}
          variants={transitionVariants}
        ></motion.div>
        <motion.div
          className={styles.transitionUnit}
          variants={transitionVariants}
        ></motion.div>
        <motion.div
          className={styles.transitionUnit}
          variants={transitionVariants}
        ></motion.div>
      </motion.div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <div className={styles.mainContainer}>
        <React.StrictMode>
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </React.StrictMode>
      </div>
    </motion.div>
  );
}

Layout.defaultProps = {
  title: "Paul de Heer | Film editor",
  description: "Here goes description for meta tag.",
  keywords: "film, filmmaking, edition",
  link: "rel='icon' href='/favicon.ico'",
};
