'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import Frame3D from "../components/Frame3D";
import { motion } from "framer-motion"

import style from "./Product.module.scss"

interface SendDataIntf {
    type: string,
    mail: string,
    phone: string | number,
    desc: string,
}

interface addons {
    model: boolean,
    setup: boolean,
}

interface OrderIntf {
    subs: string,
    types: string,
    addons: addons,
}

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BreadcrumbData } from "../breadcrumb-data";

export default function Home() {
    useEffect(() => {
        document.title = "Chazen | Website Development Packages & Pricing"
    }, [])

    const LanguageGetting: any = useSelector((state: RootState) => state.data.LanguageActive)
    const LANG_ = LanguageGetting.product

    useEffect(() => {
        console.log("Change Language");
    }, [LanguageGetting])

    const searchParams = useSearchParams()
    const s = searchParams.get('s') as string

    const [Order, setOrder] = useState<OrderIntf>({
        subs: s || "basic",
        types: "Landingpage",
        addons: {
            model: false,
            setup: true,
        },
    })
    // mail phone desc type 3 2 1

    const MainInput = useRef<HTMLInputElement>(null)
    const PhoneInput = useRef<HTMLInputElement>(null)
    const DescInput = useRef<HTMLTextAreaElement>(null)

    const [Mail, setMail] = useState<string>("")
    const [Phone, setPhone] = useState<number | null>(null)
    const [Desc, setDesc] = useState<string>("")

    const [Pay, setPay] = useState<number>(1000)

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
                return -1
            } else if (!emailRegex.test(Mail)) {
                MainInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    MainInput.current?.classList.remove(style.warn)
                }, 500);
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
                return -1
            } else if (digitsOnly.length < 5 || digitsOnly.length > 15) {
                PhoneInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    PhoneInput.current?.classList.remove(style.warn)
                }, 500);
                return -1
            } else if (!/^\d+$/.test(digitsOnly)) {
                PhoneInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    PhoneInput.current?.classList.remove(style.warn)
                }, 500);
                return -1
            }

            if (Desc.length < 10) {
                DescInput.current?.classList.add(style.warn)
                setTimeout(() => {
                    DescInput.current?.classList.remove(style.warn)
                }, 500);
                return -1
            }

            const str = `\n\nprice: ${Pay}\nsub: ${Order.subs}\ntype: ${Order.types}\nmodel?: ${Order.addons.model ? "yes" : "no"}\nsetup?: ${Order.addons.setup ? "yes" : "no"}`


            Body.desc = `${str}\n\nТЕКСТ:\n${Body.desc}\n`

            axios.post(`https://api.chazen.de/sendMessageClient`, Body).then((res) => {

                setMail("")
                setPhone(null)
                setDesc("")
            })
        },
        [Mail, Phone, Desc, Pay, Order, setMail, setPhone, setDesc],
    )

    const [Sizes, setSizes] = useState<DOMRect>()
    const canvas = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setSizes(canvas.current?.getBoundingClientRect())
    }, [canvas, Pay])

    const setOrderPrice = useCallback(
        (title: string | boolean, type: string) => {
            switch (type) {
                case "subs": {
                    if (typeof (title) == "string") {
                        setOrder(prev => ({
                            ...prev,
                            subs: title
                        }))
                    }
                    break;
                }
                case "types": {
                    if (typeof (title) == "string") {
                        setOrder(prev => ({
                            ...prev,
                            types: title
                        }))
                    }
                    break;
                }
                case "model": {
                    setOrder(prev => ({
                        ...prev,
                        addons: {
                            ...prev.addons,
                            model: !prev.addons.model
                        }
                    }))
                    break;
                }
                case "setup": {
                    setOrder(prev => ({
                        ...prev,
                        addons: {
                            ...prev.addons,
                            setup: !prev.addons.setup
                        }
                    }))
                    break;
                }

            }
        },
        [Order, setOrder],
    )

    useEffect(() => {

        let price = 0;

        if (Order.subs == "Premium") {
            price += LANG_.subs.C3Price
        } else if (Order.subs == "Standard") {
            price += LANG_.subs.C2Price
        } else {
            price += 0
        }

        if (Order.types == "Landingpage") {
            price += LANG_.site.S1Price
        } else if (Order.types == "WebsitVisitenkarte") {
            price += LANG_.site.S2Price
        } else if (Order.types == "CorporateWebseite") {
            price += LANG_.site.S3Price
        } else if (Order.types == "OnlineShop") {
            price += LANG_.site.S4Price
        } else if (Order.types == "BlogMedienportal") {
            price += LANG_.site.S5Price
        } else if (Order.types == "PortfolioWebseite") {
            price += LANG_.site.S6Price
        } else if (Order.types == "OnlineService") {
            price += LANG_.site.S7Price
        } else {
            price += LANG_.site.S8Price
        }

        if (Order.addons.model) {
            price += LANG_.addons.A1Price
        }

        setPay(price)
    }, [Order, LanguageGetting])

    const fadeDef = {
        viewport: { once: true },
        transition: { duration: 0.5, ease: "easeInOut" as const }
    }

    const animations = {
        fadeYM: {
            initial: { opacity: 0, y: -25 },
            whileInView: { opacity: 1, y: 0 },
            ...fadeDef
        },
        fadeYP: {
            initial: { opacity: 0, y: 25 },
            whileInView: { opacity: 1, y: 0 },
            ...fadeDef
        },
        fadeXM: {
            initial: { opacity: 0, x: -25 },
            whileInView: { opacity: 1, x: 0 },
            ...fadeDef
        },
        fadeXP: {
            initial: { opacity: 0, x: 25 },
            whileInView: { opacity: 1, x: 0 },
            ...fadeDef
        }
    }

    // {...animations.fadeXP}
    // transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}

    return (
        <section className={style.body}>
            <BreadcrumbData pathname="/product" />

            <section className={style.order}>
                <motion.p
                    {...animations.fadeXM}
                    className={`${style.formTitle} ${style.pin}`}>{LANG_.price} <span>{Pay}{LANG_.priceDigit}~</span></motion.p>

                <motion.p
                    {...animations.fadeXM}
                    className={style.formTitle}>{LANG_.subs.title}</motion.p>
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("basic", "subs")} className={style.oP}>
                        <motion.div
                            {...animations.fadeXM}
                            className={style.oPN}>
                            {Order.subs == "basic" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p
                            {...animations.fadeXP}
                            className={style.oPT}>{LANG_.subs.C1Title} {LANG_.subs.C1Price}{LANG_.subs.C1PriceDigit}</motion.p>
                    </div>

                    <motion.li
                        {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
                        className={style.orderPartTitle}>{LANG_.subs.C1Desc1}</motion.li>
                    <motion.li
                        {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
                        className={style.orderPartTitle}>{LANG_.subs.C1Desc2}</motion.li>
                    <motion.li
                        {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
                        className={style.orderPartTitle}>{LANG_.subs.C1Desc3}</motion.li>
                </div>

                <div className={style.orderPart}>
                    <div className={style.oP}>
                        <motion.div {...animations.fadeXM} onClick={() => setOrderPrice("Standard", "subs")} className={style.oPN}>
                            {Order.subs == "Standard" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p  {...animations.fadeXP} className={style.oPT}>{LANG_.subs.C2Title} {LANG_.subs.C2Price}{LANG_.subs.C2PriceDigit}</motion.p>
                    </div>

                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.subs.C2Desc1}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.subs.C2Desc2}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.subs.C2Desc3}</motion.li>
                </div>

                <div className={style.orderPart}>
                    <div className={style.oP}>
                        <motion.div {...animations.fadeXM} onClick={() => setOrderPrice("Premium", "subs")} className={style.oPN}>
                            {Order.subs == "Premium" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p  {...animations.fadeXP} className={style.oPT}>{LANG_.subs.C3Title} {LANG_.subs.C3Price}{LANG_.subs.C3PriceDigit}</motion.p>
                    </div>

                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.subs.C3Desc1}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.subs.C3Desc2}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.subs.C3Desc3}</motion.li>
                </div>


                {/* // */}


                <motion.p   {...animations.fadeXM} className={style.formTitle}>{LANG_.site.title}</motion.p>


                {/* Landingpage*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("Landingpage", "types")} className={style.oP}>
                        <motion.div {...animations.fadeXM} className={style.oPN}>
                            {Order.types == "Landingpage" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p {...animations.fadeXP} className={style.oPT}>{LANG_.site.S1Title} {LANG_.site.S1Price}{LANG_.site.S1PriceDigit}</motion.p>
                    </div>

                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S1Desc1}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S1Desc2}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S1Desc3}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S1Desc4}</motion.li>
                </div>

                {/* WebsitVisitenkarte*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("WebsitVisitenkarte", "types")} className={style.oP}>
                        <motion.div {...animations.fadeXM} className={style.oPN}>
                            {Order.types == "WebsitVisitenkarte" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p  {...animations.fadeXP} className={style.oPT}>{LANG_.site.S2Title} {LANG_.site.S2Price}{LANG_.site.S2PriceDigit}</motion.p>
                    </div>

                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S2Desc1}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S2Desc2}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S2Desc3}</motion.li>
                    <motion.li {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S2Desc4}</motion.li>
                </div>


                {/* CorporateWebseite*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("CorporateWebseite", "types")} className={style.oP}>
                        <motion.div {...animations.fadeXM} className={style.oPN}>
                            {Order.types == "CorporateWebseite" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p {...animations.fadeXP} className={style.oPT}>{LANG_.site.S3Title} {LANG_.site.S3Price}{LANG_.site.S3PriceDigit}</motion.p>
                    </div>

                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S3Desc1}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S3Desc2}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S3Desc3}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S3Desc4}</motion.li>
                </div>


                {/* OnlineShop*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("OnlineShop", "types")} className={style.oP}>
                        <motion.div  {...animations.fadeXM} className={style.oPN}>
                            {Order.types == "OnlineShop" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p  {...animations.fadeXP} className={style.oPT}>{LANG_.site.S4Title} {LANG_.site.S4Price}{LANG_.site.S4PriceDigit}</motion.p>
                    </div>

                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S4Desc1}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S4Desc2}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S4Desc3}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S4Desc4}</motion.li>
                </div>


                {/* BlogMedienportal*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("BlogMedienportal", "types")} className={style.oP}>
                        <motion.div {...animations.fadeXM} className={style.oPN}>
                            {Order.types == "BlogMedienportal" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p  {...animations.fadeXP} className={style.oPT}>{LANG_.site.S5Title} {LANG_.site.S5Price}{LANG_.site.S5PriceDigit}</motion.p>
                    </div>

                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S5Desc1}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S5Desc2}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S5Desc3}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S5Desc4}</motion.li>
                </div>


                {/* PortfolioWebseite*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("PortfolioWebseite", "types")} className={style.oP}>
                        <motion.div {...animations.fadeXM} className={style.oPN}>
                            {Order.types == "PortfolioWebseite" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p  {...animations.fadeXP} className={style.oPT}>{LANG_.site.S6Title} {LANG_.site.S6Price}{LANG_.site.S6PriceDigit}</motion.p>
                    </div>

                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S6Desc1}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S6Desc2}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S6Desc3}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S6Desc4}</motion.li>
                </div>


                {/* OnlineService*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("OnlineService", "types")} className={style.oP}>
                        <motion.div {...animations.fadeXM} className={style.oPN}>
                            {Order.types == "OnlineService" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p {...animations.fadeXP} className={style.oPT}>{LANG_.site.S7Title} {LANG_.site.S7Price}{LANG_.site.S7PriceDigit}</motion.p>
                    </div>

                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S7Desc1}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S7Desc2}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S7Desc3}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S7Desc4}</motion.li>
                </div>


                {/* Bildungsplattform*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("Bildungsplattform", "types")} className={style.oP}>
                        <motion.div  {...animations.fadeXM} className={style.oPN}>
                            {Order.types == "Bildungsplattform" ? <div className={style.oPNActive}></div> : ""}
                        </motion.div>

                        <motion.p {...animations.fadeXP} className={style.oPT}>{LANG_.site.S8Title} {LANG_.site.S8Price}{LANG_.site.S8PriceDigit}</motion.p>
                    </div>

                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S8Desc1}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S8Desc2}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S8Desc3}</motion.li>
                    <motion.li  {...animations.fadeXP}
                        transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.site.S8Desc4}</motion.li>
                </div>



                {/* // */}

                <motion.p  {...animations.fadeXM} className={style.formTitle}>{LANG_.addons.title}</motion.p>

                <div className={style.orderPart}>
                    <div className={style.orderPart}>
                        <div className={style.oP}>
                            <motion.div {...animations.fadeXM} onClick={() => setOrderPrice("1", "model")} className={style.oPN}>
                                {Order.addons.model ? <div className={style.oPNActive}></div> : ""}
                            </motion.div>

                            <motion.p  {...animations.fadeXP} className={style.oPT}>{LANG_.addons.A1Title} {LANG_.addons.A1Price}{LANG_.addons.A1PriceDigit}</motion.p>
                        </div>

                        <motion.li  {...animations.fadeXP}
                            transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.addons.A1Desc1}</motion.li>
                        <motion.li  {...animations.fadeXP}
                            transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.addons.A1Desc2}</motion.li>
                        <motion.li  {...animations.fadeXP}
                            transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.addons.A1Desc3}</motion.li>
                    </div>

                    <div className={style.orderPart}>
                        <div className={style.oP}>
                            <motion.div {...animations.fadeXM} onClick={() => setOrderPrice("1", "setup")} className={style.oPN}>
                                {Order.addons.setup ? <div className={style.oPNActive}></div> : ""}
                            </motion.div>

                            <motion.p {...animations.fadeXP} className={style.oPT}>{LANG_.addons.A2Title} {LANG_.addons.A2Price}{LANG_.addons.A2PriceDigit}</motion.p>
                        </div>

                        <motion.li  {...animations.fadeXP}
                            transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.addons.A2Desc1}</motion.li>
                        <motion.li  {...animations.fadeXP}
                            transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.addons.A2Desc2}</motion.li>
                        <motion.li  {...animations.fadeXP}
                            transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }} className={style.orderPartTitle}>{LANG_.addons.A2Desc3}</motion.li>
                    </div>
                </div>
            </section>

            <section className={style.form}>
                <motion.p
                    {...animations.fadeYM}
                    className={style.formTitle}>{LANG_.form.title}</motion.p>

                <motion.div
                    {...animations.fadeYP}
                    ref={canvas} className={style.mCanvas}>
                    <Frame3D position={{ x: 0, y: 1, z: 3 }} height={Sizes?.height} width={Sizes?.width} modelPath="./man.glb"></Frame3D>
                </motion.div>

                {/* // */}
                <div className={style.formDiv}>
                    <motion.div
                        {...animations.fadeXP}
                        className={style.iBody1}>
                        <p className={style.iTitle1}>* {LANG_.form.mail.title}</p>
                        <input
                            ref={MainInput}
                            value={Mail}
                            onChange={(e) => setMail(e.target.value)}
                            className={style.iInput1} type="text" placeholder={LANG_.form.mail.placeholder} />
                    </motion.div>

                    <motion.div
                        {...animations.fadeXP}
                        transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
                        className={style.iBody1}>
                        <p className={style.iTitle1}>* {LANG_.form.phone.title}</p>
                        <input
                            ref={PhoneInput}
                            value={Phone ? Phone : ""}
                            onChange={(e) => setPhone(+e.target.value > 0 ? +e.target.value : null)}
                            className={style.iInput1} type="number" placeholder={LANG_.form.phone.placeholder} />
                    </motion.div>
                </div>

                <motion.div
                    {...animations.fadeXP}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                    className={style.iBody2}>
                    <p className={style.iTitle}>* {LANG_.form.desc.title}</p>
                    <textarea
                        ref={DescInput}
                        value={Desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className={style.iInput} placeholder={LANG_.form.desc.placeholder} />
                </motion.div>

                <motion.button
                    {...animations.fadeXP}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
                    onClick={() => sendData()} className={style.iBtn}>{LANG_.form.send}</motion.button>
            </section>
        </section>
    );
}