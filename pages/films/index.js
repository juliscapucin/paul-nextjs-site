import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Layout from "@/components/Layout";
import CategoriesMenu from "@/components/CategoriesMenu";
import FilmListItem from "@/components/FilmListItem";

import useLocoScroll from "@/hooks/useLocoScroll";

import styles from "@/styles/Layout.module.scss";

// FILMS
// -----
export default function Films({ films }) {
  const [filmsArray, setFilmsArray] = useState(films);
  const [activeFilm, setActiveFilm] = useState(1);

  useLocoScroll();

  return (
    <Layout title={"Films"}>
      <ul className={styles.filmCategories}>
        <CategoriesMenu
          setFilmsArray={setFilmsArray}
          setActiveFilm={setActiveFilm}
          films={films}
          listType={"View as scroll"}
          link={"/"}
        />
      </ul>
      <div className={styles.filmsContainer} data-scroll-container>
        {filmsArray.length === 0 && <div>No Films to show...</div>}
        {filmsArray.map((film) => {
          if (film.filmACF.category !== "cover") {
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
