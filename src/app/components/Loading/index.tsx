// components/SimpleLoader.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import style from "./Loading.module.scss"

export default function SimpleLoader() {
    const [showLoader, setShowLoader] = useState(true);
    const [Animation, setAnimation] = useState(false);
    const scrollY = useRef(0);

    useEffect(() => {
        scrollY.current = window.scrollY;

        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.touchAction = 'none';
        document.body.style.pointerEvents = 'none';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100vh';

        const timer1 = setTimeout(() => {
            setAnimation(true)
        }, 1000);


        const timer2 = setTimeout(() => {
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.style.touchAction = '';
            document.body.style.pointerEvents = '';
            document.documentElement.style.overflow = '';
            document.documentElement.style.height = '';
            window.scrollTo(0, 0);

            setShowLoader(false);
        }, 2000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);

            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.style.touchAction = '';
            document.body.style.pointerEvents = '';
            document.documentElement.style.overflow = '';
            document.documentElement.style.height = '';
        };
    }, []);

    if (!showLoader) return null;

    return (
        <div className={style.load}>
            <div className={`${style.loadSideT} ${Animation ? style.loadSideTStart : ''}`}>
            </div>
            <p className={`${style.loadBarShadow} ${Animation ? style.loadBarShadowStart : ''}`}></p>
            <p className={`${style.loadBar} ${Animation ? style.loadBarStart : ''}`}></p>
            <div className={`${style.loadSideB} ${Animation ? style.loadSideBStart : ''}`}>
            </div>
        </div>
    );
}