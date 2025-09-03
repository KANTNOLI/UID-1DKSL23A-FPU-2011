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
                    <p className={styles.whyContTitle}>Kundenorientierte Denkweise</p>

                    <p className={styles.whyContDesc}>Ihr Komfort, nicht nur unser Gewinn</p>
                </div>

                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Aktuelle Designlösungen</p>

                    <p className={styles.whyContDesc}>Schöne, benutzerzentrierte Oberflächen</p>
                </div>

                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Komplex? Wir lieben das!</p>

                    <p className={styles.whyContDesc}>Kein Projekt ist „zu schwierig“</p>
                </div>

                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Sauberer Code</p>

                    <p className={styles.whyContDesc}>Einfach zu warten, auch ohne uns</p>
                </div>

                <div className={styles.whyCont}>
                    <p className={styles.whyContTitle}>Transparenz</p>

                    <p className={styles.whyContDesc}>Die volle Kontrolle bleibt in Ihren Händen</p>
                </div>
            </div>

            <p className={styles.title}>Warum wir?</p>
            <div className={styles.wave}>
            </div>
        </section>
    );
}

export default Why;