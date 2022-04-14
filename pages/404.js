import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

import Layout from "@/components/Layout";

import styles from "@/styles/404.module.scss";

export default function PageNotFound() {
  return (
    <Layout title='Page Not Found'>
      <div className='errorTitle'>
        <h2>
          <FaExclamationTriangle />
        </h2>
        <h1>Error!</h1>
        <h3>Sorry, this page doesn't exist.</h3>
        <Link href='/'>Go back to Home Page</Link>
      </div>
    </Layout>
  );
}
