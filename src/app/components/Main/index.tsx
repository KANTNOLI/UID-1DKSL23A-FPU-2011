'use client'

// import { motion } from 'framer-motion'

import { useEffect, useRef, useState } from "react";
import styles from "./Main.module.scss"
import Frame3D from "./Frame3D";

function Main() {
    const [Sizes, setSizes] = useState<DOMRect>()
    const [WinW, setWinW] = useState<number>(0)


    const canvas = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setWinW(window.innerWidth)

        setSizes(canvas.current?.getBoundingClientRect())
    }, [canvas])



    return (<section className={styles.main}>
        <p className={styles.mainTitle}>Chazen</p>
        <div ref={canvas} className={styles.mainCanvas}>
            <Frame3D position={{y: 47, z: 80}} height={Sizes?.height} width={Sizes?.width} modelPath="./women.glb"></Frame3D>
        </div>

        <p className={styles.mainDescL}>Ihr Ziel ist unsere Mission. Wir kümmern uns um jedes Detail, damit Sie sich auf das Wesentliche konzentrieren können</p>


        <p className={styles.mainDescR}>Von der ersten Idee bis zur perfekten Lösung: Ihr Vision führt uns zu außergewöhnlichen Ergebnissen</p>
    </section>);
}

export default Main;