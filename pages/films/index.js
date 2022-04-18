import { API_URL } from "@/config/index";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Layout from "@/components/Layout";
import CategoriesMenu from "@/components/CategoriesMenu";
import FilmItem from "@/components/FilmItem";

import styles from "@/styles/Films.module.scss";

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/films`);
  const films = await res.json();

  return { props: { films }, revalidate: 1 };
};

export default function Films({ films }) {
  const [filmsArray, setFilmsArray] = useState(films);
  const [activeFilm, setActiveFilm] = useState(1);
  const [activeFilmName, setActiveFilmName] = useState("");
  const [activeFilmSlug, setActiveFilmSlug] = useState("");
  const [activeFilmDescription, setActiveFilmDescription] = useState("");

  return (
    <Layout title={"Films"}>
      <ul className={styles.filmCategories}>
        <CategoriesMenu
          setFilmsArray={setFilmsArray}
          setActiveFilm={setActiveFilm}
          films={films}
          listType={"View as landscape"}
          link={"/"}
        />
      </ul>
      <div className={styles.filmsContainer}>
        {films.length === 0 && <div>No Films to show...</div>}
        {films.map((film) => {
          console.log(film.acf.category);
          if (film.acf.category !== "cover") {
            return (
              <Link href={`/films/${film.slug}`}>
                <a>
                  <div className={styles.filmListItem}>
                    <div className={styles.imgContainer} key={film.id}>
                      <Image
                        className={styles.img1}
                        src={film.acf.image_1}
                        alt={film.title.rendered}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center center'
                        priority='true'
                      />
                    </div>
                    <div className={styles.filmListInfo}>
                      <h4>{film.title.rendered}</h4>
                    </div>
                  </div>
                </a>
              </Link>
            );
          }
        })}
      </div>
    </Layout>
  );
}
