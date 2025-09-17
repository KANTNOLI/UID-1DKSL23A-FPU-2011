'use client'

import { useEffect, useRef, useState } from "react"
import styles from "./Why.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"
import Frame3D from "../Frame3D";

function Why() {
    const [Sizes, setSizes] = useState<DOMRect>()
    const [Mobile, setMobile] = useState<number>(0)

    const canvas = useRef<HTMLDivElement>(null)
    useEffect(() => {
        setMobile(window.innerWidth)


    }, [])

    useEffect(() => {

        setSizes(canvas.current?.getBoundingClientRect())
    }, [canvas])

    return (
        <section className={styles.why}>
            <div className={styles.animBack}>
                <div className={styles.animBackDiv1}></div>
                <div className={styles.animBackDiv2}></div>
                <div className={styles.animBackDiv3}></div>


                <div className={styles.animBackDiv4}></div>
                <div className={styles.animBackDiv5}></div>
                <div className={styles.animBackDiv6}></div>

                <div className={styles.animBackResult}></div>
            </div>

            <div className={styles.cont}>
                <Swiper className={styles.cont}
                    effect={'coverflow'}
                    slidesPerView={Mobile < 700 ? 1 : 3}
                    grabCursor={true}
                    initialSlide={1}
                    centeredSlides={true}
                    loop={Mobile > 700}
                    pagination={Mobile < 700}
                    coverflowEffect={{
                        rotate: -30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                            slideShadows: false,
                        }}
                    modules={[EffectCoverflow, Pagination]}>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={styles.contDiv}>
                            <p className={styles.contTitle}>Kundenorientierte Denkweise</p>
                            <p className={styles.contDesc}>Ihr Komfort steht stets im Fokus unserer Arbeit, denn Ihr Erfolg ist unser größtes Anliegen</p>
                            <p className={styles.contDesc}>Wir setzen auf nachhaltige Lösungen, die genau auf Ihre Bedürfnisse zugeschnitten sind</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={styles.contDiv}>
                            <p className={styles.contTitle}>Aktuelle Designlösungen</p>
                            <p className={styles.contDesc}>Moderne und ästhetisch ansprechende Oberflächen, die nicht nur visuell überzeugen, sondern auch intuitiv zu bedienen sind und Ihre Marke perfekt in Szene setzen</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={styles.contDiv}>
                            <p className={styles.contTitle}>Komplex? Wir lieben das!</p>
                            <p className={styles.contDesc}>Für uns gibt es keine unlösbaren Aufgaben</p>
                            <p className={styles.contDesc}>Gerade die anspruchsvollsten Projekte begeistern uns und fordern unsere kreative Expertise heraus</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={styles.contDiv}>
                            <p className={styles.contTitle}>Sauberer Code</p>
                            <p className={styles.contDesc}>Durch strukturierte und klar dokumentierte Programmierung gewährleisten wir, dass Ihre Website auch langfristig leicht zu pflegen und zu erweitern bleibt</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={styles.contDiv}>
                            <p className={styles.contTitle}>Transparenz</p>
                            <p className={styles.contDesc}>Volle Einsicht in alle Prozesse und Entscheidungen, damit Sie stets die Kontrolle behalten und jederzeit informiert sind</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* <div ref={canvas} className={styles.canva}>
                <Frame3D position={{ x: 0, y: 0.15, z: 0.4 }} height={Sizes?.height} width={Sizes?.width} modelPath="./lisa.glb"></Frame3D>
            </div> */}

            <p className={styles.title}>Warum wir?</p>
            <div className={styles.wave}>
            </div>
        </section>
    );
}

export default Why;

