import { ColumnsFilter } from "./ColumnsFilter/ColumnsFilter";
import styles from "./PlayersFilter.module.scss";
import { PositionFilter } from "./PositionFilter/PositionFilter";
import { SearchFilter } from "./SearchFilter/SearchFilter";
import { TeamFilter } from "./TeamFilter/TeamFilter";


export function PlayersFilter(): JSX.Element {
    return (
        <div className={styles.PlayersFilterContainer}>
            <SearchFilter />
            <TeamFilter />
            <PositionFilter />
            <ColumnsFilter />
        </div>
    );
}
