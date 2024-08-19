import { CellClassParams, ColDef, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { PlayerData, PlayerStat } from "../../../models/general-info/Player";
import { TableConfig } from "../TableConfig";

export class PlayersTableConfig extends TableConfig {
    // Static method to generate players table column definitions
    public static generatePlayersColumnDefs = (filteredColumns: PlayerStat[]): ColDef[] => {
        const columnDefs = filteredColumns.map(stat => {
            switch (stat.label) {
                case "Player name":
                    return {
                        ...PlayersTableConfig.getPlayerNameColumn(),
                    };
                case "Price":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        width: 75,
                        minWidth:75,
                        maxWidth:150,
                        flex:1,
                        valueGetter: (params: ValueGetterParams<PlayerData>) => {
                            const value = params.data?.[stat.name as keyof PlayerData];
                            return typeof value === 'number' ? value / 10 : undefined;
                        },
                        valueFormatter: (params: ValueFormatterParams) => {
                            const value = params.value as number;
                            return value ? value.toFixed(1) : '';
                        },
                        cellClassRules: PlayersTableConfig.getPriceCellClassRules(),
                    };
                case "Selected":
                case "PPG":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        width: 75,
                        minWidth:75,
                        maxWidth:150,
                        flex:1,
                        cellClassRules: PlayersTableConfig.getRankCellClassRules(stat.rank),
                    };
                default:
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        width: 75,
                        minWidth:75,
                        maxWidth:150,
                        flex:1,
                    };
            }
        });

        // Ensure the Player Name column is always included and has a fixed width
        if (!columnDefs.some(colDef => colDef.field === 'playerName')) {
            columnDefs.unshift({
                ...PlayersTableConfig.getPlayerNameColumn(),
                width: 150,
                flex:1,
                minWidth:150,
            });
        }

        return columnDefs;
    };

    private static getPriceCellClassRules = () => {
        return {
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
        };
    };

    private static getRankCellClassRules = (rankFieldName: string) => {
        return {
            'table-very-high-rank': (params: CellClassParams<PlayerData>) => {
                const rankValue = params.data?.[rankFieldName as keyof PlayerData] as number;
                return rankValue <= 50;
            },
            'table-high-rank': (params: CellClassParams<PlayerData>) => {
                const rankValue = params.data?.[rankFieldName as keyof PlayerData] as number;
                return rankValue >= 50 && rankValue < 100;
            },
            'table-mid-rank': (params: CellClassParams<PlayerData>) => {
                const rankValue = params.data?.[rankFieldName as keyof PlayerData] as number;
                return rankValue >= 100 && rankValue < 150;
            },
            'table-low-rank': (params: CellClassParams<PlayerData>) => {
                const rankValue = params.data?.[rankFieldName as keyof PlayerData] as number;
                return rankValue >= 150 && rankValue < 200;
            },
            'table-very-low-rank': (params: CellClassParams<PlayerData>) => {
                const rankValue = params.data?.[rankFieldName as keyof PlayerData] as number;
                return rankValue > 200;
            },
        };
    };
}