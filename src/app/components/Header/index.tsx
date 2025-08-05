import styles from "./Header.module.scss"
import Navigate from "./navigate";

function Header() {

    return (
        <section className={styles.header}>
            <Navigate></Navigate>

            <img className={styles.headerLogo} src="./logo.jpg" alt="logo.jpg" />
        </section>
    );
}

export default Header;