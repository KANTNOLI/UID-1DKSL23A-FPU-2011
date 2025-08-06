import styles from "./page.module.scss";
import Main from "./components/Main";
import Subs from "./components/Subs";

export default function Home() {
  return (
    <section className={styles.main}>
      <Main />
      <Subs />
    </section>
  );
}

