import { useEffect, useState } from "react";
import usePlayersByTeam from "./usePlayersByTeam"

const useFilteredPlayers = (teamCode:number, positionId:string) => {
    const players = usePlayersByTeam(teamCode);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    useEffect(() => {
        if(positionId){
            const filtered = players.filter(player => player.element_type === positionId);
            setFilteredPlayers(filtered)
        }
        else {
            setFilteredPlayers(players);
        }
    },[teamCode, positionId]);
    return filteredPlayers;
}
export default useFilteredPlayers;