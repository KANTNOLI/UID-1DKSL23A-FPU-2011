'use client'

import style from "./Contact.module.scss"

export default function Home() {




    return (
        <section className={style.body}>
            <p className={style.title}>Need assistance?</p>
            <p className={style.title}>Just fill out the form!</p>
            <div className={style.form}>
                <div className={style.formDiv}>
                    <div className={style.iBody1}>
                        <p className={style.iTitle1}>* Ihre E-Mail</p>
                        <input className={style.iInput1} type="text" placeholder="MyE-Mail23@mail.com" />
                    </div>

                    <div className={style.iBody1}>
                        <p className={style.iTitle1}>Ihre Telefonnummer</p>
                        <input className={style.iInput1} type="number" placeholder="+49123456789" />
                    </div>
                </div>

                <div className={style.iBody2}>
                    <p className={style.iTitle}>* Wie können wir Ihnen helfen??</p>
                    <textarea className={style.iInput} placeholder="In der Beschreibung können Sie Ihre Social-Media-Kontakte für eine schnellere Kontaktaufnahme angeben" />
                </div>

                <button className={style.iBtn}>Senden</button>
            </div>
        </section>
    );
}
