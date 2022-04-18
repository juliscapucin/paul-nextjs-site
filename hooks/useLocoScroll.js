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
        smoothMobile: false,
        resetNativeScroll: true,
        direction: "horizontal",
        multiplier: 1,
        scrollFromAnywhere: true,
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
