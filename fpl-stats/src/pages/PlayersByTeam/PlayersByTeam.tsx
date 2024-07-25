import { useParams } from "react-router-dom";
import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import {useTeamCode} from "../../hooks/useTeamCode";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { useAppSelector } from "../../hooks/redux-hooks";
import { PlayersFilter } from "../../components/filters/PlayersFilterParent/PlayersFilter";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

export function PlayersByTeam():JSX.Element {
    const status = useAppSelector(state => state.generalInformation.status);
    const positionType = useAppSelector((state) => state.filters.positionType)
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);
    const teamShortName = useParams().teamCode;
    const teamCode = useTeamCode(teamShortName); 
    const players = useFilteredPlayers(teamCode, positionType, searchQuery);
    return (
        <div>
            {status === 'loading' && <LoadingSpinner />}
            <div>
                <PlayersFilter />
            </div>
            <PlayersTable players={players}/>
        </div>
    )
}