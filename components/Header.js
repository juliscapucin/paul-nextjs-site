import React, { useState, useEffect } from "react";
import Link from "next/link";

import styles from "@/styles/Header.module.scss";
import { useGlobalContext } from "@/data/context";

export default function Header() {
  const { setIsSubmenuOpen } = useGlobalContext();
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <>
      <header className={styles.navbar}>
        <div>
          <Link href='/'>
            <a>
              <h3 className={styles.logo}>
                Paul de Heer<span className={styles.logoSpan}> editor</span>
              </h3>
            </a>
          </Link>
        </div>

        <nav>
          <ul className={styles.navLinks}>
            <li>
              <Link href='/'>
                <a
                  className={styles.filmsButton}
                  onMouseOver={() => setIsSubmenuOpen(true)}
                >
                  Films
                </a>
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
        <div className={styles.burger} onClick={() => setIsToggleOpen(true)}>
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine}></div>
        </div>
        <nav
          className={`${styles["navToggle"]} ${
            isToggleOpen && styles["toggleActive"]
          }`}
        >
          <ul>
            <li>
              <div
                className={styles.closeButton}
                onClick={() => setIsToggleOpen(false)}
              >
                <div className={styles.closeLine}></div>
                <div className={styles.closeLine}></div>
              </div>
            </li>
            <li>
              <Link href='/'>
                <a onClick={() => setIsToggleOpen(false)}>Films </a>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <a onClick={() => setIsToggleOpen(false)}>About</a>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <a onClick={() => setIsToggleOpen(false)}>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
