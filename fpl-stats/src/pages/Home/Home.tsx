import styles from "./Home.module.scss";

export function Home():JSX.Element {
    return (
        <div className={styles.HomeWrapper}>
            <h1 className={styles.Header}>FPLStats</h1>
            <p className={styles.Description}>
                The ultimate resource for Fantasy Premier League statistics and insights.
            </p>
        </div>
    )
}