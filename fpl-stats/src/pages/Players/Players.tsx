import { useParams } from "react-router-dom";
import styles from "./Players.module.scss";
import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import {useTeamCode} from "../../hooks/useTeamCode";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setSearchQuery, setPositionType } from "../../store/slices/filterSlice";
import { PlayersFilter } from "../../components/filters/PlayersFilterParent/PlayersFilter";

export function Players():JSX.Element {
    const dispatch = useAppDispatch();
    const positionType = useAppSelector((state) => state.filters.positionType)
    const searchQuery = useAppSelector((state) => state.filters.searchQuery);
    const teamShortName = useParams().teamCode;
    const teamCode = useTeamCode(teamShortName); 
    const players = useFilteredPlayers(teamCode, positionType, searchQuery);

    const handlePositionTypeChange = (typeId: number | 0) => {
        dispatch(setPositionType(typeId));       
    };
    const handleSearchChange = (query: string) => {
        dispatch(setSearchQuery(query));
    };
    return (
        <div className={styles.Players}>
            <div className={styles.Filters}>
                <PlayersFilter 
                    onPositionTypeChange={handlePositionTypeChange}
                    onSearchChange={handleSearchChange}
                />
            </div>
            <PlayersTable players={players}/>
        </div>
    )
}