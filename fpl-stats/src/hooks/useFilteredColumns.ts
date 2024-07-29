import { useMemo } from 'react';
import { useAppSelector } from './redux-hooks';
import { PlayerStat, playerStatsModel } from '../models/Player';
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
                return playerStatsModel;
            }

        return playerStatsModel.filter(stat => 
            alwaysIncluded.includes(stat.name) || groupStats.includes(stat.name)
        );
    }, [columnGroup]);
};

export default useFilteredColumns;
