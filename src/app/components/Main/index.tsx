'use client'

// import { motion } from 'framer-motion'

import { useEffect, useRef, useState } from "react";
import styles from "./Main.module.scss"
import Frame3D from "./Frame3D";

function Main() {
    const [Sizes, setSizes] = useState<DOMRect>()

    const canvas = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log(window.innerWidth);
        

        setSizes(canvas.current?.getBoundingClientRect())
    }, [canvas])



    return (<section className={styles.main}>
        <p className={styles.mainTitle}>{window.innerWidth > 500 ? "Chazen" : "Chazen"}</p>
        <div ref={canvas} className={styles.mainCanvas}>
            <Frame3D height={Sizes?.height} width={Sizes?.width} modelPath="./homeM.glb"></Frame3D>
        </div>

        <p className={styles.mainDescL}>We take great care in our work with our clients, specifying every detail to create something amazing</p>


        <p className={styles.mainDescR}>We take great care in our work with our clients, specifying every detail to create something amazing</p>
    </section>);
}

export default Main;