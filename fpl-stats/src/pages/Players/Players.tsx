import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { useAppSelector } from "../../hooks/redux-hooks";
import { PlayersFilter } from "../../components/filters/PlayersFilterParent/PlayersFilter";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

export function Players():JSX.Element {
    const status = useAppSelector(state => state.generalInformation.status);
    const positionType = useAppSelector((state) => state.filters.positionType)
    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);

    console.log(teamCode);
    

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