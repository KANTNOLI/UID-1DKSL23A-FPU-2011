'use client';

import Link from "next/link";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";

interface props {
    Mobile: boolean,
    Active: boolean,
    setActive: () => unknown
}


function Navigate({ Mobile, Active, setActive }: props) {
    const [OpenPage, setOpenPage] = useState<number>(0)

    const pageRender = [{ path: "/", name: "home", }, { path: "/product", name: "product" },
    { path: "/vacancy", name: "vacancy" }, { path: "/contacts", name: "contacts" },]


    useEffect(() => {

        console.log(OpenPage);


    }, [OpenPage])


    useEffect(() => {

    }, [Mobile, Active])

    return (

        <nav className={Active ? styles.headerNavMobile : Mobile ? styles.headerOff : styles.headerNav}>
            {pageRender.map((page, id) => (
                <Link key={id} onClick={() => { setActive(); setOpenPage(id) }} href={page.path}
                    className={OpenPage == id ? styles.active : styles.headerNavPage}>{page.name}</Link>
            ))}
        </nav>
    );
}

export default Navigate;
