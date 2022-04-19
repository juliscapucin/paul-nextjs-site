import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Image from "next/image";

import VideoPlayer from "@/components/VideoPlayer";
import useIntersect from "@/hooks/useIntersect";

import styles from "@/styles/FilmItem.module.scss";

/*
=================== 
Transition Variants
===================
*/

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

/*
=================== 
Film Item
===================
*/

export default function FilmItem({ film, id, updateActiveFilm, index }) {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(false);

  const isOnScreen = useIntersect(ref);

  useEffect(() => {
    if (isOnScreen) {
      setReveal(true);
      updateActiveFilm(index);
    }
  }, [isOnScreen]);

  const { title, acf } = film;
  const { image_1, video_link, category } = acf;

  return category === "cover" ? (
    <article ref={ref} className={styles.coverWrapper}>
      <div className={styles.mainFilm}>
        <VideoPlayer link={video_link} />
      </div>
    </article>
  ) : (
    <motion.article
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      ref={ref}
      className={styles.filmItemWrapper}
    >
      <div className={styles.filmItemGrid}>
        <div className={styles.img1Wrapper} data-scroll data-scroll-speed={1}>
          <Image
            className={styles.img1}
            src={image_1}
            alt={title.rendered}
            layout='fill'
            objectFit='cover'
            objectPosition='center center'
            priority='true'
          />
        </div>
        <div className={styles.img2Wrapper}>
          <VideoPlayer link={video_link} />
        </div>
      </div>
    </motion.article>
  );
}
