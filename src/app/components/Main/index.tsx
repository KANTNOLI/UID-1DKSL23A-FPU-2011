import styles from "./Main.module.scss"

function Main() {
    return (<section className={styles.main}>
        <p className={styles.mainTitle}>Kantuha</p>
        <canvas className={styles.mainCanvas}>3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D3D</canvas>

        <p className={styles.mainDescL}>We take great care in our work with our clients, specifying every detail to create something amazing</p>


        <p className={styles.mainDescR}>We take great care in our work with our clients, specifying every detail to create something amazing</p>
    </section>);
}

export default Main;