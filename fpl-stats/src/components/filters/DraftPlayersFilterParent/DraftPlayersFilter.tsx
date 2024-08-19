import { DraftColumnsFilter } from "./DraftColumnsFilter/DraftColumnsFilter";
import styles from "./DraftPlayersFilter.module.scss";
import { DraftSearchFilter } from "./DraftSearchFilter/DraftSearchFilter";
import { DraftTeamFilter } from "./DraftTeamFilter/DraftTeamFilter";

export function DraftPlayersFilter(): JSX.Element {
    return (
        <div className={styles.PlayersFilterContainer}>
            <DraftSearchFilter/>
            <DraftColumnsFilter />
            <DraftTeamFilter />
        </div>
    );
}
