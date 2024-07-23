import { ColDef } from "ag-grid-community";
import { playerStatsModel } from "../models/PlayerStatsModel";

class PlayersTableConfig {
    public getColumnDefs = ():ColDef[] => {
        return playerStatsModel.map(stat => {
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
    }
}
export const playersTableConfig = new PlayersTableConfig();
