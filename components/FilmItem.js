import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import VideoPlayer from "@/components/VideoPlayer";
import useIntersect from "@/hooks/useIntersect";

import styles from "@/styles/FilmItem.module.scss";

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
  const { image_1, image_2, video_link, category } = acf;

  return category === "cover" ? (
    <article ref={ref} className={styles.coverWrapper}>
      <div className={styles.mainFilm}>
        <VideoPlayer link={video_link} />
      </div>
    </article>
  ) : (
    <article ref={ref} className={styles.filmItemWrapper}>
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
    </article>
  );
}
