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

    const text1 = {
        title: {
            text: "Basis",
            pos: {
                x: 0,
                y: 1.2,
                z: 0
            },
            sizes: {
                w: 1.0,
                h: 0.55
            }
        },
        price: {
            text: "5€",
            pos: {
                x: 0,
                y: 0.6,
                z: 0
            },
            sizes: {
                w: 0.9,
                h: 0.78
            }
        },
        desc1: {
            text: "Website-Installation",
            pos: {
                x: 0,
                y: -0.2,
                z: 0
            },
            sizes: {
                w: 1.6,
                h: 0.4
            }
        },
        desc2: {
            text: "Konfiguration & Einrichtung",
            pos: {
                x: 0,
                y: -0.4,
                z: 0
            },
            sizes: {
                w: 1.9,
                h: 0.4
            }
        },
        desc3: {
            text: "Qualitätsgarantie",
            pos: {
                x: 0,
                y: -0.6,
                z: 0
            },
            sizes: {
                w: 1.5,
                h: 0.4
            }
        },
        select: {
            text: "Select",
            pos: {
                x: 0,
                y: -1.3,
                z: 0
            },
            sizes: {
                w: 1.0,
                h: 0.5
            }
        },
    }

    const text2 = {
        title: {
            text: "Standard",
            pos: {
                x: 0,
                y: 1.2,
                z: 0
            },
            sizes: {
                w: 1.6,
                h: 0.55
            }
        },
        price: {
            text: "10€",
            pos: {
                x: 0,
                y: 0.6,
                z: 0
            },
            sizes: {
                w: 1.2,
                h: 0.78
            }
        },
        desc1: {
            text: "Erweiterter Schutz",
            pos: {
                x: 0,
                y: -0.2,
                z: 0
            },
            sizes: {
                w: 1.6,
                h: 0.4
            }
        },
        desc2: {
            text: "Website-Support",
            pos: {
                x: 0,
                y: -0.4,
                z: 0
            },
            sizes: {
                w: 1.4,
                h: 0.45
            }
        },
        desc3: {
            text: "Premium-Garantie",
            pos: {
                x: 0,
                y: -0.6,
                z: 0
            },
            sizes: {
                w: 1.6,
                h: 0.40
            }
        },
        select: {
            text: "Select",
            pos: {
                x: 0,
                y: -1.3,
                z: 0
            },
            sizes: {
                w: 1.0,
                h: 0.5
            }
        },
    }

    const text3 = {
        title: {
            text: "Premium",
            pos: {
                x: 0,
                y: 1.2,
                z: 0
            },
            sizes: {
                w: 1.65,
                h: 0.55
            }
        },
        price: {
            text: "25€",
            pos: {
                x: 0,
                y: 0.6,
                z: 0
            },
            sizes: {
                w: 1.2,
                h: 0.78
            }
        },
        desc1: {
            text: "Aktive Unterstützung",
            pos: {
                x: 0,
                y: -0.2,
                z: 0
            },
            sizes: {
                w: 1.6,
                h: 0.4
            }
        },
        desc2: {
            text: "Rund-um-die-Uhr-Monitoring",
            pos: {
                x: 0,
                y: -0.4,
                z: 0
            },
            sizes: {
                w: 1.9,
                h: 0.4
            }
        },
        desc3: {
            text: "Intelligente Automation",
            pos: {
                x: 0,
                y: -0.6,
                z: 0
            },
            sizes: {
                w: 1.8,
                h: 0.4
            }
        },
        select: {
            text: "Select",
            pos: {
                x: 0,
                y: -1.3,
                z: 0
            },
            sizes: {
                w: 1.0,
                h: 0.5
            }
        },
    }

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
                            <Cart texts={text1}></Cart>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={`${styles.subsCart}`}>
                            <Cart texts={text2}></Cart>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.subsSwiper}>
                        <div className={`${styles.subsCart}`}>
                            <Cart texts={text3}></Cart>
                        </div>
                    </SwiperSlide>
                </Swiper>
            ) : (
                <div className={styles.subs}>
                    <div className={`${styles.subsCart}`}>
                        
                    </div>
                    <div className={`${styles.subsCart}`}>
                        123
                    </div>
                    <div className={`${styles.subsCart}`}>
                        123
                    </div>
                </div>
            )}


        </div>);
}

export default SubCarts;
