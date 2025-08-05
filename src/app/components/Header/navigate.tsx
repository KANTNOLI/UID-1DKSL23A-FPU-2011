'use client';

import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef } from "react";
import styles from "./Header.module.scss";

// interface LinksIntf {
//     [key: string]: HTMLAnchorElement | null;
// }

function Navigate() {
    // const page1 = useRef<HTMLAnchorElement>(null);
    // const page2 = useRef<HTMLAnchorElement>(null);
    // const page3 = useRef<HTMLAnchorElement>(null);
    // const page4 = useRef<HTMLAnchorElement>(null);
    // const pageActive = useRef<HTMLDivElement>(null);

    // const pathname = usePathname();
    // const route = pathname.startsWith('/') ? pathname.substring(1) : pathname;


    return (
        <nav className={styles.headerNav}>
            <Link href="/" className={styles.headerNavPage}>home</Link>
            <Link href="/a" className={styles.headerNavPage}>product</Link>
            <Link href="/b" className={styles.headerNavPage}>vacancy</Link>
            <Link href="/c" className={styles.headerNavPage}>contacts</Link>
        </nav>
    );
}

export default Navigate;
