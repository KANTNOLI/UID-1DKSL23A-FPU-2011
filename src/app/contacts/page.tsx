"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios"

import Frame3D from "../components/Frame3D";
import { motion, useInView } from "framer-motion"

import style from "./Contact.module.scss"
import Typed from "typed.js";

interface SendDataIntf {
    type: string,
    mail: string,
    phone: string | number,
    desc: string,
}

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
    const LanguageGetting: any = useSelector((state: RootState) => state.data.LanguageActive)
    const LANG_ = LanguageGetting.contacts

    useEffect(() => {
        console.log("Change Language");
    }, [LanguageGetting])

    const MainInput = useRef<HTMLInputElement>(null)
    const PhoneInput = useRef<HTMLInputElement>(null)
    const DescInput = useRef<HTMLTextAreaElement>(null)

    const [Mail, setMail] = useState<string>("")
    const [Phone, setPhone] = useState<number | null>(null)
    const [Desc, setDesc] = useState<string>("")

    const sendData = useCallback(
        () => {
            const Body: SendDataIntf = {
                type: "contacts",
                mail: Mail,
                phone: Phone + "",
                desc: Desc,
            }

            // Тест почты
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (Mail === "") {
                MainInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    MainInput.current?.classList.remove(style.warn)
                }, 500);
                console.log("mail", 1);
                return -1
            } else if (!emailRegex.test(Mail)) {
                MainInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    MainInput.current?.classList.remove(style.warn)
                }, 500);
                console.log("mail", 2);
                return -1
            }

            // Тест Телефона
            // Проверяет телефон без + (только цифры, возможно с пробелами и скобками)
            // Минимум 5 цифр, максимум 15
            // Убираем все не-цифры для проверки длины
            const digitsOnly = Phone + "".replace(/\D/g, '');
            if (Phone + "" === "") {
                PhoneInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    PhoneInput.current?.classList.remove(style.warn)
                }, 500);
                console.log("phone", 1);
                return -1
            } else if (digitsOnly.length < 5 || digitsOnly.length > 15) {
                PhoneInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    PhoneInput.current?.classList.remove(style.warn)
                }, 500);
                console.log("phone", 2);
                return -1
            } else if (!/^\d+$/.test(digitsOnly)) {
                PhoneInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    PhoneInput.current?.classList.remove(style.warn)
                }, 500);
                console.log("phone", 3);
                return -1
            }

            if (Desc.length < 10) {
                DescInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    DescInput.current?.classList.remove(style.warn)
                }, 500);
                console.log("desc", 1);
                return -1
            }

            axios.post(`https://api.chazen.de/sendMessageHelp`, Body).then((res) => {
                setMail("")
                setPhone(null)
                setDesc("")
            })

            // console.log(Body);
        },
        [Mail, Phone, Desc],
    )

    //
    const [Sizes, setSizes] = useState<DOMRect>()
    const canvas = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setSizes(canvas.current?.getBoundingClientRect())
    }, [canvas])

    const title = useRef(null);
    const isInView = useInView(title, {
        once: true, // Сработает только один раз
    });

    useEffect(() => {
        if (isInView) {
            const typed = new Typed(title.current, {
                strings: [LANG_.title1],
                typeSpeed: 30,
                startDelay: 100,
                showCursor: false,
            });

            return () => typed.destroy();
        }
    }, [isInView, LanguageGetting]);


    const title2 = useRef(null);
    const isInView2 = useInView(title, {
        once: true, // Сработает только один раз
    });

    useEffect(() => {
        if (isInView2) {
            const typed = new Typed(title2.current, {
                strings: [LANG_.title2],
                typeSpeed: 20,
                startDelay: 800,
                showCursor: false,
            });

            return () => typed.destroy();
        }
    }, [isInView2, LanguageGetting]);

    return (
        <section className={style.body}>
            <p ref={title} className={style.title}></p>
            <p ref={title2} className={style.title}></p>

            <div className={style.form}>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}

                    ref={canvas} className={style.mCanvas}>
                    <Frame3D position={{ x: 0, y: 1, z: 2.5 }} height={Sizes?.height} width={Sizes?.width} modelPath="./man2.glb"></Frame3D>
                </motion.div>

                {/* // */}
                <div className={style.formDiv}>
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}

                        className={style.iBody1}>
                        <p className={style.iTitle1}>* {LANG_.mail.title}</p>
                        <input
                            ref={MainInput}
                            value={Mail}
                            onChange={(e) => setMail(e.target.value)}
                            className={style.iInput1} type="text" placeholder={LANG_.mail.placeholder} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}

                        className={style.iBody1}>
                        <p className={style.iTitle1}>* {LANG_.phone.title}</p>
                        <input
                            ref={PhoneInput}
                            value={Phone ? Phone : ""}
                            onChange={(e) => setPhone(+e.target.value > 0 ? +e.target.value : null)}
                            className={style.iInput1} type="number" placeholder={LANG_.phone.placeholder} />
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }} className={style.iBody2}>
                    <p className={style.iTitle}>* {LANG_.desc.title}</p>
                    <textarea
                        ref={DescInput}
                        value={Desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className={style.iInput} placeholder={LANG_.desc.placeholder} />
                </motion.div>

                <motion.button initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }} onClick={() => sendData()} className={style.iBtn}>{LANG_.send}</motion.button>
            </div>

        </section>
    );
}
