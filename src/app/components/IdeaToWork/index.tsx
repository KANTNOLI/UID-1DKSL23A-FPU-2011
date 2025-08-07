import styles from "./IdeaToWork.module.scss"

function IdeaToWork() {
    return (
        <section className={styles.idea}>
            <p className={styles.ideaTitle}>From Idea to Launch</p>

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
                    <p className={styles.planTitle}>Analysis & Technical Specification</p>
                    <p className={styles.planDesc}>
                        We gather your requirements and turn them into a clear, structured technical document.
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p2}`}>
                    <p className={styles.planTitle}>Design</p>
                    <p className={styles.planDesc}>
                        Our team creates a modern, responsive UI/UX design tailored to your goals.
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p3}`}>
                    <p className={styles.planTitle}>Approval</p>
                    <p className={styles.planDesc}>
                        You review the design, provide feedback, and we finalize everything before development.
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p4}`}>
                    <p className={styles.planTitle}>Final Revisions</p>
                    <p className={styles.planDesc}>
                        We apply your final comments and polish every detail.
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p5}`}>
                    <p className={styles.planTitle}>Testing</p>
                    <p className={styles.planDesc}>
                        We thoroughly test the website across devices and browsers to ensure stability and quality.
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p6}`}>
                    <p className={styles.planTitle}>Development</p>
                    <p className={styles.planDesc}>
                        We build the site according to the approved design and technical requirements.
                    </p>
                </div>

                <div className={`${styles.plan} ${styles.p7}`}>
                    <p className={styles.planTitle}>Turnkey Launch</p>
                    <p className={styles.planDesc}>
                        We deploy the finished product to your domain with all settings configured — ready to go.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default IdeaToWork;