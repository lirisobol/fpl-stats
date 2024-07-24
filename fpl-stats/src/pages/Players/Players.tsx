import { useParams } from "react-router-dom";
import styles from "./Players.module.scss";
import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import {useTeamCode} from "../../hooks/useTeamCode";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { useAppSelector } from "../../hooks/redux-hooks";
import { PlayersFilter } from "../../components/filters/PlayersFilterParent/PlayersFilter";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

export function Players():JSX.Element {
    const status = useAppSelector(state => state.generalInformation.status);
    const positionType = useAppSelector((state) => state.filters.positionType)
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);
    const teamShortName = useParams().teamCode;
    const teamCode = useTeamCode(teamShortName); 
    const players = useFilteredPlayers(teamCode, positionType, searchQuery);
    return (
        <div className={styles.Players}>
            {status === 'loading' && <LoadingSpinner />}
            <div className={styles.Filters}>
                <PlayersFilter />
            </div>
            <PlayersTable players={players}/>
        </div>
    )
}