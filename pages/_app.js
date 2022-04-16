import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.pathname} />
    </AnimatePresence>
  );
}

export default MyApp;
