'use client'

import styles from "./IdeaToWork.module.scss"

import { motion } from "framer-motion"

function IdeaToWork() {
    return (
        <section className={styles.idea}>
            <motion.p
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                className={styles.ideaTitle}>Von der Idee bis zum Launch</motion.p>

            <div className={styles.plans}>
                <motion.div
                    initial={{ opacity: 0, }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.line} ${styles.line1}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.line} ${styles.line2}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.line} ${styles.line3}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.line} ${styles.line4}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.backline} ${styles.backline1}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.backline} ${styles.backline2}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.backline} ${styles.backline3}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.backline} ${styles.backline4}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.backline} ${styles.backline5}`}></motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}

                    className={`${styles.backline} ${styles.backline6}`}></motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p1}`}>
                    <p className={styles.planTitle}>Briefing & Kundengespräch</p>
                    <p className={styles.planDesc}>
                        Detaillierte Besprechung Ihrer Vision, Ziele und Anforderungen
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p2}`}>
                    <p className={styles.planTitle}>Designentwurf</p>
                    <p className={styles.planDesc}>
                        Entwicklung eines modernen UI/UX Konzepts für Ihre Website
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p3}`}>
                    <p className={styles.planTitle}>Designüberarbeitung</p>
                    <p className={styles.planDesc}>
                        Gemeinsame Optimierung des Designs nach Ihrem Feedback
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p4}`}>
                    <p className={styles.planTitle}>Webentwicklung</p>
                    <p className={styles.planDesc}>
                        Professionelle Programmierung mit modernen Frameworks
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p5}`}>
                    <p className={styles.planTitle}>Testphase</p>
                    <p className={styles.planDesc}>
                        Gründliche Qualitätssicherung auf allen Endgeräten
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p6}`}>
                    <p className={styles.planTitle}>Launch & Einrichtung</p>
                    <p className={styles.planDesc}>
                        Live-Schaltung und technische Feinanpassungen
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p7}`}>
                    <p className={styles.planTitle}>Projektabnahme</p>
                    <p className={styles.planDesc}>
                        Finale Abnahme und offizielle Übergabe des Projekts
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default IdeaToWork;