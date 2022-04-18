import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import useIntersect from "../../hooks/useIntersect";
import "./style.scss";

const hoverImage = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

function Film({ name, image1, updateActiveFilm, id, index }) {
  const [reveal, setReveal] = useState(false);

  const ref = useRef(null);
  const isOnScreen = useIntersect(ref);

  useEffect(() => {
    if (isOnScreen) {
      setReveal(true);
      updateActiveFilm(index);
    }
  }, [isOnScreen, updateActiveFilm, index]);

  return (
    <motion.article ref={ref} className='films-item-wrapper'>
      <div className='film-button-wrapper'>
        <button>
          <Link to={id}>View project</Link>
        </button>
      </div>
      <div className='films-item-img'>
        <motion.img
          src={image1}
          alt={name}
          whileHover={{ scale: 1.1 }}
          transition={hoverImage}
        />
      </div>
    </motion.article>
  );
}

export default Film;
