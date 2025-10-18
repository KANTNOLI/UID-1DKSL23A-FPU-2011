'use client'

import { useEffect, useRef } from "react";
import style from "./Vacancy.module.scss"
import { useInView } from "framer-motion";
import Typed from "typed.js";

export default function Home() {

    const title = useRef(null);
    const isInView = useInView(title, {
        once: true, // Сработает только один раз
    });

    useEffect(() => {
        if (isInView) {
            const typed = new Typed(title.current, {
                strings: ['In Entwicklung! :D'],
                typeSpeed: 30,
                startDelay: 100,
                showCursor: false,
            });

            return () => typed.destroy();
        }
    }, [isInView]); // 👈 Зависимость от isInView


    const title2 = useRef(null);
    const isInView2 = useInView(title, {
        once: true, // Сработает только один раз
    });

    useEffect(() => {
        if (isInView2) {
            const typed = new Typed(title2.current, {
                strings: ['Aktuelle Stellenangebote auf LinkedIn!'],
                typeSpeed: 10,
                startDelay: 1000,
                showCursor: false,
            });

            return () => typed.destroy();
        }
    }, [isInView2]); // 👈 Зависимость от isInView

    return (
        <section className={style.body}>
            <p ref={title} className={style.work}></p>
            <p ref={title2} className={style.work2}></p>
        </section>
    );
}
