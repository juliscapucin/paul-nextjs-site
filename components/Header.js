import React, { useState, useEffect } from "react";
import Link from "next/link";

import styles from "@/styles/Header.module.scss";
import { useGlobalContext } from "@/data/context";

export default function Header() {
  const { setIsSubmenuOpen } = useGlobalContext();

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>
              <h3>
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
                  Films{" "}
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
      </header>
    </>
  );
}
