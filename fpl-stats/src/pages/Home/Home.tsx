import { Players } from "../Players/Players";
import styles from "./Home.module.scss";

export function Home():JSX.Element {
    return (
        <div className={styles.HomeWrapper}>
            <Players />
        </div>
    )
}