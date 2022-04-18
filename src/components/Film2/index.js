import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import VideoPlayer from "../VideoPlayer";

import useIntersect from "../../hooks/useIntersect";
import "./style.scss";

// const hoverImage = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

function Film2({
  name,
  slug,
  image1,
  video,
  updateActiveFilm,
  index,
  category,
}) {
  const [reveal, setReveal] = useState(false);

  const ref = useRef(null);
  const isOnScreen = useIntersect(ref);

  useEffect(() => {
    if (isOnScreen) {
      setReveal(true);
      updateActiveFilm(index);
    }
  }, [isOnScreen]);

  return category === "cover" ? (
    <article ref={ref} className='film-item-wrapper'>
      <div className='main-film'>
        <VideoPlayer link={video} />
      </div>
    </article>
  ) : (
    <article ref={ref} className='film-item-wrapper'>
      <div className='film-item-grid'>
        <div className='img1-wrapper' data-scroll data-scroll-speed={1}>
          <img className='img1' src={image1} alt={name} />
        </div>
        <div className='img2-wrapper'>
          <VideoPlayer link={video} />
        </div>
      </div>
    </article>
  );
}

export default Film2;
