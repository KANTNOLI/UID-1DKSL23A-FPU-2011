'use client'

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"

import styles from "./Why.module.scss"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

function Why() {
    const LanguageGetting: any = useSelector((state: RootState) => state.data.LanguageActive)
    const LANG_ = LanguageGetting.Why

    useEffect(() => {
        console.log("Change Language");
    }, [LanguageGetting])

    const [Mobile, setMobile] = useState<number>(0)

    useEffect(() => {
        setMobile(window.innerWidth)
    }, [LanguageGetting])

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
                        <motion.div
                            initial={{ opacity: 0, x: -25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}

                            className={styles.contDiv}>
                            <p className={styles.contTitle}>{LANG_.cart1.title}</p>
                            <p className={styles.contDesc}>{LANG_.cart1.desc1}</p>
                            <p className={styles.contDesc}>{LANG_.cart1.desc2}</p>
                        </motion.div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}

                            className={styles.contDiv}>
                            <p className={styles.contTitle}>{LANG_.cart2.title}</p>
                            <p className={styles.contDesc}>{LANG_.cart2.desc1}</p>
                        </motion.div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <motion.div
                            initial={{ opacity: 0, x: 25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}

                            className={styles.contDiv}>
                            <p className={styles.contTitle}>{LANG_.cart3.title}</p>
                            <p className={styles.contDesc}>{LANG_.cart3.desc1}</p>
                            <p className={styles.contDesc}>{LANG_.cart3.desc2}</p>
                        </motion.div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={styles.contDiv}>
                            <p className={styles.contTitle}>{LANG_.cart4.title}</p>
                            <p className={styles.contDesc}>{LANG_.cart4.desc1}</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={styles.contDiv}>
                            <p className={styles.contTitle}>{LANG_.cart5.title}</p>
                            <p className={styles.contDesc}>{LANG_.cart5.desc1}</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* <div ref={canvas} className={styles.canva}>
                <Frame3D position={{ x: 0, y: 0.15, z: 0.4 }} height={Sizes?.height} width={Sizes?.width} modelPath="./lisa.glb"></Frame3D>
            </div> */}

            <p className={styles.title}>{LANG_.title}</p>
            <div className={styles.wave}>
            </div>
        </section>
    );
}

export default Why;

