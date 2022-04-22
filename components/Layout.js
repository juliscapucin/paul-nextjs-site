import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import Header from "./Header";

import styles from "@/styles/Layout.module.scss";

const opacityTransitionVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, when: "beforeChildren" },
  },
  exit: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const curtainContainerVariants = {
  visible: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
  exit: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
};

const curtainVariants = {
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
        variants={curtainContainerVariants}
      >
        <motion.div
          className={styles.transitionUnit}
          variants={curtainVariants}
        ></motion.div>
        <motion.div
          className={styles.transitionUnit}
          variants={curtainVariants}
        ></motion.div>
        <motion.div
          className={styles.transitionUnit}
          variants={curtainVariants}
        ></motion.div>
        <motion.div
          className={styles.transitionUnit}
          variants={curtainVariants}
        ></motion.div>
      </motion.div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <div className={styles.mainContainer}>
        <Header />
        {children}
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
