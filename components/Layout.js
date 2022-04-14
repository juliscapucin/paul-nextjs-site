import Head from "next/head";
import { useRouter } from "next/router";

import Header from "./Header";
import Hero from "./Hero";

import styles from "@/styles/Layout.module.scss";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Hero />}
      <div className={styles.mainContainer}>{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Website XYZ",
  description: "Here goes description for meta tag.",
  keywords: "film, filmmaking, edition",
};
