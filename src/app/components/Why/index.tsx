import styles from "./Why.module.scss"

function Why() {
    return (
        <section className={styles.why}>
            <div className={styles.animBack}>
                <div className={styles.animBackDiv1}></div>
                <div className={styles.animBackDiv2}></div>
                <div className={styles.animBackDiv3}></div>


                <div className={styles.animBackDiv4}></div>
                <div className={styles.animBackDiv5}></div>
                <div className={styles.animBackDiv6}></div>

                <div className={styles.animBackResult}></div>
            </div>

            <div className={styles.cont}>
                
            </div>

            <p className={styles.title}>Warum wir?</p>
            <div className={styles.wave}>
            </div>
        </section>
    );
}

export default Why;

