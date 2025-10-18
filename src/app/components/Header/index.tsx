'use client';

import { useEffect, useState } from "react";

import Navigate from "./navigate";

import styles from "./Header.module.scss"

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

            <Navigate Mobile={Mobile} Active={MenuActive} setActive={() => {setMenuActive(false)}}/>

            <img className={styles.headerLogo} src="./logo.jpg" alt="logo.jpg" />
        </section>
    );
}

export default Header;