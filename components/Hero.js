import Image from "next/image";

import styles from "@/styles/Hero.module.scss";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <Image
        className={styles.heroImg}
        src={
          "https://images.unsplash.com/photo-1610030181087-540017dc9d61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        }
        alt='image'
        layout='fill'
        objectFit='cover'
        objectPosition='center center'
        priority='true'
      />
    </div>
  );
}
