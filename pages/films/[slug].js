// import { NEXT_PUBLIC_API_URL } from "@/config/index";
// import films from "../../data/films.json";

import { useRouter } from "next/router";
import React, { useRef } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Link from "next/link";
import Image from "next/image";

import Layout from "@/components/Layout";
import VideoPlayer from "@/components/VideoPlayer";

import useLocoScroll from "@/hooks/useLocoScroll";

import styles from "@/styles/Film.module.scss";

// FILM
// ----
export default function Film({ film }) {
  const refScrollContainer = useRef(null);
  useLocoScroll(refScrollContainer, 3);

  const router = useRouter();

  // if (router.isFallback) {
  //   <h1>Data is loading</h1>;
  // }
  const { title, filmACF } = film;

  const {
    mainText,
    image1,
    image2,
    shortDescription,
    filmInfo,
    videoLink,
    credits,
  } = filmACF;

  return (
    <Layout title={"Film"}>
      <div
        className={styles.container}
        ref={refScrollContainer}
        data-scroll-container
      >
        <div className={styles.filmGrid}>
          <div className={styles.filmHeader}>
            <h1>{title}</h1>
            <Link href='/films'>Back to Films</Link>
          </div>
          <div className={styles.filmImg1}>
            <Image
              className={styles.img1}
              src={image1.sourceUrl}
              alt={title}
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority='true'
            />
          </div>
          <div className={styles.filmInfo}>
            <h3>{shortDescription}</h3>
            <div
              className={styles.filmDetails}
              dangerouslySetInnerHTML={{ __html: filmInfo }}
            />
          </div>
        </div>
        <div className={styles.filmFlex}>
          <div
            className={styles.filmParagraph}
            dangerouslySetInnerHTML={{ __html: mainText }}
          />

          <div className={styles.filmImg}>
            <VideoPlayer link={videoLink} />
          </div>

          <div
            className={styles.filmCredits}
            dangerouslySetInnerHTML={{ __html: credits }}
          />
          <div className={styles.filmImg}>
            <Image
              className={styles.img2}
              src={image2.sourceUrl}
              alt={title}
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

// GET SERVER SIDE PROPS
// ---------------------
// export const getServerSideProps = async ({ query: { slug } }) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/films?slug=${slug}`
//   );
//   const films = await res.json();

//   return { props: { film: films[0] } };
// };

// GET STATIC PATHS
// ----------------
export async function getStaticPaths() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films`);
  // const films = await res.json();

  // const paths = films.map((film) => ({ params: { slug: film.slug } }));

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
            id
          }
        }
      }
    `,
  });

  const paths = data.films.nodes.map((film) => ({
    params: { slug: film.slug },
  }));

  return { paths, fallback: false };
}

// GET STATIC PROPS
// ----------------
export async function getStaticProps({ params: { slug } }) {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/films?slug=${slug}`
  // );
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

  const filmData = data.films.nodes.filter((film) => film.slug === slug);

  return { props: { film: filmData[0] }, revalidate: 1 };
}
