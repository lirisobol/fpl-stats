import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import styles from "./Players.module.scss";
export function Players():JSX.Element {
    return (
        <div className={styles.PlayersTableWrapper}>
            <PlayersTable/>
        </div>
    )
}