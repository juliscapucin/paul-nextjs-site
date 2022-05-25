// import { API_URL } from "@/config/index";
// import about from "../data/about.json";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Image from "next/image";

import Layout from "@/components/Layout";

import styles from "@/styles/About.module.scss";

// ABOUT
// -----
export default function About({ about }) {
  const { aboutText, aboutImage } = about;

  return (
    <Layout title={"About"}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1>About Me</h1>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImg}>
            <Image
              className={styles.img}
              src={aboutImage.sourceUrl}
              alt='Paul-de-Heer'
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority='true'
            />
          </div>
          <div
            className={styles.aboutParagraph}
            dangerouslySetInnerHTML={{ __html: aboutText }}
          />
        </div>
      </div>
    </Layout>
  );
}

// GET STATIC PROPS
// ----------------
export async function getStaticProps() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`);
  // const about = await res.json();

  const client = new ApolloClient({
    uri: "https://wp-content.taalmaatjesnederlands.nl/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query NewQuery {
        allAbout {
          nodes {
            aboutACF {
              aboutText
              aboutImage {
                sourceUrl
              }
            }
          }
        }
      }
    `,
  });

  return { props: { about: data.allAbout.nodes[0].aboutACF } };
}
