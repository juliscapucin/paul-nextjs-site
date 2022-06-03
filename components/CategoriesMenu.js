import React, { useState, useEffect } from "react";
import Link from "next/link";

import styles from "@/styles/CategoriesMenu.module.scss";

function CategoriesMenu({
  setActiveFilm,
  setFilmsArray,
  films,
  listType,
  link,
}) {
  const [selectedButton, setSelectedButton] = useState("all");

  const filmFilter = (category) => {
    let filteredFilms = films.filter(
      (item) => item.filmACF.category === category
    );
    setActiveFilm(0);
    setFilmsArray(filteredFilms);
  };

  const projectAmount = (category) => {
    let filteredFilms = films.filter(
      (item) => item.filmACF.category === category
    );
    return filteredFilms.length;
  };

  return (
    <>
      <li className={styles.filmCategoryItem}>
        <button
          onClick={() => {
            setSelectedButton("all");
            setFilmsArray(films);
          }}
          className={`${styles["all"]} ${
            selectedButton === "all" ? styles["categoryActive"] : ""
          }`}
        >
          All
        </button>
        <p className={styles.filmProjectsAmount}>{films.length}</p>
      </li>
      <li className={styles.filmCategoryItem}>
        <button
          onClick={() => {
            setSelectedButton("documentary");
            filmFilter("documentary");
          }}
          className={`${styles["documentary"]} ${
            selectedButton === "documentary" ? styles["categoryActive"] : ""
          }`}
        >
          Documentary
        </button>
        <p className={styles.filmProjectsAmount}>
          {projectAmount("documentary")}
        </p>
      </li>
      <li className={styles.filmCategoryItem}>
        <button
          onClick={() => {
            setSelectedButton("fiction");
            filmFilter("fiction");
          }}
          className={`${styles["fiction"]} ${
            selectedButton === "fiction" ? styles["categoryActive"] : ""
          }`}
        >
          Fiction
        </button>
        <p className={styles.filmProjectsAmount}>{projectAmount("fiction")}</p>
      </li>
      <li className={styles.filmCategoryItem}>
        <button
          onClick={() => {
            setSelectedButton("commercial");
            filmFilter("commercial");
          }}
          className={`${styles["commercial"]} ${
            selectedButton === "commercial" ? styles["categoryActive"] : ""
          }`}
        >
          Commercial
        </button>
        <p className={styles.filmProjectsAmount}>
          {projectAmount("commercial")}
        </p>
      </li>
      <li className={styles.filmCategoryItem}>
        <button
          onClick={() => {
            setSelectedButton("trailer");
            filmFilter("trailer");
          }}
          className={`${styles["trailer"]} ${
            selectedButton === "trailer" ? styles["categoryActive"] : ""
          }`}
        >
          Trailer
        </button>
        <p className={styles.filmProjectsAmount}>{projectAmount("trailer")}</p>
      </li>
      <li className={styles.filmCategoryItem}>
        <button className={styles.listType}>
          <Link href={link}>{listType}</Link>
        </button>
      </li>
    </>
  );
}

export default CategoriesMenu;
