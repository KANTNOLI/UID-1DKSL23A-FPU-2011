'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import Frame3D from "../components/Frame3D";

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
    addons: addons,
}


import style from "./Product.module.scss"

export default function Home() {
    const [Order, setOrder] = useState<OrderIntf>({
        subs: "basic",
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

            console.log(Body);
        },
        [Mail, Phone, Desc],
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

        let price = 995;

        if (Order.subs == "Premium") {
            price += 25
        } else if (Order.subs == "Standard") {
            price += 10
        } else {
            price += 5
        }

        if (Order.addons.model) {
            price += 200
        }

        setPay(price)

        console.log(Pay);

    }, [Order])



    return (
        <section className={style.body}>

            <section className={style.order}>
                <p className={style.formTitle}>Nachricht senden <span>{Pay}€~</span></p>

                <p className={style.formTitle}>Abonnement-Pakete</p>
                <div className={style.orderPart}>
                    <div onClick={() => setOrderPrice("basic", "subs")} className={style.oP}>
                        <div className={style.oPN}>
                            {Order.subs == "basic" ? <div className={style.oPNActive}></div> : ""}
                        </div>

                        <p className={style.oPT}>Basic 5€</p>
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

                            <p className={style.oPT}>Setup to server</p>
                        </div>

                        <li className={style.orderPartTitle}>Aktive Unterstützung</li>
                        <li className={style.orderPartTitle}>Rund-um-die-Uhr-Monitoring</li>
                        <li className={style.orderPartTitle}>Intelligente Automation</li>
                    </div>
                </div>
            </section>

            <section className={style.form}>
                <p className={style.formTitle}>Nachricht senden</p>

                {/* <div ref={canvas} className={style.mCanvas}>
                    <Frame3D position={{ x: 0, y: 0.1, z: 0.4 }} height={Sizes?.height} width={Sizes?.width} modelPath="./lisa.glb"></Frame3D>
                </div> */}

                {/* // */}
                <div className={style.formDiv}>
                    <div className={style.iBody1}>
                        <p className={style.iTitle1}>* Ihre E-Mail</p>
                        <input
                            ref={MainInput}
                            value={Mail}
                            onChange={(e) => setMail(e.target.value)}
                            className={style.iInput1} type="text" placeholder="MyE-Mail23@mail.com" />
                    </div>

                    <div className={style.iBody1}>
                        <p className={style.iTitle1}>* Ihre Telefonnummer</p>
                        <input
                            ref={PhoneInput}
                            value={Phone ? Phone : ""}
                            onChange={(e) => setPhone(+e.target.value > 0 ? +e.target.value : null)}
                            className={style.iInput1} type="number" placeholder="+49123456789" />
                    </div>
                </div>

                <div className={style.iBody2}>
                    <p className={style.iTitle}>* Wie können wir Ihnen helfen??</p>
                    <textarea
                        ref={DescInput}
                        value={Desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className={style.iInput} placeholder="In der Beschreibung können Sie Ihre Social-Media-Kontakte für eine schnellere Kontaktaufnahme angeben" />
                </div>

                <button onClick={() => sendData()} className={style.iBtn}>Bestellung abschicken</button>
            </section>
        </section>
    );
}
