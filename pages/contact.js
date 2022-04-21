// import { API_URL } from "@/config/index";
// import contact from "../data/contact.json";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Layout from "@/components/Layout";
import Map from "@/components/Map";

import styles from "@/styles/Contact.module.scss";

// CONTACT
// -------
export default function Contact({ contact }) {
  const { contactText } = contact;

  return (
    <Layout title={"Contact"}>
      <div className={styles.container}>
        <h1>Contact</h1>
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
    uri: "https://wp-content.taalmaatjesnederlands.nl/graphql",
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
