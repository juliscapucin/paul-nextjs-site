import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";

import Title from "../components/Title";
import VideoPlayer from "../components/VideoPlayer";

import films from "../data";
import useLocoScroll from "../hooks/useLocoScroll";

function SingleFilm() {
  const { filmName } = useParams();
  const film = films.find((item) => item.slug === filmName);

  const {
    image1,
    image2,
    video,
    name,
    details,
    description,
    descriptionShort,
    credits,
  } = film;

  const refScrollContainer = useRef(null);

  useLocoScroll(refScrollContainer);

  return (
    <section ref={refScrollContainer} data-scroll-container>
      <div>
        <div className='single-film-header'>
          <Title text={name} />
          <Link to='/films'>Back to Films</Link>
        </div>
        <div className='single-film'>
          <div className='single-film-img'>
            <img src={image1} alt={name} />
          </div>
          <div className='single-film-info'>
            <h3>{descriptionShort}</h3>
            <div className='single-film-details'>{parse(details)}</div>
          </div>
          <div className='single-film-paragraph'>{parse(description)}</div>
          <div className='single-film-img'>
            <VideoPlayer link={video} />
          </div>
          <div className='single-film-credits'>{parse(credits)}</div>
          <div className='single-film-img'>
            <img src={image2} alt={name} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleFilm;
