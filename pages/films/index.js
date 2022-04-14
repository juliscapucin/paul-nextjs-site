import { API_URL } from "@/config/index";

import Layout from "@/components/Layout";
import FilmItem from "@/components/FilmItem";

import styles from "@/styles/Films.module.scss";

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/films`);
  const films = await res.json();

  return { props: { films }, revalidate: 1 };
};

export default function Films({ films }) {
  return (
    <div className={styles.container}>
      <Layout title={"Films"}>
        <h1>Films</h1>
        <div className={styles.filmsContainer}>
          {films.length === 0 && <div>No Films to show...</div>}
          {films.map((film) => {
            return <FilmItem key={film.id} id={film.id} films={films} />;
          })}
        </div>
      </Layout>
    </div>
  );
}
