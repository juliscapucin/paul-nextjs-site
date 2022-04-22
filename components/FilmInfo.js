import Link from "next/link";
import { motion } from "framer-motion";

import styles from "@/styles/FilmInfo.module.scss";

/*
=================== 
Transition Variants
===================
*/

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const titleVariants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.2 },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.2 },
  },
};

export default function FilmInfo({
  activeFilmSlug,
  activeFilmName,
  activeFilmDescription,
}) {
  return (
    activeFilmSlug !== "cover" && (
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={styles.filmInfoContainer}
      >
        <Link href={`/films/${activeFilmSlug}`}>
          <a>
            <div className={styles.filmItemInfo} data-scroll-sticky>
              <div className={styles.titleContainer}>
                <motion.h1
                  variants={titleVariants}
                  className={styles.filmItemTitle}
                >
                  {activeFilmName}
                </motion.h1>
              </div>
              <p className={styles.filmItemShortdesc}>
                {activeFilmDescription}
              </p>

              <h4>View project</h4>
            </div>
          </a>
        </Link>
      </motion.div>
    )
  );
}
