import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Image from "next/image";

import VideoPlayer from "@/components/VideoPlayer";
import useIntersect from "@/hooks/useIntersect";

import styles from "@/styles/Layout.module.scss";

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

  const { title, filmACF } = film;
  const { image1, videoLink, category, alternativeImage } = filmACF;

  return (
    <motion.article
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      ref={ref}
      className={styles.filmItemContainer}
    >
      <div className={styles.filmItemGrid}>
        {/* <div className={styles.img1Wrapper} data-scroll data-scroll-speed={1}> */}
        <div className={styles.filmItemImg1Container}>
          <Image
            className={styles.filmItemImg}
            src={image1.sourceUrl}
            alt={title}
            layout='fill'
            objectFit='cover'
            objectPosition='center center'
            priority
          />
          <h5>Loading image...</h5>
        </div>
        <div className={styles.filmItemImg2Container}>
          {videoLink ? (
            <VideoPlayer link={videoLink} />
          ) : (
            <Image
              className={styles.filmItemImg}
              src={alternativeImage.sourceUrl}
              alt={title}
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority
            />
          )}
        </div>
      </div>
    </motion.article>
  );
}
