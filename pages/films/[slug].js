import { API_URL } from "@/config/index";
import React, { useRef } from "react";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import Layout from "@/components/Layout";
import VideoPlayer from "@/components/VideoPlayer";

import useLocoScroll from "@/hooks/useLocoScroll";

import styles from "@/styles/Film.module.scss";

// GET STATIC PATHS
// ----------------
export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/films`);
  const films = await res.json();

  const paths = films.map((film) => ({ params: { slug: film.slug } }));

  return { paths, fallback: true };
};

// GET STATIC PROPS
// ----------------
export const getStaticProps = async ({ params: { slug } }) => {
  const res = await fetch(`${API_URL}/films?slug=${slug}`);
  const films = await res.json();

  return { props: { film: films[0] }, revalidate: 1 };
};

// FILM
// ----
export default function Film({ film }) {
  const { title, acf } = film;
  const {
    main_rich_text,
    image_1,
    image_2,
    short_description,
    film_details,
    video_link,
    film_credits,
  } = acf;

  const refScrollContainer = useRef(null);

  useLocoScroll(refScrollContainer, 3);

  return (
    <Layout title={"Film"}>
      <div
        className={styles.container}
        ref={refScrollContainer}
        data-scroll-container
      >
        <div className={styles.filmGrid}>
          <div className={styles.filmHeader}>
            <h1>{title.rendered}</h1>
            <Link href='/films'>Back to Films</Link>
          </div>
          <div className={styles.filmImg1}>
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
          <div className={styles.filmInfo}>
            <h3>{short_description}</h3>
            <div
              className={styles.filmDetails}
              dangerouslySetInnerHTML={{ __html: film_details }}
            />
          </div>
        </div>
        <div className={styles.filmFlex}>
          <div
            className={styles.filmParagraph}
            dangerouslySetInnerHTML={{ __html: main_rich_text }}
          />

          <div className={styles.filmImg}>
            <VideoPlayer link={video_link} />
          </div>

          <div
            className={styles.filmCredits}
            dangerouslySetInnerHTML={{ __html: film_credits }}
          />
          <div className={styles.filmImg}>
            <Image
              className={styles.img2}
              src={image_2}
              alt={title.rendered}
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority='true'
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
