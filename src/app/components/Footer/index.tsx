import styles from "./Footer.module.scss"

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerTitle}>Contact with us</p>
            <div className={styles.footerContacts}>
                <a className={styles.footerContactsImg} href="https://fonts.google.com/specimen/Paytone+One" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Facebook.png" alt="Facebook" />
                </a>

                <a className={styles.footerContactsImg} href="http://#" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Telegram.png" alt="Telegram" />
                </a>

                <a className={styles.footerContactsImg} href="http://#" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/Instagram.png" alt="Instagram" />
                </a>

                <a className={styles.footerContactsImg} href="http://#" target="_blank" rel="noopener noreferrer">
                    <img src="./contacts/LinkedIn.png" alt="LinkedIn" />
                </a>
            </div>


            <p className={styles.footerIP}>Sole Proprietor: Max Mustermann, Example Street 1, 10115 Berlin, Germany. Tax Number: 12/345/67890, VAT ID: DE123456789</p>
        </footer>
    );
}

export default Footer;