'use client';

import { useCallback, useEffect, useRef, useState } from "react";

import Navigate from "./navigate";

import styles from "./Header.module.scss"

import { motion } from "framer-motion"

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from '../../../redux/store'
import { setForm, setLanguage } from "@/redux/features/language/dataSlice";

interface LangIntf {
    name: string,
    shortName: string
}

type LangType = "De" | "En" | "Ru"

interface Languages {
    De: LangIntf;
    En: LangIntf;
    Ru: LangIntf;
}

interface dataState {
    language: LangType;
    mail: string;
    phone?: number | null;
    LanguageActive?: object;
}

interface GetForm {
    mail: string;
    phone: number;
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
    //
    //
    //

    const UserSettings = useSelector((state: RootState) => state.data)
    const Dispatch = useDispatch()


    const LangList: LangType[] = ["De", "En", "Ru"]
    const languages: Languages = {
        De: {
            name: "Deutsch",
            shortName: "De"
        },
        En: {
            name: "English",
            shortName: "En"
        },
        Ru: {
            name: "Русский",
            shortName: "Ru"
        }
    };

    const [LangChoose, setLangChoose] = useState<LangType>(UserSettings.language);

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

        const handleItemClick = () => {
            setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        const dropdownElement = dropdownRef.current;
        if (dropdownElement) {
            dropdownElement.addEventListener('click', handleItemClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (dropdownElement) {
                dropdownElement.removeEventListener('click', handleItemClick);
            }
        };
    }, []);


    const KEY_LS_SETTINGS = "@2JH/s8oFa3[a.asd2@"

    const handleSetLanguage = useCallback(
        (chooseLang: LangType) => {
            if (LangChoose != chooseLang) {

                const getData: dataState = JSON.parse(localStorage.getItem(KEY_LS_SETTINGS) + "")

                if (getData) {

                    Dispatch(setLanguage(chooseLang))
                    Dispatch(setForm(getData as GetForm))
                    setLangChoose(chooseLang)

                    localStorage.setItem(KEY_LS_SETTINGS, JSON.stringify({
                        language: chooseLang,
                        mail: getData.mail,
                        phone: getData.phone,
                    }))
                }
            }
        },
        [setLangChoose, UserSettings, setLanguage, Dispatch],
    )

    useEffect(() => {
        setLangChoose(UserSettings.language)
    }, [UserSettings])


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
                    {LangList.map((shortLang, lID) => (
                        <div onClick={() => handleSetLanguage(shortLang)}
                            key={lID} className={shortLang == LangChoose ? `${styles.langActive}` : ""}>{languages[shortLang].name}</div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Header;