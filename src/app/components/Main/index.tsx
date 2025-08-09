'use client'

import { useEffect, useRef } from "react";
import styles from "./Main.module.scss"
import Frame3D from "./Frame3D";

function Main() {
    const canvas = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => {

            if (canvas.current) {
                Frame3D({ canvas: canvas.current, height: 800, width: 500 })
                console.log('123');
            }

        }, 0);
    }, [canvas])


    return (<section className={styles.main}>
        <p className={styles.mainTitle}>Kantuha</p>
        <div ref={canvas} className={styles.mainCanvas}>

        </div>

        <p className={styles.mainDescL}>We take great care in our work with our clients, specifying every detail to create something amazing</p>


        <p className={styles.mainDescR}>We take great care in our work with our clients, specifying every detail to create something amazing</p>
    </section>);
}

export default Main;