'use client'

import { lazy, Suspense } from "react"
import Subs from "./components/Subs"
import IdeaToWork from "./components/IdeaToWork"
import Why from "./components/Why"
import styles from "./page.module.scss"
import { BreadcrumbData } from "./breadcrumb-data"

export default function Home() {
  return (
    <section className={styles.main}>
      <BreadcrumbData pathname="/" />
      
      <Subs />
      <IdeaToWork />
      
      {/* Оберни Why в Suspense если он тоже тяжелый */}
      <Why />
    </section>
  )
}