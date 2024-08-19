import { CellClassParams, ColDef, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { PlayerData, PlayerStat } from "../../../models/general-info/Player";
import { TableConfig } from "../TableConfig";

class PlayersTableConfig extends TableConfig {
    // Players Table Columns Config, used in <PlayersTable> & <PlayersTableSelectable>
    public generatePlayersColumnDefs = (filteredColumns: PlayerStat[]): ColDef[] => {
        const columnDefs = filteredColumns.map(stat => {
            switch (stat.label) {
                case "Player name":
                    return {
                        ...this.getPlayerNameColumn(),
                        width:150,
                    }
                case "Price":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        width: 75,
                        valueGetter: (params: ValueGetterParams<PlayerData>) => {
                            const value = params.data?.[stat.name as keyof PlayerData];
                            return typeof value === 'number' ? value / 10 : undefined;
                        },
                        valueFormatter: (params: ValueFormatterParams) => {
                            const value = params.value as number;
                            return value ? value.toFixed(1) : '';
                        },
                        cellClassRules: {
                            'table-very-high-rank': (params: CellClassParams<PlayerData>) => {
                                const value = params.value as number;
                                return value < 5.5;
                            },
                            'table-high-rank': (params: CellClassParams<PlayerData>) => {
                                const value = params.value as number;
                                return value >= 5.5 && value < 7.5;
                            },
                            'table-mid-rank': (params: CellClassParams<PlayerData>) => {
                                const value = params.value as number;
                                return value >= 7.5 && value < 10.0;
                            },
                            'table-low-rank': (params: CellClassParams<PlayerData>) => {
                                const value = params.value as number;
                                return value >= 10.0 && value < 12.5;
                            },
                            'table-very-low-rank': (params: CellClassParams<PlayerData>) => {
                                const value = params.value as number;
                                return value >= 12.5;
                            },

                        }
                    };
                case "Selected":
                case "PPG":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        width:75,
                        cellClassRules: {
                            'table-very-high-rank': (params: CellClassParams<PlayerData>) => {
                                const rankValue = params.data?.[stat.rank as keyof PlayerData] as number;
                                return rankValue <= 50;
                            },
                            'table-high-rank': (params: CellClassParams<PlayerData>) => {
                                const rankValue = params.data?.[stat.rank as keyof PlayerData] as number;
                                return rankValue >= 50 && rankValue < 100;
                            },
                            'table-mid-rank': (params: CellClassParams<PlayerData>) => {
                                const rankValue = params.data?.[stat.rank as keyof PlayerData] as number;
                                return rankValue >= 100 && rankValue < 150;
                            },
                            'table-low-rank': (params: CellClassParams<PlayerData>) => {
                                const rankValue = params.data?.[stat.rank as keyof PlayerData] as number;
                                return rankValue >= 150 && rankValue < 200;
                            },
                            'table-very-low-rank': (params: CellClassParams<PlayerData>) => {
                                const rankValue = params.data?.[stat.rank as keyof PlayerData] as number;
                                return rankValue > 200;
                            },
                        }
                    };
                default:
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        width:140,
                    };
            }
        })
        
        // Ensure the Player Name column is always included and has a fixed width
        if (!columnDefs.some(colDef => colDef.field === 'playerName')) {
            columnDefs.unshift({
                ...this.getPlayerNameColumn(),
                width: 150,
            });
        }
    
        return columnDefs;
    };

}
export const playersTableConfig = new PlayersTableConfig();