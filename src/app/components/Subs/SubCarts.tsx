import styles from "./Subs.module.scss"

function SubCarts() {
    return (
        <div className={styles.carts}>
            <p className={styles.cartsTitle}>Subscription Plans</p>

            <div className={styles.subs}>
                <div className={`${styles.subsCart} ${styles.subsCart1}`}></div>


                <div className={`${styles.subsCart} ${styles.subsCart2}`}></div>


                <div className={`${styles.subsCart} ${styles.subsCart3}`}></div>
            </div>
        </div>);
}

export default SubCarts;