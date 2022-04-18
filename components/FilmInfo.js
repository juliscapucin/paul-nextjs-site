import Link from "next/link";
import { motion } from "framer-motion";

import styles from "@/styles/FilmInfo.module.scss";

/*
=================== 
Transition Variants
===================
*/

const containerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: "0%",
    transition: { duration: 0.2 },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.2 },
  },
};

export default function FilmInfo({
  activeFilmSlug,
  activeFilmName,
  activeFilmDescription,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={styles.filmInfoContainer}
    >
      <Link href={`/films/${activeFilmSlug}`}>
        <a>
          <div className={styles.filmItemInfo}>
            <h1 className={styles.filmItemTitle}>{activeFilmName}</h1>
            <p className={styles.filmItemShortdesc}>{activeFilmDescription}</p>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
