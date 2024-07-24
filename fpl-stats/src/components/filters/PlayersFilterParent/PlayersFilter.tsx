import { ColumnsFilter } from "./ColumnsFilter/ColumnsFilter";
import styles from "./PlayersFilter.module.scss";
import { PositionFilter } from "./PositionFilter/PositionFilter";
import { SearchFilter } from "./SearchFilter/SearchFilter";


export function PlayersFilter(): JSX.Element {
    return (
        <div className={styles.PlayersFilterContainer}>
            <PositionFilter />
            <ColumnsFilter />
            <SearchFilter />
        </div>
    );
}
