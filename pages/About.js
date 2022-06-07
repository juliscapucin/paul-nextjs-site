import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// import Image from "next/image";

import Layout from "@/components/Layout";

import useLocoScroll from "@/hooks/useLocoScroll";

import styles from "@/styles/About.module.scss";

// ABOUT
// -----
export default function About({ about }) {
  const { aboutText, aboutImage } = about;

  useLocoScroll();

  return (
    <Layout title={"About"}>
      <div className={styles.container} data-scroll-container>
        <div className={styles.titleContainer}>
          <h1>About</h1>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImg}>
            {/* <Image
              className={styles.img}
              src={aboutImage.sourceUrl}
              alt='Paul-de-Heer'
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority='true'
            /> */}
            <img
              src={aboutImage.sourceUrl}
              alt='Paul-de-Heer'
              className={styles.img}
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
  const client = new ApolloClient({
    uri: "http://pauldeheer.wordpresssites.host/graphql",
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
