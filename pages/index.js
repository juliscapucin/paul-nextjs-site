// import { API_URL } from "@/config/index";
// import films from "../data/films.json";
// import getFilms from "../data/getFilms";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Head from "next/head";

import Layout from "@/components/Layout";
import FilmInfo from "@/components/FilmInfo";
import FilmItem from "@/components/FilmItem";
import CategoriesMenu from "@/components/CategoriesMenu";

import useLocoScroll from "@/hooks/useLocoScroll";

import styles from "@/styles/Home.module.scss";

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
    setActiveFilmName(filmData[0].title);
    setActiveFilmDescription(filmData[0].filmACF.shortDescription);
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
            listType={"View as list"}
            link={"/films"}
          />
        </ul>
        <div>
          <AnimatePresence exitBeforeEnter>
            <FilmInfo
              className={styles.filmInfo}
              activeFilmName={activeFilmName}
              activeFilmSlug={activeFilmSlug}
              activeFilmDescription={activeFilmDescription}
              key={activeFilmName}
            />
          </AnimatePresence>
        </div>
        <section ref={refScrollContainer} data-scroll-container>
          <div className={styles.films}>
            {filmsArray.map((film, index) => (
              <AnimatePresence exitBeforeEnter key={film.id}>
                <FilmItem
                  film={film}
                  index={index}
                  updateActiveFilm={(index) => {
                    setActiveFilm(index);
                  }}
                />
              </AnimatePresence>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
}

// GET STATIC PROPS
// ----------------
export async function getStaticProps() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films`);
  // const films = await res.json();

  const client = new ApolloClient({
    uri: "https://wp-content.taalmaatjesnederlands.nl/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query NewQuery {
        films {
          nodes {
            title
            slug
            filmACF {
              category
              credits
              fieldGroupName
              filmInfo
              filmTitle
              image1 {
                sourceUrl
              }
              image2 {
                sourceUrl
              }
              mainText
              shortDescription
              videoLink
            }
            id
          }
        }
      }
    `,
  });

  return { props: { films: data.films.nodes } };
}

// GET SERVER SIDE PROPS
// ---------------------
// export const getServerSideProps = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films`);
//   const films = await res.json();

//   console.log(films);

//   return { props: { films: films } };
// };
