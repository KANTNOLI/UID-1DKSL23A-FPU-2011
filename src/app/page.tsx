import styles from "./page.module.scss";
import Main from "./components/Main";
import Subs from "./components/Subs";
import IdeaToWork from "./components/IdeaToWork";

export default function Home() {
  return (
    <section className={styles.main}>
      <Main />
      <Subs />
      <IdeaToWork />
    </section>
  );
}

