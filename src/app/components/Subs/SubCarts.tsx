"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from "./Subs.module.scss"
import { useEffect, useState } from 'react';

function SubCarts() {
    const [Mobile, setMobile] = useState<boolean>(false)
    useEffect(() => {
        if (window.innerWidth < 1300) {
            setMobile(true)
        }
    }, [])


    return (
        <div className={styles.carts}>
            <p className={styles.cartsTitle}>Subscription Plans</p>

            {Mobile ? (
                <Swiper className={styles.subs}
                    spaceBetween={50}
                    slidesPerView={1}>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={`${styles.subsCart} ${styles.subsCart1}`}></div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={`${styles.subsCart} ${styles.subsCart2}`}></div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={`${styles.subsCart} ${styles.subsCart3}`}></div>
                    </SwiperSlide>
                </Swiper>
            ) : (
                <div className={styles.subs}>
                    <div className={`${styles.subsCart} ${styles.subsCart1}`}></div>
                    <div className={`${styles.subsCart} ${styles.subsCart2}`}></div>
                    <div className={`${styles.subsCart} ${styles.subsCart3}`}></div>
                </div>
            )}


        </div>);
}

export default SubCarts;
