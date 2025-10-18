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

function SubCarts() {
    const [Mobile, setMobile] = useState<boolean>(false)
    useEffect(() => {
        if (window.innerWidth < 1300) {
            setMobile(true)
        }
    }, [])

    return (
        <div className={styles.carts}>
            <motion.p
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeInOut" }}

                className={styles.cartsTitle}>Abonnement-Pakete</motion.p>

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
                            <p className={styles.scTitle}>Basis</p>
                            <p className={styles.scPrice}>0€</p>

                            <p className={styles.scDesc1}>Website-Installation</p>
                            <p className={styles.scDesc2}>Konfiguration & Einrichtung</p>
                            <p className={styles.scDesc3}>Qualitätsgarantie</p>

                            <p className={styles.scSelect}>Select</p>
                        </motion.a>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <motion.a
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}

                            href='http://localhost:7777/product?s=Standard' className={`${styles.subsCart}`}>
                            <p className={styles.scTitle}>Standard</p>
                            <p className={styles.scPrice}>10€</p>

                            <p className={styles.scDesc1}>Erweiterter Schutzn</p>
                            <p className={styles.scDesc2}>Premium-Garantie</p>
                            <p className={styles.scDesc3}>Website-Support</p>

                            <p className={styles.scSelect}>Select</p>
                        </motion.a>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <motion.a
                            initial={{ opacity: 0, x: 25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}

                            href='http://localhost:7777/product?s=Premium' className={`${styles.subsCart}`}>
                            <p className={styles.scTitle}>Premium</p>
                            <p className={styles.scPrice}>25€</p>

                            <p className={styles.scDesc1}>Aktive Unterstützung</p>
                            <p className={styles.scDesc2}>Rund-um-die-Uhr-Monitoring</p>
                            <p className={styles.scDesc3}>Intelligente Automation</p>

                            <p className={styles.scSelect}>Select</p>
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
                        <p className={styles.scTitle}>Basis</p>
                        <p className={styles.scPrice}>0€</p>

                        <p className={styles.scDesc1}>Website-Installation</p>
                        <p className={styles.scDesc2}>Konfiguration & Einrichtung</p>
                        <p className={styles.scDesc3}>Qualitätsgarantie</p>

                        <p className={styles.scSelect}>Select</p>
                    </motion.a>
                    <motion.a
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}

                        href='http://localhost:7777/product?s=Standard' className={`${styles.subsCart}`}>
                        <p className={styles.scTitle}>Standard</p>
                        <p className={styles.scPrice}>10€</p>

                        <p className={styles.scDesc1}>Erweiterter Schutzn</p>
                        <p className={styles.scDesc2}>Premium-Garantie</p>
                        <p className={styles.scDesc3}>Website-Support</p>

                        <p className={styles.scSelect}>Select</p>
                    </motion.a>
                    <motion.a
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}

                        href='http://localhost:7777/product?s=Premium' className={`${styles.subsCart}`}>
                        <p className={styles.scTitle}>Premium</p>
                        <p className={styles.scPrice}>25€</p>

                        <p className={styles.scDesc1}>Aktive Unterstützung</p>
                        <p className={styles.scDesc2}>Rund-um-die-Uhr-Monitoring</p>
                        <p className={styles.scDesc3}>Intelligente Automation</p>

                        <p className={styles.scSelect}>Select</p>
                    </motion.a>
                </div>
            )}


        </div>);
}

export default SubCarts;
