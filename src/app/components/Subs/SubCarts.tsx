"use client"

import React, { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import styles from "./Subs.module.scss"

import { motion } from "framer-motion"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function SubCarts() {
    const LanguageGetting: any = useSelector((state: RootState) => state.data.LanguageActive)
    const LANG_ = LanguageGetting.Subs

    useEffect(() => {
        console.log("Change Language");
    }, [LanguageGetting])

    const [Mobile, setMobile] = useState<boolean>(false)
    useEffect(() => {
        if (window.innerWidth < 1300) {
            setMobile(true)
        }
    }, [LanguageGetting])

    return (
        <div className={styles.carts}>
            <motion.p
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                className={styles.cartsTitle}>{LANG_.title}</motion.p>

            {Mobile ? (
                <Swiper className={styles.subs}
                    effect={'coverflow'}
                    slidesPerView={window.innerWidth < 800 ? 1 : 2}
                    grabCursor={true}
                    initialSlide={1}
                    centeredSlides={true}
                    pagination={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    modules={[EffectCoverflow, Pagination]}>
                    <SwiperSlide className={styles.subsSwiper}>
                        <motion.a
                            initial={{ opacity: 0, x: -25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}

                            href='http://localhost:7777/product?s=basic' className={`${styles.subsCart}`}>
                            <p className={styles.scTitle}>{LANG_.cart1.title}</p>
                            <p className={styles.scPrice}>{LANG_.cart1.price}</p>

                            <p className={styles.scDesc1}>{LANG_.cart1.desc1}</p>
                            <p className={styles.scDesc2}>{LANG_.cart1.desc2}</p>
                            <p className={styles.scDesc3}>{LANG_.cart1.desc3}</p>

                            <p className={styles.scSelect}>{LANG_.select}</p>
                        </motion.a>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <motion.a
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}

                            href='http://localhost:7777/product?s=Standard' className={`${styles.subsCart}`}>
                            <p className={styles.scTitle}>{LANG_.cart2.title}</p>
                            <p className={styles.scPrice}>{LANG_.cart2.price}</p>

                            <p className={styles.scDesc1}>{LANG_.cart2.desc1}</p>
                            <p className={styles.scDesc2}>{LANG_.cart2.desc2}</p>
                            <p className={styles.scDesc3}>{LANG_.cart2.desc3}</p>

                            <p className={styles.scSelect}>{LANG_.select}</p>
                        </motion.a>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <motion.a
                            initial={{ opacity: 0, x: 25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}

                            href='http://localhost:7777/product?s=Premium' className={`${styles.subsCart}`}>
                            <p className={styles.scTitle}>{LANG_.cart3.title}</p>
                            <p className={styles.scPrice}>{LANG_.cart3.price}</p>

                            <p className={styles.scDesc1}>{LANG_.cart3.desc1}</p>
                            <p className={styles.scDesc2}>{LANG_.cart3.desc2}</p>
                            <p className={styles.scDesc3}>{LANG_.cart3.desc3}</p>

                            <p className={styles.scSelect}>{LANG_.select}</p>
                        </motion.a>
                    </SwiperSlide>
                </Swiper>
            ) : (
                <div className={styles.subs}>
                    <motion.a
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}

                        href='http://localhost:7777/product?s=basic' className={`${styles.subsCart}`}>
                        <p className={styles.scTitle}>{LANG_.cart1.title}</p>
                        <p className={styles.scPrice}>{LANG_.cart1.price}</p>

                        <p className={styles.scDesc1}>{LANG_.cart1.desc1}</p>
                        <p className={styles.scDesc2}>{LANG_.cart1.desc2}</p>
                        <p className={styles.scDesc3}>{LANG_.cart1.desc3}</p>

                        <p className={styles.scSelect}>{LANG_.select}</p>
                    </motion.a>
                    <motion.a
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}

                        href='http://localhost:7777/product?s=Standard' className={`${styles.subsCart}`}>
                        <p className={styles.scTitle}>{LANG_.cart2.title}</p>
                        <p className={styles.scPrice}>{LANG_.cart2.price}</p>

                        <p className={styles.scDesc1}>{LANG_.cart2.desc1}</p>
                        <p className={styles.scDesc2}>{LANG_.cart2.desc2}</p>
                        <p className={styles.scDesc3}>{LANG_.cart2.desc3}</p>

                        <p className={styles.scSelect}>{LANG_.select}</p>
                    </motion.a>
                    <motion.a
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}

                        href='http://localhost:7777/product?s=Premium' className={`${styles.subsCart}`}>
                        <p className={styles.scTitle}>{LANG_.cart3.title}</p>
                        <p className={styles.scPrice}>{LANG_.cart3.price}</p>

                        <p className={styles.scDesc1}>{LANG_.cart3.desc1}</p>
                        <p className={styles.scDesc2}>{LANG_.cart3.desc2}</p>
                        <p className={styles.scDesc3}>{LANG_.cart3.desc3}</p>

                        <p className={styles.scSelect}>{LANG_.select}</p>
                    </motion.a>
                </div>
            )}


        </div>);
}

export default SubCarts;
