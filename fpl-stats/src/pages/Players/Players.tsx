import { useParams } from "react-router-dom";
import styles from "./Players.module.scss";
import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import {useTeamCode} from "../../hooks/useTeamCode";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { useState } from "react";
import { PlayersFilter } from "../../components/PlayersFilter/PlayersFilter";

export function Players():JSX.Element {
    const teamShortName = useParams().teamCode;
    console.log(teamShortName);
    
    const teamCode = useTeamCode(teamShortName);  
    const [selectedType, setSelectedType] = useState<number | 0>(0);
    const players = useFilteredPlayers(teamCode, selectedType);

    const handleFilterChange = (typeId: number | 0) => {
        setSelectedType(typeId);        
    };
    console.log('team code:',teamCode);
    console.log('selected type:',selectedType);
    console.log('players:',players);
    
    
    return (
        <div className={styles.Players}>
            <div>
                <PlayersFilter onFilterChange={handleFilterChange}/>
            </div>
            <PlayersTable />
        </div>
    )
}