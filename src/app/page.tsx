'use client'

import Subs from "./components/Subs";
import IdeaToWork from "./components/IdeaToWork";
import Why from "./components/Why";

import styles from "./page.module.scss";
import { useEffect } from "react";
import { BreadcrumbData } from "./breadcrumb-data";

export default function Home() {
  useEffect(() => {
    document.title = "Chazen | Web Design & Development Agency"
  }, [])

  return (
    <section className={styles.main}>
      <BreadcrumbData pathname="/" />

      <Subs />
      <IdeaToWork />
      <Why />
    </section>
  );
}

