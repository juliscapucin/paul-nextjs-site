import { API_URL } from "@/config/index";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import Layout from "@/components/Layout";

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
  const { main_text, main_rich_text, image_1, image_2 } = acf;

  return (
    <div className={styles.container}>
      <Layout title={"Film"}>
        <h1>{title.rendered}</h1>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img1}
            src={image_1}
            alt='image'
            layout='fill'
            objectFit='cover'
            objectPosition='center center'
            priority='true'
          />
        </div>
        <div
          className={styles.paragraph}
          dangerouslySetInnerHTML={{ __html: main_rich_text }}
        />
      </Layout>
    </div>
  );
}
