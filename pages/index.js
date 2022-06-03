import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

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
    <>
      {/* <Head>
        <title>Paul de Heer | Film editor</title>
        <meta name='description' content='Paul de Heer | Film editor' />
        <link rel='icon' href='/favicon.ico' />
      </Head> */}
      <Layout
        title='Paul de Heer | Film editor'
        description='Paul de Heer | Film editor'
      >
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
        <div
          className={styles.filmsContainer}
          ref={refScrollContainer}
          data-scroll-container
        >
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
      </Layout>
    </>
  );
}

// GET STATIC PROPS
// ----------------
export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "http://pauldeheer.wordpresssites.host/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query NewQuery {
        films(first: 50) {
          nodes {
            title
            slug
            filmACF {
              category
              credits
              fieldGroupName
              filmInfo
              image1 {
                sourceUrl
              }
              image2Horizontal {
                sourceUrl
              }
              image2Vertical {
                sourceUrl
              }
              mainText
              shortDescription
              videoLink
              alternativeImage {
                sourceUrl
              }
            }
            id
          }
        }
      }
    `,
  });

  return { props: { films: data.films.nodes }, revalidate: 1 };
}
