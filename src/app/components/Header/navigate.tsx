'use client';

import Link from "next/link";
import styles from "./Header.module.scss";
import { useEffect } from "react";

interface props {
    Mobile: boolean,
    Active: boolean,
    setActive: () => any
}

function Navigate({ Mobile, Active, setActive }: props) {

    useEffect(() => {

    }, [Active])


    return (

        <nav className={Active ? styles.headerNavMobile : Mobile ? styles.headerOff : styles.headerNav}>
            <Link onClick={() => setActive()} href="/" className={styles.headerNavPage}>home</Link>
            <Link onClick={() => setActive()} href="/product" className={styles.headerNavPage}>product</Link>
            <Link onClick={() => setActive()} href="/vacancy" className={styles.headerNavPage}>vacancy</Link>
            <Link onClick={() => setActive()} href="/contacts" className={styles.headerNavPage}>contacts</Link>
        </nav>
    );
}

export default Navigate;
