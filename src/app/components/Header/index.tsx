'use client';

import { useEffect, useState } from "react";

import Navigate from "./navigate";

import styles from "./Header.module.scss"

import { motion } from "framer-motion"

function Header() {
    const [Mobile, setMobile] = useState<boolean>(false)
    const [MenuActive, setMenuActive] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth < 1000) {
            setMobile(true)
        }
    }, [])

    return (
        <section className={styles.header}>
            {Mobile &&
                <div onClick={() => { setMenuActive(before => !before) }} className={styles.menu}>
                    <p className={MenuActive ? styles.menuP1Active : ""}></p>
                    <p className={MenuActive ? styles.menuP2Active : ""}></p>
                    <p className={MenuActive ? styles.menuP3Active : ""}></p>
                </div>}

            <Navigate Mobile={Mobile} Active={MenuActive} setActive={() => { setMenuActive(false) }} />

            <motion.img
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                className={styles.headerLogo} src="./logo.jpg" alt="logo.jpg" />
        </section>
    );
}

export default Header;