import { useMemo } from "react";
import { useAppSelector } from "./redux-hooks";

const useFilteredPlayers = (teamCode: number, selectedPositionType: number, searchQuery: string) => {
    const players = useAppSelector((state) => state.generalInformation?.data?.elements);

    return useMemo(() => {
        if (!players) return [];

        return players.filter(player => {
            const matchesTeam = teamCode === 0 || player.team_code === teamCode;
            const matchesPosition = selectedPositionType === 0 || player.element_type === selectedPositionType;
            const matchesSearch = !searchQuery || 
                player.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.second_name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTeam && matchesPosition && matchesSearch;
        });
    }, [players, teamCode, selectedPositionType, searchQuery]);
};

export default useFilteredPlayers;
