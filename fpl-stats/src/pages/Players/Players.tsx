import { useParams } from "react-router-dom";
import styles from "./Players.module.scss";
import { PlayersTable } from "../../components/tables/PlayersTable/PlayersTable";
import useTeamCode from "../../hooks/useTeamCode";
import useFilteredPlayers from "../../hooks/useFilteredPlayers";
import { useState } from "react";

export function Players():JSX.Element {
    const teamShortName = useParams().teamCode;
    const teamCode = useTeamCode(teamShortName);    
    const [positionId, setPositionId] = useState(null);
    const players = useFilteredPlayers(teamCode, positionId);    

    return (
        <div className={styles.Players}>
            <div>
                
            </div>
            <PlayersTable />
        </div>
    )
}