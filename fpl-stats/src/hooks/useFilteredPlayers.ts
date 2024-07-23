import { useEffect, useState } from "react";
import { useAppSelector } from "./redux-hooks";

const useFilteredPlayers = (teamCode: number | undefined, selectedType: number | 0, searchQuery:string) => {
    const players = useAppSelector((state) => state.generalInformation?.data?.elements);
    const [filteredPlayers, setFilteredPlayers] = useState([]);    
    useEffect(() => {
        if (!players) return;
        let result = players;
        if (teamCode) {
            result = result.filter(player => player.team_code === teamCode);
        }
        if (selectedType) {
            result = result.filter(player => player.element_type === selectedType);
        }
        if (searchQuery) {
            const lowerSearchQuery = searchQuery.toLowerCase();
            result = result.filter(player => 
                player.first_name.toLowerCase().includes(lowerSearchQuery) ||
                player.second_name.toLowerCase().includes(lowerSearchQuery)
            );
        }
        setFilteredPlayers(result);
    }, [players, teamCode, selectedType, searchQuery]);
    return filteredPlayers;
};

export default useFilteredPlayers;
