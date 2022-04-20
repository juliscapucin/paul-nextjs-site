import { API_URL } from "@/config/index";
import { AnimatePresence } from "framer-motion";

import React, { useState } from "react";

import Layout from "@/components/Layout";
import CategoriesMenu from "@/components/CategoriesMenu";
import FilmListItem from "@/components/FilmListItem";

import styles from "@/styles/Films.module.scss";

// GET STATIC PROPS
// ----------------
// export const getStaticProps = async () => {
//   const res = await fetch(`${API_URL}/films`);
//   const films = await res.json();

//   return { props: { films }, revalidate: 1 };
// };

// GET SERVER SIDE PROPS
// ---------------------
export const getServerSideProps = async () => {
  const res = await fetch(`${API_URL}/films`);
  const films = await res.json();

  return { props: { film: films[0] } };
};

export default function Films({ films }) {
  const [filmsArray, setFilmsArray] = useState(films);
  const [activeFilm, setActiveFilm] = useState(1);

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
        {filmsArray.length === 0 && <div>No Films to show...</div>}
        {filmsArray.map((film) => {
          if (film.acf.category !== "cover") {
            return (
              <AnimatePresence exitBeforeEnter>
                <FilmListItem {...film} />;
              </AnimatePresence>
            );
          }
        })}
      </div>
    </Layout>
  );
}
