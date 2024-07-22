// src/utils/columnDefinitions.ts
import { ColDef } from "ag-grid-react";

// Your element stats object
const elementStats = [
    {
        "label": "Player name",
        "name": ""
    },
    {
        "label": "Price",
        "name": "now_cost"
    },
    {
        "label": "Selected",
        "name": "selected_by_percent",
        "rank": "selected_rank"
    },

    {
        "label": "PPG",
        "name": "points_per_game",
        "rank": "points_per_game_rank"
    },

    {
        "label": "BPS",
        "name": "bps"
    },
    {
        "label": "xG",
        "name": "expected_goals"
    },
    {
        "label": "xA",
        "name": "expected_assists"
    },
    {
        "label": "xGI",
        "name": "expected_goal_involvements"
    },
    {
        "label": "Conceded",
        "name": "goals_conceded"
    },
    {
        "label": "Bonus",
        "name": "bonus"
    },
    {
        "label": "Influence",
        "name": "influence"
    },
    {
        "label": "Creativity",
        "name": "creativity"
    },
    {
        "label": "Threat",
        "name": "threat"
    },
    {
        "label": "ICT Index",
        "name": "ict_index"
    },
    {
        "label": "Expected Goals Conceded",
        "name": "expected_goals_conceded"
    },

];

export const getColumnDefs = (): ColDef[] => {
    return elementStats.map(stat => {
        if (stat.label === "Player name") {
            return {
                headerName: stat.label,
                field: stat.name,
                valueGetter: (params: any) => `${params.data.first_name} ${params.data.second_name}`,
                width: '300px'
            };
        } 
        else if (stat.label === "Price") {
            return {
                headerName: stat.label,
                field: stat.name,
                valueGetter: (params: any) => params.data[stat.name] / 10, // Get the numeric value
                valueFormatter: (params: any) => params.value.toFixed(1), // Format for display
                cellClassRules: {
                    'high-rank': (params: any) => params.value < 5.5,
                    'medium-rank': (params: any) => params.value >= 5.5 && params.value < 10.0,
                    'low-rank': (params: any) => params.value >= 10.0,
                }
            };
        }
        else if (stat.label === "Selected") {
            return {
                headerName: stat.label,
                field: stat.name,
                cellClassRules: {
                    'high-rank': (params: any) => {
                        return params.data[stat.rank] <= 50;
                    },
                    'medium-rank': (params: any) => {
                        return params.data[stat.rank] > 50 && params.data[stat.rank] < 150;
                    },
                    'low-rank': (params: any) => {
                        return params.data[stat.rank] > 150;
                    }
                }
            };
        }
        else if (stat.label === "PPG") {
            return {
                headerName: stat.label,
                field: stat.name,
                cellClassRules: {
                    'high-rank': (params: any) => {
                        return params.data[stat.rank] <= 50;
                    },
                    'medium-rank': (params: any) => {
                        return params.data[stat.rank] > 50 && params.data[stat.rank] <= 150;
                    },
                    'low-rank': (params: any) => {
                        return params.data[stat.rank] > 150;
                    }
                }
            };
        }
        else {
            return {
                headerName: stat.label,
                field: stat.name,
            };
        }
    });
};
