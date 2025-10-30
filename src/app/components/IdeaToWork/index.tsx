'use client'

import styles from "./IdeaToWork.module.scss"

import { motion } from "framer-motion"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

function IdeaToWork() {
    const LanguageGetting: any = useSelector((state: RootState) => state.data.LanguageActive)
    const LANG_ = LanguageGetting.IdeaToWork

    useEffect(() => {
        console.log("Change Language");
    }, [LanguageGetting])

    return (
        <section className={styles.idea}>
            <motion.p
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                className={styles.ideaTitle}>{LANG_.title}</motion.p>

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
                    <p className={styles.planTitle}>{LANG_.step1.title}</p>
                    <p className={styles.planDesc}>
                        {LANG_.step1.desc}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p2}`}>
                    <p className={styles.planTitle}>{LANG_.step2.title}</p>
                    <p className={styles.planDesc}>
                        {LANG_.step2.desc}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p3}`}>
                    <p className={styles.planTitle}>{LANG_.step3.title}</p>
                    <p className={styles.planDesc}>
                       {LANG_.step3.desc}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p4}`}>
                    <p className={styles.planTitle}>{LANG_.step4.title}</p>
                    <p className={styles.planDesc}>
                        {LANG_.step4.desc}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p5}`}>
                    <p className={styles.planTitle}>{LANG_.step5.title}</p>
                    <p className={styles.planDesc}>
                        {LANG_.step5.desc}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p6}`}>
                    <p className={styles.planTitle}>{LANG_.step6.title}</p>
                    <p className={styles.planDesc}>
                        {LANG_.step6.desc}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={`${styles.plan} ${styles.p7}`}>
                    <p className={styles.planTitle}>{LANG_.step7.title}</p>
                    <p className={styles.planDesc}>
                        {LANG_.step7.desc}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default IdeaToWork;