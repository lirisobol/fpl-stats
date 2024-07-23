import { useParams } from "react-router-dom";
import styles from "./Players.module.scss";
import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import {useTeamCode} from "../../hooks/useTeamCode";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { PlayersFilter } from "../../components/PlayersFilter/PlayersFilter";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setSearchQuery, setSelectedType } from "../../store/slices/filterSlice";

export function Players():JSX.Element {
    const dispatch = useAppDispatch();
    const selectedType = useAppSelector((state) => state.filters.selectedType)
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);
    const teamShortName = useParams().teamCode;
    const teamCode = useTeamCode(teamShortName); 
    const players = useFilteredPlayers(teamCode, selectedType, searchQuery);
    const handleFilterChange = (typeId: number | 0) => {
        dispatch(setSelectedType(typeId));       
    };
    const handleSearchChange = (query: string) => {
        dispatch(setSearchQuery(query));
    };
    return (
        <div className={styles.Players}>
            <div className={styles.Filters}>
                <PlayersFilter 
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </div>
            <PlayersTable players={players}/>
        </div>
    )
}