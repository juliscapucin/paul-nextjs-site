// import { API_URL } from "@/config/index";
import Image from "next/image";

import Layout from "@/components/Layout";

import styles from "@/styles/About.module.scss";

// GET STATIC PROPS
// ----------------
// export const getStaticProps = async () => {
//   const res = await fetch(`${API_URL}/about`);
//   const about = await res.json();

//   return { props: { about }, revalidate: 1 };
// };

// GET SERVER SIDE PROPS
// ---------------------
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`);
  const about = await res.json();

  return { props: { about: about } };
};

// FILM
// ----
export default function About({ about }) {
  const { acf } = about[0];

  const { text, image } = acf;

  return (
    <Layout title={"About"}>
      <div className={styles.container}>
        <h1>About</h1>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImg}>
            <Image
              className={styles.img}
              src={image}
              alt='Paul-de-Heer'
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority='true'
            />
          </div>
          <div
            className={styles.aboutParagraph}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </Layout>
  );
}
