'use client';

import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";

interface props {
    Mobile: boolean,
    Active: boolean,
    setActive: () => unknown
}


function Navigate({ Mobile, Active, setActive }: props) {
    const [OpenPage, setOpenPage] = useState<number>(-1)

    const pageRender = [{ path: "/", name: "home", }, { path: "/product", name: "product" },
    { path: "/vacancy", name: "vacancy" }, { path: "/contacts", name: "contacts" },]

    const pathname = usePathname(); // вернет '/product'
    const segment = pathname.split('/')[1]; // вернет 'product'

    useEffect(() => {
        switch (segment) {
            case "product":
                setOpenPage(1)
                break;
            case "vacancy":
                setOpenPage(2)
                break;
            case "contacts":
                setOpenPage(3)
                break;
            case "":
                setOpenPage(0)
                break;

            default:
                setOpenPage(-1)
                break;
        }


    }, [OpenPage])


    useEffect(() => {

    }, [Mobile, Active])

    return (

        <nav className={Active ? styles.headerNavMobile : Mobile ? styles.headerOff : styles.headerNav}>
            {pageRender.map((page, id) => (
                <a key={id} onClick={() => { setActive(); setOpenPage(id) }} href={page.path}
                    className={OpenPage == id ? styles.active : styles.headerNavPage}>{page.name}</a>
            ))}
        </nav>
    );
}

export default Navigate;
