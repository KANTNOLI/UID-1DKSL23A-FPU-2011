'use client'

import { useEffect, useRef, useState } from "react";

import Frame3D from "../Frame3D";

import styles from "./Main.module.scss"

import { motion } from "framer-motion"
import Typed from 'typed.js';

function Main() {
    const [Sizes, setSizes] = useState<DOMRect>()

    const canvas = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setSizes(canvas.current?.getBoundingClientRect())
    }, [canvas])

    const title = useRef(null);
    useEffect(() => {
        const typed = new Typed(title.current, {
            strings: ['Chazen'],
            typeSpeed: 70,
            startDelay: 500,
            showCursor: false,
        });

        return () => typed.destroy();
    }, []);


    return (<section className={styles.main}>
        <motion.p
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}

            ref={title}
            className={styles.mainTitle}></motion.p>
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}

            ref={canvas} className={styles.mainCanvas}>
            <Frame3D position={{ x: 0, y: 47, z: 80 }} height={Sizes?.height} width={Sizes?.width} modelPath="./women.glb"></Frame3D>
        </motion.div>

        <motion.p
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}

            className={styles.mainDescL}>Ihr Ziel ist unsere Mission. Wir kümmern uns um jedes Detail, damit Sie sich auf das Wesentliche konzentrieren können</motion.p>


        <motion.p
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}

            className={styles.mainDescR}>Von der ersten Idee bis zur perfekten Lösung: Ihr Vision führt uns zu außergewöhnlichen Ergebnissen</motion.p>
    </section>);
}

export default Main;