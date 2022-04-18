import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/FilmListItem.module.scss";

const containerVariants = {
  hidden: { x: 0 },
  visible: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.2 },
  },
  exit: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

export default function FilmListItem({ slug, acf, title, id }) {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Link href={`/films/${slug}`} key={id}>
        <a>
          <motion.div variants={itemVariants} className={styles.filmListItem}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.img1}
                src={acf.image_1}
                alt={title.rendered}
                layout='fill'
                objectFit='cover'
                objectPosition='center center'
                priority='true'
              />
            </div>
            <div className={styles.filmListInfo}>
              <h4>{title.rendered}</h4>
            </div>
          </motion.div>
        </a>
      </Link>
    </motion.div>
  );
}
