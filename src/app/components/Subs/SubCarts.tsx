"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';

import styles from "./Subs.module.scss"
import Cart from './Cart';


function SubCarts() {
    const [Mobile, setMobile] = useState<boolean>(false)
    useEffect(() => {
        if (window.innerWidth < 1300) {
            setMobile(true)
        }
    }, [])


    return (
        <div className={styles.carts}>
            <p className={styles.cartsTitle}>Abonnement-Pakete</p>

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
                        <div className={`${styles.subsCart}`}>
                            <Cart></Cart>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={`${styles.subsCart}`}>
                            <Cart></Cart></div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={`${styles.subsCart}`}>
                            <Cart></Cart></div>
                    </SwiperSlide>
                </Swiper>
            ) : (
                <div className={styles.subs}>
                    <div className={`${styles.subsCart}`}>
                        <Cart></Cart>
                    </div>
                    <div className={`${styles.subsCart}`}>
                        <Cart></Cart></div>
                    <div className={`${styles.subsCart}`}>
                        <Cart></Cart></div>
                </div>
            )}


        </div>);
}

export default SubCarts;
