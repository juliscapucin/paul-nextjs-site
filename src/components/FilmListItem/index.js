import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import useIntersect from "../../hooks/useIntersect";
import "./style.scss";

////////////////////////////
// ANIMATION COORDINATES

const itemWrapperVariants = {
  visible: {
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    x: 0,
    transition: { duration: 0.3 },
  },
};

const hoverImage = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

//////////////////
// COMPONENT

function FilmListItem({ name, slug, image1, id, index }) {
  const [reveal, setReveal] = useState(false);

  const ref = useRef(null);
  const isOnScreen = useIntersect(ref);

  useEffect(() => {
    if (isOnScreen) {
      setReveal(true);
    }
  }, [isOnScreen, index]);

  return (
    <motion.article
      ref={ref}
      className='film-list-item-wrapper'
      variants={itemWrapperVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <motion.div
        className='film-list-item-name'
        whilehover={{ opacity: 1 }}
        transition={hoverImage}
      >
        <Link
          to={`/films/${slug}`}
          whilehover={{ scale: 1.1 }}
          transition={hoverImage}
        >
          {name}
        </Link>
      </motion.div>
      <div className='film-list-item-img'>
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

export default FilmListItem;
