"use client"
import { useEffect, useRef } from "react";
import styles from "./Footer.module.scss"

import { motion } from "framer-motion"
import { useInView } from 'framer-motion';
import Typed from 'typed.js';

function Footer() {

    const title = useRef(null);
    const isInView = useInView(title, {
        once: true, // Сработает только один раз
    });

    useEffect(() => {
        if (isInView) {
            const typed = new Typed(title.current, {
                strings: ['Sole Proprietor: Zakhar D. Huseu 193907304 office 1, 5-2 Maksima Goretskogo Street, Minsk, 220123, Belarus'],
                typeSpeed: 5,
                startDelay: 500,
                showCursor: false,
            });

            return () => typed.destroy();
        }
    }, [isInView]); // 👈 Зависимость от isInView

    return (
        <footer className={styles.footer}>
            <motion.p
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                className={styles.footerTitle}>Kontaktieren Sie uns</motion.p>
            <div className={styles.footerContacts}>
                <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}

                    className={styles.footerContactsImg} href="https://www.facebook.com/share/g/1C5VcFpvnv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Facebook.png" alt="Facebook" />
                </motion.a>

                <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={styles.footerContactsImg} href="https://t.me/KANTNOLI" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Telegram.png" alt="Telegram" />
                </motion.a>

                <motion.a
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    className={styles.footerContactsImg} href="https://www.instagram.com/chazen.co?igsh=bDd5Y3g4aTBvOG44&utm_source=qr" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Instagram.png" alt="Instagram" />
                </motion.a>

                <motion.a
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}

                    className={styles.footerContactsImg} href="https://www.linkedin.com/company/chazen-official" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/LinkedIn.png" alt="LinkedIn" />
                </motion.a>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                ref={title}
                className={styles.footerIP}></motion.p>
        </footer>
    );
}

export default Footer;