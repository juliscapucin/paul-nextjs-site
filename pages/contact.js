import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Layout from "@/components/Layout";
import Map from "@/components/Map";

import useLocoScroll from "@/hooks/useLocoScroll";

import styles from "@/styles/Contact.module.scss";

// CONTACT
// -------
export default function Contact({ contact }) {
  const { contactText } = contact;

  useLocoScroll();

  return (
    <Layout title={"Contact"}>
      <div className={styles.container} data-scroll-container>
        <div className={styles.titleContainer}>
          <h1>Contact</h1>
        </div>
        <div className={styles.contactGrid}>
          <div
            className={styles.contactParagraph}
            dangerouslySetInnerHTML={{ __html: contactText }}
          />
          <div className={styles.contactMap}>
            <Map />
          </div>
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
    uri: "http://pauldeheer.wordpresssites.host/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query NewQuery {
        allContact {
          nodes {
            contactACF {
              contactText
            }
          }
        }
      }
    `,
  });

  return { props: { contact: data.allContact.nodes[0].contactACF } };
}
