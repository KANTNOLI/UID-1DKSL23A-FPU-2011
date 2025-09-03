import styles from "./IdeaToWork.module.scss"

function IdeaToWork() {
    return (
        <section className={styles.idea}>
            <p className={styles.ideaTitle}>Von der Idee bis zum Launch</p>

            <div className={styles.plans}>
                <div className={`${styles.line} ${styles.line1}`}></div>
                <div className={`${styles.line} ${styles.line2}`}></div>
                <div className={`${styles.line} ${styles.line3}`}></div>
                <div className={`${styles.line} ${styles.line4}`}></div>
                <div className={`${styles.backline} ${styles.backline1}`}></div>
                <div className={`${styles.backline} ${styles.backline2}`}></div>
                <div className={`${styles.backline} ${styles.backline3}`}></div>
                <div className={`${styles.backline} ${styles.backline4}`}></div>
                <div className={`${styles.backline} ${styles.backline5}`}></div>
                <div className={`${styles.backline} ${styles.backline6}`}></div>

                <div className={`${styles.plan} ${styles.p1}`}>
                    <p className={styles.planTitle}>Briefing & Kundengespräch</p>
                    <p className={styles.planDesc}>
                        Detaillierte Besprechung Ihrer Vision, Ziele und Anforderungen
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p2}`}>
                    <p className={styles.planTitle}>Designentwurf</p>
                    <p className={styles.planDesc}>
                        Entwicklung eines modernen UI/UX Konzepts für Ihre Website
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p3}`}>
                    <p className={styles.planTitle}>Designüberarbeitung</p>
                    <p className={styles.planDesc}>
                        Gemeinsame Optimierung des Designs nach Ihrem Feedback
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p4}`}>
                    <p className={styles.planTitle}>Webentwicklung</p>
                    <p className={styles.planDesc}>
                        Professionelle Programmierung mit modernen Frameworks
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p5}`}>
                    <p className={styles.planTitle}>Testphase</p>
                    <p className={styles.planDesc}>
                        Gründliche Qualitätssicherung auf allen Endgeräten
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p6}`}>
                    <p className={styles.planTitle}>Launch & Einrichtung</p>
                    <p className={styles.planDesc}>
                        Live-Schaltung und technische Feinanpassungen
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p7}`}>
                    <p className={styles.planTitle}>Projektabnahme</p>
                    <p className={styles.planDesc}>
                        Finale Abnahme und offizielle Übergabe des Projekts
                    </p>
                </div>
            </div>
        </section>
    );
}

export default IdeaToWork;