import Head from "next/head";
import Link from "next/link";

import { API_URL } from "@/config/index";
import React, { useState, useEffect, useRef } from "react";

import Layout from "@/components/Layout";
import FilmItem from "@/components/FilmItem";
import CategoriesMenu from "@/components/CategoriesMenu";

import useLocoScroll from "@/hooks/useLocoScroll";

import styles from "@/styles/Home.module.scss";

// GET STATIC PROPS
// ----------------
export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/films`);
  const films = await res.json();

  return { props: { films }, revalidate: 1 };
};

// HOME
// ----
export default function Home({ films }) {
  const [filmsArray, setFilmsArray] = useState(films);
  const [activeFilm, setActiveFilm] = useState(1);
  const [activeFilmName, setActiveFilmName] = useState("");
  const [activeFilmSlug, setActiveFilmSlug] = useState("");
  const [activeFilmDescription, setActiveFilmDescription] = useState("");
  const refScrollContainer = useRef(null);

  // Define size of scroll container
  const filmsArrayLength = filmsArray.length;

  useLocoScroll(refScrollContainer, filmsArrayLength);

  useEffect(() => {
    let filmData = filmsArray.filter((item, index) => index === activeFilm);
    setActiveFilmName(filmData[0].title.rendered);
    setActiveFilmDescription(filmData[0].acf.short_description);
    setActiveFilmSlug(filmData[0].slug);
  }, [activeFilm, filmsArray]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Paul de Heer | Film editor</title>
        <meta name='description' content='Paul de Heer | Film editor' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <ul className={styles.filmCategories}>
          <CategoriesMenu
            setFilmsArray={setFilmsArray}
            setActiveFilm={setActiveFilm}
            films={films}
            listType={"View as mosaic"}
            link={"/filmlist"}
          />
        </ul>
        <div className={styles.filmInfo}>
          <Link href={`/films/${activeFilmSlug}`}>
            <a>
              <div className={styles.filmItemInfo}>
                <h1 className={styles.filmItemTitle}>{activeFilmName}</h1>
                <p className={styles.filmItemShortdesc}>
                  {activeFilmDescription}
                </p>
              </div>
            </a>
          </Link>
        </div>
        <section ref={refScrollContainer} data-scroll-container>
          <div className={styles.films}>
            {filmsArray.map((film, index) => (
              <FilmItem
                film={film}
                key={film.id}
                index={index}
                updateActiveFilm={(index) => {
                  setActiveFilm(index);
                }}
              />
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
}
