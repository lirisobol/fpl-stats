import { useMemo } from 'react';
import { useAppSelector } from './redux-hooks';
import { PlayerStat, playerStatsModel } from '../models/PlayerModel'; // Ensure correct path

const useFilteredColumns = (): PlayerStat[] => {
    const columnGroup = useAppSelector((state) => state.filters.columnGroup);

    return useMemo(() => {
        const alwaysIncluded = ["now_cost", "selected_by_percent"];
        let groupStats: string[] = [];

        switch (columnGroup) {
            case "key":
                groupStats = ["points_per_game", "bps", "ict_index"];
                break;
            case "expected":
                groupStats = ["expected_goals", "expected_assists", "expected_goal_involvements", "expected_goals_conceded"];
                break;
            case "performance":
                groupStats = ["goals_conceded", "influence", "creativity", "threat"];
                break;
            default:
                // If default case needs to return all columns, modify accordingly
                return playerStatsModel; // Assuming `PlayerStat[]` type is correct
        }

        return playerStatsModel.filter(stat => 
            alwaysIncluded.includes(stat.name) || groupStats.includes(stat.name)
        );
    }, [columnGroup]);
};

export default useFilteredColumns;
