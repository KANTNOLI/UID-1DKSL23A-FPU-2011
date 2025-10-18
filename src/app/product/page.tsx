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

export default function Home() {
    const searchParams = useSearchParams()
    const s = searchParams.get('s') // subs

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

            const str = `\n\nprice: ${Pay}\nsub: ${Order.subs}\ntype: ${Order.types}\nmodel?: ${Order.addons.model ? "yes" : "no"}\nsetup?: ${Order.addons.setup ? "yes" : "no"}`


            Body.desc = `${str}\n\nТЕКСТ:\n${Body.desc}\n`

            axios.post(`http://localhost:3000/sendMessageClient`, Body).then((res) => {

                setMail("")
                setPhone(null)
                setDesc("")
            })
        },
        [Mail, Phone, Desc, Pay, Order, setMail, setPhone, setDesc],
    )

    //

    const [Sizes, setSizes] = useState<DOMRect>()
    const [WinW, setWinW] = useState<number>(0)


    const canvas = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setWinW(window.innerWidth)

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
            price += 25
        } else if (Order.subs == "Standard") {
            price += 10
        } else {
            price += 0
        }

        if (Order.types == "Landingpage") {
            price += 1000
        } else if (Order.types == "WebsitVisitenkarte") {
            price += 1500
        } else if (Order.types == "CorporateWebsite") {
            price += 3000
        } else if (Order.types == "OnlineShop") {
            price += 5000
        } else if (Order.types == "BlogMedienportal") {
            price += 2500
        } else if (Order.types == "PortfolioWebsite") {
            price += 2000
        } else if (Order.types == "OnlineService") {
            price += 6000
        } else {
            price += 8000
        }

        if (Order.addons.model) {
            price += 500
        }

        setPay(price)
        console.log(JSON.stringify(Order));

    }, [Order])

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

            <section className={style.order}>
                <p className={`${style.formTitle} ${style.pin}`}>Minimaler Preis <span>{Pay}€~</span></p>

                <p className={style.formTitle}>Abonnement-Pakete</p>
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("basic", "subs")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.subs == "basic" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Basic (Gratis)</p>
                    </div>

                    <li className={style.orderPartTitle}>Website-Installation</li>
                    <li className={style.orderPartTitle}>Konfiguration & Einrichtung</li>
                    <li className={style.orderPartTitle}>Qualitätsgarantie</li>
                </div>

                <div className={style.orderPart}>
                    <div className={style.oP}>
                        <div onClick={() => setOrderPrice("Standard", "subs")} className={style.oPN}>
                            {Order.subs == "Standard" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Standard 10€</p>
                    </div>

                    <li className={style.orderPartTitle}>Erweiterter Schutzn</li>
                    <li className={style.orderPartTitle}>Premium-Garantie</li>
                    <li className={style.orderPartTitle}>Website-Support</li>
                </div>

                <div className={style.orderPart}>
                    <div className={style.oP}>
                        <div onClick={() => setOrderPrice("Premium", "subs")} className={style.oPN}>
                            {Order.subs == "Premium" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Premium 25€</p>
                    </div>

                    <li className={style.orderPartTitle}>Aktive Unterstützung</li>
                    <li className={style.orderPartTitle}>Rund-um-die-Uhr-Monitoring</li>
                    <li className={style.orderPartTitle}>Intelligente Automation</li>
                </div>


                {/* // */}


                <p className={style.formTitle}>Site types</p>


                {/* Landingpage*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("Landingpage", "types")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.types == "Landingpage" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Landingpage 1000€</p>
                    </div>

                    <li className={style.orderPartTitle}>Einzelseitige Website für Werbekampagnen</li>
                    <li className={style.orderPartTitle}>Lead-Generierungsformular und Call-to-Action</li>
                    <li className={style.orderPartTitle}>Responsives Design für alle Geräte</li>
                    <li className={style.orderPartTitle}>Basis SEO-Optimierung</li>
                </div>

                {/* WebsitVisitenkarte*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("WebsitVisitenkarte", "types")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.types == "WebsitVisitenkarte" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Website-Visitenkarte 1500€</p>
                    </div>

                    <li className={style.orderPartTitle}>Bis zu 5 Hauptseiten (Homepage, Leistungen, Kontakte)</li>
                    <li className={style.orderPartTitle}>Responsives Design und Basis-SEO</li>
                    <li className={style.orderPartTitle}>Integration von Kontaktformularen</li>
                    <li className={style.orderPartTitle}>Anbindung an Analytics</li>
                </div>


                {/* CorporateWebsite*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("CorporateWebsite", "types")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.types == "CorporateWebsite" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Corporate Website 3000€</p>
                    </div>

                    <li className={style.orderPartTitle}>Mehrseitige Struktur mit Blog</li>
                    <li className={style.orderPartTitle}>Erweitertes Navigationssystem</li>
                    <li className={style.orderPartTitle}>Integration mit CRM und Diensten</li>
                    <li className={style.orderPartTitle}>Vollständige SEO-Optimierung</li>
                </div>


                {/* OnlineShop*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("OnlineShop", "types")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.types == "OnlineShop" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Online-Shop 5000€</p>
                    </div>

                    <li className={style.orderPartTitle}>Produktkatalog mit Filtern</li>
                    <li className={style.orderPartTitle}>Warenkorb und Zahlungssystem</li>
                    <li className={style.orderPartTitle}>Kundenkonto</li>
                    <li className={style.orderPartTitle}>Bestell- und Lagerverwaltung</li>
                </div>


                {/* BlogMedienportal*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("BlogMedienportal", "types")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.types == "BlogMedienportal" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Blog/Medienportal 2500€</p>
                    </div>

                    <li className={style.orderPartTitle}>Kategorie- und Tag-System</li>
                    <li className={style.orderPartTitle}>Kommentare und Abonnements</li>
                    <li className={style.orderPartTitle}>Mediengalerien und Player</li>
                    <li className={style.orderPartTitle}>Integration mit sozialen Netzwerken</li>
                </div>


                {/* PortfolioWebsite*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("PortfolioWebsite", "types")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.types == "PortfolioWebsite" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Portfolio-Website 2000€</p>
                    </div>

                    <li className={style.orderPartTitle}>Visuell orientiertes Design</li>
                    <li className={style.orderPartTitle}>Arbeits- und Projektgalerien</li>
                    <li className={style.orderPartTitle}>Minimalistische Struktur</li>
                    <li className={style.orderPartTitle}>Fokus auf Präsentation</li>
                </div>


                {/* OnlineService*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("OnlineService", "types")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.types == "OnlineService" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Online-Service 6000€</p>
                    </div>

                    <li className={style.orderPartTitle}>Web-App mit Funktionalität</li>
                    <li className={style.orderPartTitle}>Buchungs-/Terminvereinbarungssystem</li>
                    <li className={style.orderPartTitle}>Persönliche Benutzerkonten</li>
                    <li className={style.orderPartTitle}>Integration externer APIs</li>
                </div>


                {/* Bildungsplattform*/}
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("Bildungsplattform", "types")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.types == "Bildungsplattform" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Bildungsplattform 8000€</p>
                    </div>

                    <li className={style.orderPartTitle}>Kurs- und Unterrichtssystem</li>
                    <li className={style.orderPartTitle}>Persönliche Studentenaccounts</li>
                    <li className={style.orderPartTitle}>Tests und Zertifikate</li>
                    <li className={style.orderPartTitle}>Fortschrittsverfolgungssystem</li>
                </div>



                {/* // */}

                <p className={style.formTitle}>Add-ons</p>

                <div className={style.orderPart}>
                    <div className={style.orderPart}>
                        <div className={style.oP}>
                            <div onClick={() => setOrderPrice("1", "model")} className={style.oPN}>
                                {Order.addons.model ? <div className={style.oPNActive}></div> : ""}
                            </div>

                            <p className={style.oPT}>3D Models</p>
                        </div>

                        <li className={style.orderPartTitle}>Erweiterter Schutzn</li>
                        <li className={style.orderPartTitle}>Premium-Garantie</li>
                        <li className={style.orderPartTitle}>Website-Support</li>
                    </div>

                    <div className={style.orderPart}>
                        <div className={style.oP}>
                            <div onClick={() => setOrderPrice("1", "setup")} className={style.oPN}>
                                {Order.addons.setup ? <div className={style.oPNActive}></div> : ""}
                            </div>

                            <p className={style.oPT}>Setup to server (Gratis)</p>
                        </div>

                        <li className={style.orderPartTitle}>Aktive Unterstützung</li>
                        <li className={style.orderPartTitle}>Rund-um-die-Uhr-Monitoring</li>
                        <li className={style.orderPartTitle}>Intelligente Automation</li>
                    </div>
                </div>
            </section>

            <section className={style.form}>
                <motion.p
                    {...animations.fadeYM}
                    className={style.formTitle}>Nachricht senden</motion.p>

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
                        <p className={style.iTitle1}>* Ihre E-Mail</p>
                        <input
                            ref={MainInput}
                            value={Mail}
                            onChange={(e) => setMail(e.target.value)}
                            className={style.iInput1} type="text" placeholder="MyE-Mail23@mail.com" />
                    </motion.div>

                    <motion.div
                        {...animations.fadeXP}
                        transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
                        className={style.iBody1}>
                        <p className={style.iTitle1}>* Ihre Telefonnummer</p>
                        <input
                            ref={PhoneInput}
                            value={Phone ? Phone : ""}
                            onChange={(e) => setPhone(+e.target.value > 0 ? +e.target.value : null)}
                            className={style.iInput1} type="number" placeholder="+49123456789" />
                    </motion.div>
                </div>

                <motion.div
                    {...animations.fadeXP}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
                    className={style.iBody2}>
                    <p className={style.iTitle}>* Wie können wir Ihnen helfen??</p>
                    <textarea
                        ref={DescInput}
                        value={Desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className={style.iInput} placeholder="In der Beschreibung können Sie Ihre Social-Media-Kontakte für eine schnellere Kontaktaufnahme angeben" />
                </motion.div>

                <motion.button
                    {...animations.fadeXP}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
                    onClick={() => sendData()} className={style.iBtn}>Bestellung abschicken</motion.button>
            </section>
        </section>
    );
}
