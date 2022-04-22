import { useEffect } from "react";
// import "@/styles/locoScroll.module.scss";

function useLocoScroll(refScrollContainer, filmsArrayLength) {
  useEffect(() => {
    // if (!start) return;

    const windowWidth = window.innerWidth;
    const containerWidth = windowWidth * filmsArrayLength;
    refScrollContainer.current.style.width = `${containerWidth}px`;

    let locoScroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      locoScroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        resetNativeScroll: false,
        direction: "horizontal",
        gestureDirection: "both",
        multiplier: 0.8,
        scrollFromAnywhere: true,
        getDirection: true,
        mobile: {
          breakpoint: 0,
          smooth: false,
          getDirection: false,
        },
        tablet: {
          breakpoint: 0,
          smooth: false,
          getDirection: false,
        },
      });
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
