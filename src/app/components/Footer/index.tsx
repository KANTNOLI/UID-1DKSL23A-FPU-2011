import styles from "./Footer.module.scss"

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerTitle}>Kontaktieren Sie uns</p>
            <div className={styles.footerContacts}>
                <a className={styles.footerContactsImg} href="https://www.facebook.com/share/g/1C5VcFpvnv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Facebook.png" alt="Facebook" />
                </a>

                <a className={styles.footerContactsImg} href="https://t.me/KANTNOLI" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Telegram.png" alt="Telegram" />
                </a>

                <a className={styles.footerContactsImg} href="https://www.instagram.com/chazen.co?igsh=bDd5Y3g4aTBvOG44&utm_source=qr" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Instagram.png" alt="Instagram" />
                </a>

                <a className={styles.footerContactsImg} href="https://www.linkedin.com/company/chazen-official" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/LinkedIn.png" alt="LinkedIn" />
                </a>
            </div>


            <p className={styles.footerIP}>Sole Proprietor: Max Mustermann, Example Street 1, 10115 Berlin, Germany. Tax Number: 12/345/67890, VAT ID: DE123456789</p>
        </footer>
    );
}

export default Footer;