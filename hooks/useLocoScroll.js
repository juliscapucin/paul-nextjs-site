import { useEffect } from "react";
// import "@/styles/locoScroll.module.scss";

function useLocoScroll() {
  useEffect(() => {
    // if (!start) return;

    // const windowWidth = window.innerWidth;
    // const containerWidth = windowWidth * filmsArrayLength;
    // refScrollContainer.current.style.width = `${containerWidth}px`;

    let locoScroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      locoScroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        resetNativeScroll: false,
        // direction: "horizontal",
        // gestureDirection: "both",
        // getDirection: true,
        multiplier: 0.2,
        scrollFromAnywhere: true,
        smartphone: {
          smooth: false,
        },
        tablet: {
          smooth: false,
        },
      });
    });

    return () => {
      if (locoScroll) {
        locoScroll.destroy();
        locoScroll = null;
      }
    };
  }, []);
}

export default useLocoScroll;
