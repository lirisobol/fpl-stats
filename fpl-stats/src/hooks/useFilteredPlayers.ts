import { useMemo } from "react";
import { useAppSelector } from "./redux-hooks";

const useFilteredPlayers = (teamCode: number | undefined, selectedPositionType: number | 0, searchQuery: string) => {
    const players = useAppSelector((state) => state.generalInformation?.data?.elements);

    return useMemo(() => {
        if (!players) return [];

        return players.filter(player => {
            const matchesTeam = !teamCode || player.team_code === teamCode;
            const matchesPosition = !selectedPositionType || player.element_type === selectedPositionType;
            
            const matchesSearch = !searchQuery || 
                player.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.second_name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTeam && matchesPosition && matchesSearch;
        });
    }, [players, teamCode, selectedPositionType, searchQuery]);
};

export default useFilteredPlayers;