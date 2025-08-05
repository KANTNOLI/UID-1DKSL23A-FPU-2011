import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {
  return (
    <section className={styles.main}>    
        <Header />
        <Main />
        
    </section>
  );
}
