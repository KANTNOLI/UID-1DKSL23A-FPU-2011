'use client';

import { useEffect, useRef, useState } from "react";

import Navigate from "./navigate";

import styles from "./Header.module.scss"

import { motion } from "framer-motion"

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

interface LangIntf {
    name: string,
    shortName: string
}

function Header() {
    const [Mobile, setMobile] = useState<boolean>(false)
    const [MenuActive, setMenuActive] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth < 1000) {
            setMobile(true)
        }
    }, [])

    useEffect(() => {
        if (MenuActive) {
            disableBodyScroll(document.body);
        } else {
            enableBodyScroll(document.body);
        }
    }, [MenuActive]);

    // Lang choose
    const langArray: LangIntf[] = [{
        name: "Deutsch",
        shortName: "De"
    }, {
        name: "English",
        shortName: "En"
    }, {
        name: "Русский",
        shortName: "Ru"
    }]

    const langKeys = {
        "De": "Deutsch",
        "En": "English",
        "Ru": "Русский"
    }


    const [LangChoose, setLangChoose] = useState<string>("De");

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Закрытие при клике вне меню
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section className={styles.header}>
            {Mobile &&
                <div onClick={() => { setMenuActive(before => !before) }} className={styles.menu}>
                    <p className={MenuActive ? styles.menuP1Active : ""}></p>
                    <p className={MenuActive ? styles.menuP2Active : ""}></p>
                    <p className={MenuActive ? styles.menuP3Active : ""}></p>
                </div>}

            <Navigate Mobile={Mobile} Active={MenuActive} setActive={() => { setMenuActive(false) }} />

            {/* <motion.img
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                className={styles.headerLogo} src="./logo.jpg" alt="logo.jpg" /> */}

            <div ref={dropdownRef} className={styles.lang}>
                <button className={styles.dropdownBtn} onClick={toggleDropdown}>
                    {LangChoose}
                </button>
                <div className={`${styles.dropdownContent} ${isOpen ? styles.show : ''}`}>
                    {langArray.map((l, lID) => (
                        <div key={lID} className={l.shortName == LangChoose ? `${styles.langActive}` : ""}>{l.name}</div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Header;