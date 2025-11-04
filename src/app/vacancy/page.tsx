'use client'

import { useEffect, useRef } from "react";
import style from "./Vacancy.module.scss"
import { useInView } from "framer-motion";
import Typed from "typed.js";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BreadcrumbData } from "../breadcrumb-data";

export default function Home() {
    useEffect(() => {
        document.title = "Chazen | Careers & Job Opportunities"
    }, [])

    const LanguageGetting: any = useSelector((state: RootState) => state.data.LanguageActive)
    const LANG_ = LanguageGetting.vacancy

    useEffect(() => {
        console.log("Change Language");
    }, [LanguageGetting])

    const title = useRef(null);
    const isInView = useInView(title, {
        once: true, // Сработает только один раз
    });

    useEffect(() => {
        if (isInView) {
            const typed = new Typed(title.current, {
                strings: [LANG_.title1],
                typeSpeed: 30,
                startDelay: 100,
                showCursor: false,
            });

            return () => typed.destroy();
        }
    }, [isInView, LanguageGetting]); // 👈 Зависимость от isInView


    const title2 = useRef(null);
    const isInView2 = useInView(title, {
        once: true, // Сработает только один раз
    });

    useEffect(() => {
        if (isInView2) {
            const typed = new Typed(title2.current, {
                strings: [LANG_.title2],
                typeSpeed: 10,
                startDelay: 1000,
                showCursor: false,
            });

            return () => typed.destroy();
        }
    }, [isInView2, LanguageGetting]); // 👈 Зависимость от isInView

    return (
        <section className={style.body}>
            <BreadcrumbData pathname="/vacancy" />
            <p ref={title} className={style.work}></p>
            <p ref={title2} className={style.work2}></p>
        </section>
    );
}
