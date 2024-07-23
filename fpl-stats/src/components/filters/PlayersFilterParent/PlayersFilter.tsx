import styles from "./PlayersFilter.module.scss";
import { PositionFilter } from "./PositionFilter/PositionFilter";
import { SearchFilter } from "./SearchFilter/SearchFilter";

interface PlayersFilterProps {
    onPositionTypeChange: (positionType: number) => void;
    onSearchChange: (query: string) => void;
}
export function PlayersFilter({ onPositionTypeChange, onSearchChange }: PlayersFilterProps): JSX.Element {
    return (
        <div className={styles.PlayersFilterContainer}>
            <PositionFilter onPositionTypeChange={onPositionTypeChange}/>
            <SearchFilter onSearchChange={onSearchChange} />
        </div>
    );
}
