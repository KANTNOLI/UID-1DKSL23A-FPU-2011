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
                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Client-first mindset</p>

                    <p className={styles.whyContDesc}>your comfort, not just our profit</p>
                </div>

                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Modern design</p>

                    <p className={styles.whyContDesc}>beautiful, user-focused interfaces</p>
                </div>

                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Complex? We love it</p>

                    <p className={styles.whyContDesc}>no project is “too hard</p>
                </div>

                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Clean code</p>

                    <p className={styles.whyContDesc}>easy to support even without us</p>
                </div>

                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Transparency</p>

                    <p className={styles.whyContDesc}>full control stays in your hands</p>
                </div>
            </div>

            <p className={styles.title}>Why Choose Us</p>
            <div className={styles.wave}>
            </div>
        </section>
    );
}

export default Why;