import styles from "./Home.module.scss";
import TabSelect from "./TabSelect/TabSelect";

export function Home():JSX.Element {
    return (
        <div className={styles.HomeWrapper}>
            <TabSelect />
        </div>
    )
}