import { API_URL } from "@/config/index";

import Layout from "@/components/Layout";
import Map from "@/components/Map";

import styles from "@/styles/Contact.module.scss";

// GET STATIC PROPS
// ----------------
// export const getStaticProps = async () => {
//   const res = await fetch(`${API_URL}/contact`);
//   const contact = await res.json();

//   return { props: { contact }, revalidate: 1 };
// };

// GET SERVER SIDE PROPS
// ---------------------
export const getServerSideProps = async () => {
  const res = await fetch(`${API_URL}/contact`);
  const contact = await res.json();

  return { props: { contact: contact[0] } };
};

// FILM
// ----
export default function Contact({ contact }) {
  const { acf } = contact[0];

  const { text } = acf;

  return (
    <Layout title={"Contact"}>
      <div className={styles.container}>
        <h1>Contact</h1>
        <div className={styles.contactGrid}>
          <div
            className={styles.contactParagraph}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className={styles.contactMap}>
            <Map />
          </div>
        </div>
      </div>
    </Layout>
  );
}
