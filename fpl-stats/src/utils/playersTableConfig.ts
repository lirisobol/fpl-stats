import { CellClassParams, ColDef, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { PlayerData, PlayerStat } from "../models/Player";

class PlayersTableConfig {
    public getColumnDefs = (filteredColumns: PlayerStat[]): ColDef[] => {
        const columnDefs = filteredColumns.map(stat => {
            switch (stat.label) {
                case "Player name":
                    return this.getPlayerNameColumn();
                case "Price":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        valueGetter: (params: ValueGetterParams<PlayerData>) => {
                            const value = params.data?.[stat.name as keyof PlayerData];
                            return typeof value === 'number' ? value / 10 : undefined;
                        },
                        valueFormatter: (params: ValueFormatterParams) => {
                            const value = params.value as number;
                            return value ? value.toFixed(1) : '';
                        },
                        cellClassRules: {
                            'table-high-rank': (params: CellClassParams<PlayerData>) => {
                                const value = params.value as number;
                                return value < 5.5;
                            },
                            'table-mid-rank': (params: CellClassParams<PlayerData>) => {
                                const value = params.value as number;
                                return value >= 5.5 && value < 10.0;
                            },
                            'table-low-rank': (params: CellClassParams<PlayerData>) => {
                                const value = params.value as number;
                                return value >= 10.0;
                            },
                        }
                    };
                case "Selected":
                case "PPG":
                    return {
                        headerName: stat.label,
                        field: stat.name,
                        cellClassRules: {
                            'table-high-rank': (params: CellClassParams<PlayerData>) => {
                                const rankValue = params.data?.[stat.rank as keyof PlayerData] as number;
                                return rankValue <= 50;
                            },
                            'table-mid-rank': (params: CellClassParams<PlayerData>) => {
                                const rankValue = params.data?.[stat.rank as keyof PlayerData] as number;
                                return rankValue > 50 && rankValue <= 150;
                            },
                            'table-low-rank': (params: CellClassParams<PlayerData>) => {
                                const rankValue = params.data?.[stat.rank as keyof PlayerData] as number;
                                return rankValue > 150;
                            },
                        }
                    };
                default:
                    return {
                        headerName: stat.label,
                        field: stat.name,
                    };
            }
        });

        if (!columnDefs.some(colDef => colDef.field === 'playerName')) {
            columnDefs.unshift(this.getPlayerNameColumn());
        }

        return columnDefs;
    }

    public getPlayerNameColumn = (): ColDef => ({
        headerName: 'Player Name',
        field: 'playerName',
        valueGetter: (params: ValueGetterParams<PlayerData>) => {
            const firstName = params.data?.first_name || '';
            const secondName = params.data?.second_name || '';
            return `${firstName} ${secondName}`;
        },
    });

    public autoSizeStrategy = {
        type: 'fitGridWidth' as const,
        defaultMinWidth: 75,
        columnLimits: [
            {
                colId: 'playerName',
                minWidth: 150
            }
        ]
    };

    public defaultColDef = {
        sortable: true,
        resizable: true,
    };
}

export const playersTableConfig = new PlayersTableConfig();
