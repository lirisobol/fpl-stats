import { ColDef } from "ag-grid-community";
import { playerStatsModel } from "../models/PlayerStatsModel";
class PlayersTableConfig {
    public getColumnDefs = (filteredColumns: typeof playerStatsModel): ColDef[] => {
        return filteredColumns.map(stat => {
            switch (stat.label) {
                case "Player name":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        valueGetter: (params: any) => `${params.data.first_name} ${params.data.second_name}`,
                    };
                case "Price":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        valueGetter: (params: any) => params.data[stat.name] / 10,
                        valueFormatter: (params: any) => params.value.toFixed(1),
                        cellClassRules: {
                            'table-high-rank': (params: any) => params.value < 5.5,
                            'table-mid-rank': (params: any) => params.value >= 5.5 && params.value < 10.0,
                            'table-low-rank': (params: any) => params.value >= 10.0,
                        }
                        
                    };
                case "Selected":
                case "PPG":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        cellClassRules: {
                            'table-high-rank': (params: any) => params.data[stat.rank] <= 50,
                            'table-mid-rank': (params: any) => params.data[stat.rank] > 50 && params.data[stat.rank] <= 150,
                            'table-low-rank': (params: any) => params.data[stat.rank] > 150,
                        }
                    };
                default:
                    return {
                        headerName: stat.label,
                        field: stat.name,
                    };
            }
        });
    }
    public autoSizeStrategy = {
        type: 'fitGridWidth' as const,
        defaultMinWidth: 50,
    };

    public defaultColDef = {
        sortable: true,
        resizable: true,
    };
}
export const playersTableConfig = new PlayersTableConfig();