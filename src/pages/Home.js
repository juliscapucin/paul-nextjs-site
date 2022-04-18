import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

import films from "../data";
import "../styles/pages.scss";

import useLocoScroll from "../hooks/useLocoScroll";

import Film2 from "../components/Film2";
import CategoriesMenu from "../components/CategoriesMenu";

function Home() {
  const [filmsArray, setFilmsArray] = useState(films);
  const [activeFilm, setActiveFilm] = useState(1);
  const [activeFilmName, setActiveFilmName] = useState("");
  const [activeFilmSlug, setActiveFilmSlug] = useState("");
  const [activeFilmDescription, setActiveFilmDescription] = useState("");
  const refScrollContainer = useRef(null);

  // Define size of scroll container
  const filmsArrayLength = filmsArray.length;

  useLocoScroll(refScrollContainer, filmsArrayLength);

  useEffect(() => {
    console.log(activeFilm);
    let filmData = filmsArray.filter((item, index) => index === activeFilm);
    setActiveFilmName(filmData[0].name);
    setActiveFilmDescription(filmData[0].descriptionShort);
    setActiveFilmSlug(filmData[0].slug);
  }, [activeFilm, filmsArray]);

  return (
    <>
      <ul className='film-categories'>
        <CategoriesMenu
          setFilmsArray={setFilmsArray}
          setActiveFilm={setActiveFilm}
          films={films}
          listType={"View as mosaic"}
          link={"/filmlist"}
        />
      </ul>
      <Link to={`/films/${activeFilmSlug}`}>
        <div className='films-item-info'>
          <h1 className='film-item-title'>{activeFilmName}</h1>
          <p className='film-item-shortdesc'>{activeFilmDescription}</p>
        </div>
      </Link>
      <section ref={refScrollContainer} data-scroll-container>
        <div className='films'>
          {filmsArray.map((film, index) => (
            <Film2
              {...film}
              key={film.id}
              index={index}
              updateActiveFilm={(index) => {
                setActiveFilm(index);
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
