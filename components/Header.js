import Link from "next/link";

import styles from "@/styles/Header.module.scss";

export default function Header() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>LOGO HERE</a>
        </Link>
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link href='/films'>
              <a>Films</a>
            </Link>
          </li>
          <li>
            <Link href='/about'>
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href='/contact'>
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
