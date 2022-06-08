import Link from "next/link";

import styles from "@/styles/Layout.module.scss";

export default function Back() {
  return (
    <div className={styles.backContainer}>
      <Link href='/'>
        <a className={styles.back}>
          <h4>Back to films</h4>
        </a>
      </Link>
    </div>
  );
}
