import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../styles/pages.scss";
import "./style.scss";

function CategoriesMenu({
  setActiveFilm,
  setFilmsArray,
  films,
  listType,
  link,
}) {
  const [selectedButton, setSelectedButton] = useState("all");

  const filmFilter = (category) => {
    let filteredFilms = films.filter((item) => item.category === category);
    setActiveFilm(0);
    setFilmsArray(filteredFilms);
  };

  const projectAmount = (category) => {
    let filteredFilms = films.filter((item) => item.category === category);
    return filteredFilms.length;
  };

  return (
    <>
      <li className='film-category-item'>
        <button
          onClick={() => {
            setSelectedButton("all");
            setFilmsArray(films);
          }}
          className={`all ${selectedButton === "all" ? "category-active" : ""}`}
        >
          All
        </button>
        <p className='film-projects-amount'>{films.length}</p>
      </li>
      <li className='film-category-item'>
        <button
          onClick={() => {
            setSelectedButton("documentary");
            filmFilter("documentary");
          }}
          className={`documentary ${
            selectedButton === "documentary" ? "category-active" : ""
          }`}
        >
          Documentary
        </button>
        <p className='film-projects-amount'>{projectAmount("documentary")}</p>
      </li>
      <li className='film-category-item'>
        <button
          onClick={() => {
            setSelectedButton("fiction");
            filmFilter("fiction");
          }}
          className={`fiction ${
            selectedButton === "fiction" ? "category-active" : ""
          }`}
        >
          Fiction
        </button>
        <p className='film-projects-amount'>{projectAmount("fiction")}</p>
      </li>
      <li className='film-category-item'>
        <button
          onClick={() => {
            setSelectedButton("commercial");
            filmFilter("commercial");
          }}
          className={`commercial ${
            selectedButton === "commercial" ? "category-active" : ""
          }`}
        >
          Commercial
        </button>
        <p className='film-projects-amount'>{projectAmount("commercial")}</p>
      </li>
      <li className='film-category-item'>
        <button>
          <Link to={link}>{listType}</Link>
        </button>
      </li>
    </>
  );
}

export default CategoriesMenu;
