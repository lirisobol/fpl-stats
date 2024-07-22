import { useParams } from "react-router-dom";
import styles from "./Players.module.scss";
import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import {useTeamCode} from "../../hooks/useTeamCode";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { useState } from "react";
import { PlayersFilter } from "../../components/PlayersFilter/PlayersFilter";

export function Players():JSX.Element {
    const teamShortName = useParams().teamCode;
    
    const teamCode = useTeamCode(teamShortName);  
    const [selectedType, setSelectedType] = useState<number | 0>(0);
    const players = useFilteredPlayers(teamCode, selectedType);

    const handleFilterChange = (typeId: number | 0) => {
        setSelectedType(typeId);        
    };
    
    return (
        <div className={styles.Players}>
            <div className={styles.Filters}>
                <PlayersFilter onFilterChange={handleFilterChange}/>
            </div>
            <PlayersTable players={players} />
        </div>
    )
}