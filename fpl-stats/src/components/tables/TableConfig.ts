import { CellClassParams, ColDef, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { PlayerRemoverHeader } from "./PlayerCompareTable/PlayerRemoverHeader/PlayerRemoverHeader";
import { ViewPlayersButtons } from "./LeagueTable/ViewPlayersButton/ViewPlayersButton";
import { PlayerData, PlayerStat, playerStatsModel } from "../../models/general-info/Player";
import { Team } from "../../models/general-info/Team";

interface RowData {
    stat: string;
    [key: string]: unknown; // This allows for dynamic keys and values
}
class TableConfig {
// Default Setups ->
// -----------------------------------------------------------------------------------------------------------------------------------------

    public autoSizeStrategy = {
        type: 'fitGridWidth' as const,
        defaultMinWidth: 75,
        columnLimits: [
            {
                colId: 'playerName',
                minWidth: 150,
            }
        ]
    };
    public defaultColDef = {
        sortable: true,
        resizable: true,
    };
    public defaultColDefFlexed = {
        sortable: true,
        resizable: true,
        flex:1
    };
// Players Table Defs -> 
// -----------------------------------------------------------------------------------------------------------------------------------------
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
                        width:75,
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
                        width:75,
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
/* Compare Table Defs -> 
// -----------------------------------------------------------------------------------------------------------------------------------------
    // Column and Row definitions used in <PlayersCompareTable>
    /* todo -> 
    1. conditional coloring ->
        a. price - lower value is better
        b. goals conceded - lower value is better

    2. price should be displayed as float, 60 -> 6.0
    */ 
    public generateCompareColDef = (selectedPlayers:PlayerData[]) => {
        const columns: ColDef[] = [
            { headerName: "Stat", field: "stat", pinned: 'left', width: 110 },
            ...selectedPlayers.map((player, index) => ({
                headerName: `${player.first_name} ${player.second_name}`,
                field: `player${index}`,
                flex: 1,
                cellClassRules: this.getCompareCellClassRules(selectedPlayers.length),
                suppressHeaderFilterButton: true,
                sortable: false,
                headerComponent: PlayerRemoverHeader,
                headerComponentParams: {
                    playerId: player.id,
                    playerName: `${player.first_name} ${player.second_name}`
                }
            } as ColDef)),
        ];
        return columns;
    };
    public generateCompareRowDef = (selectedPlayers:PlayerData[]) => {
        return playerStatsModel
            .filter(stat => stat.name !== "player_name")
            .map(stat => {
                const row: RowData = { stat: stat.label };
                selectedPlayers.forEach((player, index) => {
                    const value = player[stat.name];
                    row[`player${index}`] = isNaN(Number(value)) ? value : Number(value);
                });
                return row;
            });
    };
    // Conditional Coloring for comparison table
    private getCompareCellClassRules = (numPlayers: number) => {
        if(numPlayers === 2) return {
            // For two-player comparison
            'compare-high': (params: CellClassParams) => {
                if (numPlayers === 2) {
                    const val1 = params.data[`player0`];
                    const val2 = params.data[`player1`];
                    return (val1 > val2 && params.colDef.field === 'player0') || (val2 > val1 && params.colDef.field === 'player1');
                }
                return false;
            },
            'compare-low': (params: CellClassParams) => {
                if (numPlayers === 2) {
                    const val1 = params.data[`player0`];
                    const val2 = params.data[`player1`];
                    return (val1 < val2 && params.colDef.field === 'player0') || (val2 < val1 && params.colDef.field === 'player1');
                }
                return false;
            },
            'compare-equal': (params: CellClassParams) => {
                if (numPlayers === 2) {
                    const val1 = params.data[`player0`];
                    const val2 = params.data[`player1`];
                    return val1 === val2;
                }
                return false;
            }
        }
        if(numPlayers === 3) return {
            // For three-player comparison
            'compare-high': (params: CellClassParams) => {
                if (numPlayers === 3) {
                    const val1 = params.data[`player0`];
                    const val2 = params.data[`player1`];
                    const val3 = params.data[`player2`];
                    const values = [val1, val2, val3];
                    const max = Math.max(...values);
                    return values.filter(v => v === max).length === 1 && params.value === max;
                }
                return false;
            },
            'compare-low': (params: CellClassParams) => {
                if (numPlayers === 3) {
                    const val1 = params.data[`player0`];
                    const val2 = params.data[`player1`];
                    const val3 = params.data[`player2`];
                    const values = [val1, val2, val3];
                    const min = Math.min(...values);
                    return values.filter(v => v === min).length === 1 && params.value === min;
                }
                return false;
            },
            'compare-mid': (params: CellClassParams) => {
                if (numPlayers === 3) {
                    const val1 = params.data[`player0`];
                    const val2 = params.data[`player1`];
                    const val3 = params.data[`player2`];
                    const values = [val1, val2, val3];
                    const max = Math.max(...values);
                    const min = Math.min(...values);
                    return values.filter(v => v !== max && v !== min).length === 1 && params.value !== max && params.value !== min;
                }
                return false;
            }
        }
    };
// League Table Defs -> 
// -----------------------------------------------------------------------------------------------------------------------------------------
    public generateLeagueColDef = (teams: Team[]): ColDef[] => {
        const columns: ColDef[] = [
            { headerName: "Team", field: "name" },
            { headerName: "Points", field: "points" },
            { headerName: "Position", field: "position" },
            {
                headerName: "Game 1",
                valueGetter: (params) => {
                    return this.getOpponentName(params.data, 0, teams);
                }
            },
            {
                headerName: "Game 2",
                valueGetter: (params) => {
                    return this.getOpponentName(params.data, 1, teams);
                }
            },
            {
                headerName: "Game 3",
                valueGetter: (params) => {
                    return this.getOpponentName(params.data, 2, teams);
                }
            },
            {
                headerName: "Game 4",
                valueGetter: (params) => {
                    return this.getOpponentName(params.data, 3, teams);
                }
            },
            {
                headerName: "Game 5",
                valueGetter: (params) => {
                    return this.getOpponentName(params.data, 4, teams);
                }
            },
            { headerName: 'Players', field: 'code', cellRenderer: ViewPlayersButtons }
        ];
    
        return columns;
    };
    //  League table coloring rules ->
    private getLeagueCellClassRules = () => {}



// Helpers ->
// -----------------------------------------------------------------------------------------------------------------------------------------
    // Helper function to get opponent name
    public getOpponentName(team: Team, gameIndex: number, teams: Team[]): string {
        if (team.next_5_games && team.next_5_games.length > gameIndex) {
            const game = team.next_5_games[gameIndex];
            const opponentId = team.id === game.team_h ? game.team_a : game.team_h;
            return this.getTeamShortNameById(opponentId, teams);
        }
        return ""; // Return an empty string if no game or invalid index
    }
    public getTeamShortNameById(teamId: number, teams: Team[]): string {
        const team = teams.find(team => team.id === teamId);
        return team ? team.short_name : 'Unknown';
    }
    // concat first and second names as Player Name field
    private getPlayerNameColumn = (): ColDef => ({
        headerName: 'Player Name',
        field: 'playerName',
        valueGetter: (params: ValueGetterParams<PlayerData>) => {
            const firstName = params.data?.first_name || '';
            const secondName = params.data?.second_name || '';
            return `${firstName} ${secondName}`;
        },
    });
}
export const tableConfig = new TableConfig();