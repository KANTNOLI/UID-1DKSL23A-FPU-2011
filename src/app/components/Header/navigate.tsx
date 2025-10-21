'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./Header.module.scss";

interface props {
    Mobile: boolean,
    Active: boolean,
    setActive: () => unknown
}

function Navigate({ Mobile, Active, setActive }: props) {
    const [OpenPage, setOpenPage] = useState<number>(-1)

    const pathname = usePathname(); // вернет '/product'
    const segment = pathname.split('/')[1]; // вернет 'product'


    const pageRender = [
        { path: "/", name: "Startseite", },
        { path: "/product", name: "Produkt" },
        { path: "/vacancy", name: "Stellenangebot" },
        { path: "/contacts", name: "Kontakte" }]

    if (segment == "track" || segment == "admin") {
        pageRender.push({
            path: "/track",
            name: "Bestellstatus"
        })
    }


    useEffect(() => {
        if (segment == "track" || segment == "admin") {
            pageRender.push({
                path: "/track",
                name: "Bestellstatus"
            })
        }

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
            case "track":
                setOpenPage(4)
                break;
            case "":
                setOpenPage(0)
                break;
            default:
                setOpenPage(-1)
                break;
        }
    }, [OpenPage, pathname])

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
