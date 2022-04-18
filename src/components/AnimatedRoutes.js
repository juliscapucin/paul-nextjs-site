import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import SharedLayout from "../pages/SharedLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Films from "../pages/Films";
import Films2 from "../pages/Films2";
import FilmList from "../pages/FilmList";
import SingleFilm from "../pages/SingleFilm";
import Error from "../pages/Error";

const routes = [
  { path: "about", name: "About", Component: About },
  { path: "contact", name: "Contact", Component: Contact },
  { path: "films", name: "Films", Component: Films },
  { path: "films2", name: "Films2", Component: Films2 },
  { path: "filmlist", name: "FilmList", Component: FilmList },
  {
    path: "films/:filmName",
    name: "SingleFilm",
    Component: SingleFilm,
  },
  { path: "*", name: "Error", Component: Error },
];

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />}></Route>
          {routes.map(({ path, name, Component }) => {
            return (
              <Route
                key={name}
                path={path}
                element={<Component />}
                children={({ match }) => (
                  <div className='page'>
                    <Component />
                  </div>
                )}
              ></Route>
            );
          })}
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
