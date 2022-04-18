import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import films from "../data";
import "../styles/pages.scss";

import Film from "../components/Film";

const containerVariants = {
  hidden: { y: 0 },
  visible: {
    y: 0,
    transition: { duration: 0.1 },
  },
  exit: { y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

function Films() {
  const [activeFilm, setActiveFilm] = useState(1);
  const [activeFilmName, setActiveFilmName] = useState("");
  const [activeFilmDescription, setActiveFilmDescription] = useState("");

  useEffect(() => {
    let filmData = films.filter((item, index) => index === activeFilm);
    setActiveFilmName(filmData[0].name);
    setActiveFilmDescription(filmData[0].descriptionShort);
  }, [activeFilm]);

  return (
    <section>
      <motion.div
        className='films-vertical'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <div className='films-item-info'>
          <h3 className='film-item-title'>{activeFilmName}</h3>
          <p className='film-item-shortdesc'>{activeFilmDescription}</p>
          <ul className='film-categories'>
            <li className='film-category-item'>
              <button>All</button>
              <p className='film-projects-amount'>24</p>
            </li>
            <li className='film-category-item'>
              <button>Documentary</button>
              <p className='film-amount'>20</p>
            </li>
            <li className='film-category-item'>
              <button>Fiction</button>
              <p className='film-amount'>2</p>
            </li>
            <li className='film-category-item'>
              <button>Commercial</button>
              <p className='film-amount'>2</p>
            </li>
          </ul>
        </div>
        {films.map((film, index) => (
          <Film
            {...film}
            key={film.id}
            index={index}
            updateActiveFilm={(index) => {
              setActiveFilm(index);
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default Films;
