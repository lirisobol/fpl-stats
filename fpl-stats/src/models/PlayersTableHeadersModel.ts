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
        "label": "PPG",
        "name": "points_per_game"
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
        "label": "Goals",
        "name": "goals_scored"
    },
    {
        "label": "Assists",
        "name": "assists"
    },
    {
        "label": "Clean sheets",
        "name": "clean_sheets"
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
        "label": "Starts",
        "name": "starts"
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
                valueGetter: (params: any) => `${params.data.first_name} ${params.data.second_name}`
            };
        } else if (stat.label === "Price") {
            return {
                headerName: stat.label,
                field: stat.name,
                valueFormatter: (params: any) => (params.value / 10).toFixed(1)
            };
        } else {
            return {
                headerName: stat.label,
                field: stat.name
            };
        }
    });
};
