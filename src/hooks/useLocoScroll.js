import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/src/locomotive-scroll.scss";

function useLocoScroll(refScrollContainer, filmsArrayLength) {
  useEffect(() => {
    // if (!start) return;

    const windowWidth = window.innerWidth;
    const containerWidth = windowWidth * filmsArrayLength;
    refScrollContainer.current.style.width = `${containerWidth}px`;

    let locoScroll = new LocomotiveScroll({
      //   el: refScrollContainer.current,
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      direction: "horizontal",
      multiplier: 1,
    });

    return () => {
      if (locoScroll) {
        locoScroll.destroy();
        locoScroll = null;
      }
    };
  }, [refScrollContainer, filmsArrayLength]);
}

export default useLocoScroll;
