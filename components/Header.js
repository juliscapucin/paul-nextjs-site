import Link from "next/link";

import styles from "../styles/Header.module.scss";

export default function Header() {
  return (
    <header>
      <div className={styles.logo}>
        <Link href='/'>
          <a>LOGO HERE</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/films'>
              <a>Films</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
