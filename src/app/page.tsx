import Subs from "./components/Subs";
import IdeaToWork from "./components/IdeaToWork";
import Why from "./components/Why";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <section className={styles.main}>
      <Subs />
      <IdeaToWork />
      <Why />
    </section>
  );
}

