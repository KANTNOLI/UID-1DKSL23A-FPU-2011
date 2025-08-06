import SubCarts from "./SubCarts";
import styles from "./Subs.module.scss"

function Subs() {
    return (
        <section className={styles.container}>
            <div className={styles.animBack}>
                <div className={styles.animBackDiv1}></div>
                <div className={styles.animBackDiv2}></div>
                <div className={styles.animBackDiv3}></div>


                <div className={styles.animBackDiv4}></div>
                <div className={styles.animBackDiv5}></div>
                <div className={styles.animBackDiv6}></div>

                <div className={styles.animBackResult}></div>
            </div>

            <SubCarts />

            <div className={styles.wave}></div>
            {/* <img className={styles.test} src="./contacts/wave.png" alt="wave.png" /> */}
        </section>);
}

export default Subs;