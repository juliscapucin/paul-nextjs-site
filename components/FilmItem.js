import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/FilmItem.module.scss";

export default function FilmItem({ films, id }) {
  const film = films.find((film) => {
    return film.id === id;
  });

  const { slug, title, acf } = film;
  const { image_1, image_2, video_link } = acf;

  return (
    <Link href={`/films/${slug}`}>
      <a>
        <div className={styles.imgContainer}>
          <Image
            className={styles.heroImg}
            src={image_1}
            alt='image'
            layout='fill'
            objectFit='cover'
            objectPosition='center center'
            priority='true'
          />
        </div>
        <div className={styles.textContainer}>
          <h3>{title.rendered}</h3>
        </div>
      </a>
    </Link>
  );
}
