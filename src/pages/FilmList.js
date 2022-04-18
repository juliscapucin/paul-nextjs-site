import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import films from "../data";
import "../styles/pages.scss";

import useLocoScroll from "../hooks/useLocoScroll";

import FilmListItem from "../components/FilmListItem";
import CategoriesMenu from "../components/CategoriesMenu";

//////////////////////////
// ANIMATION COORDINATES

const wrapperVariants = {
  visible: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.2 },
  },
  exit: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.2 },
  },
};

//////////////
// COMPONENT

function Films2() {
  const [filmsArray, setFilmsArray] = useState(
    films.filter((film) => film.category !== "cover")
  );
  const refScrollContainer = useRef(null);

  useLocoScroll(refScrollContainer);

  return (
    <>
      <ul className='film-categories'>
        <CategoriesMenu
          setFilmsArray={setFilmsArray}
          filmsArray={filmsArray}
          films={films}
          listType={"View as landscape"}
          link={"/films2"}
        />
      </ul>
      <section ref={refScrollContainer} data-scroll-container>
        <motion.div
          className='film-list'
          variants={wrapperVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          {filmsArray.map((film, index) => (
            <FilmListItem {...film} key={film.id} index={index} />
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default Films2;
