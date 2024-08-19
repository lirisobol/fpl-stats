import { CellClassParams, ColDef, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import { PlayerRemoverHeader } from "./PlayerCompareTable/PlayerRemoverHeader/PlayerRemoverHeader";
import { ViewPlayersButtons } from "./LeagueTable/ViewPlayersButton/ViewPlayersButton";
import { advancedStatsModel, PlayerData, PlayerStat, playerStatsModel } from "../../models/general-info/Player";
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
// Player Details Table Defs -> 
// -----------------------------------------------------------------------------------------------------------------------------------------
    // Generate column definitions
    public generatePlayerDetailsColumnsDef = (player: PlayerData) => {
        const columns: ColDef[] = [
            { headerName: "Stat", field: "stat", pinned: 'left', resizable: true ,width:110},
            { headerName: `${player.first_name} ${player.second_name}`, field: 'value',sortable: false, resizable: false },
        ];
        return columns;
    };

    // Generate row data
    public generatePlayerDetailsRowsDef = (player: PlayerData) => {

        return advancedStatsModel
            .filter(stat => stat.name !== "player_name") 
            .map(stat => {
                let value = player[stat.name];
                if (value === null || value === undefined) {
                    value = 'N/A'; // Handling null and undefined values
                } else if (typeof value === 'number') {
                    // Optionally format numbers here if necessary
                    value = Number(value).toFixed(2);
                }
                const row = {
                    stat: stat.label,
                    value: value
                };

                return row;
            });
    };

// League Table Defs -> 
// -----------------------------------------------------------------------------------------------------------------------------------------
    public generateLeagueColDef = (teams: Team[]): ColDef[] => {
        const columns: ColDef[] = [
            { headerName: "Team", field: "name",minWidth:100},
            { headerName: "Points", field: "points",minWidth:75 },
            { headerName: "Position", field: "position" ,minWidth:75 },
            // Define game columns with cell class rules
            ...this.generateGameColumnsWithRules(teams, 5), // Assuming 5 games to generate
            { headerName: 'Players', field: 'code', cellRenderer: ViewPlayersButtons,minWidth:75 }
        ];

        return columns;
    };

    private generateGameColumnsWithRules = (teams: Team[], numGames: number): ColDef[] => {
        return Array.from({ length: numGames }, (_, i) => ({
            headerName: `Game ${i + 1}`,
            minWidth: 75,
            valueGetter: (params) => {
                return this.getOpponentName(params.data, i, teams);
            },
            cellClassRules: {
                'table-very-high-rank': (params) => {
                    return this.determineStrength(params.data, i, teams) === 'very-high';
                },
                'table-high-rank': (params) => {
                    return this.determineStrength(params.data, i, teams) === 'high';
                },
                'table-mid-rank': (params) => {
                    return this.determineStrength(params.data, i, teams) === 'mid';
                },
                'table-low-rank': (params) => {
                    return this.determineStrength(params.data, i, teams) === 'low';
                },
                'table-very-low-rank': (params) => {
                    return this.determineStrength(params.data, i, teams) === 'very-low';
                }
            }
        }));
    };

    private determineStrength = (team: Team, gameIndex: number, teams: Team[]): 'very-high' | 'high' | 'mid' | 'low' | 'very-low' => {
        if (team.next_5_games && team.next_5_games.length > gameIndex) {
            const game = team.next_5_games[gameIndex];
            const currentTeamDifficulty = team.id === game.team_h ? game.team_h_difficulty : game.team_a_difficulty;
            const opponentId = team.id === game.team_h ? game.team_a : game.team_h;
            const opponent = teams.find(t => t.id === opponentId);
            const opponentDifficulty = opponent ? (opponent.id === game.team_h ? game.team_h_difficulty : game.team_a_difficulty) : 0;

            if(currentTeamDifficulty > opponentDifficulty && currentTeamDifficulty - opponentDifficulty > 1) return 'very-low'
            if (currentTeamDifficulty > opponentDifficulty) return 'low';
            if (currentTeamDifficulty === opponentDifficulty) return 'mid';
            if(currentTeamDifficulty < opponentDifficulty && opponentDifficulty - currentTeamDifficulty > 1) return 'very-high'
            if (currentTeamDifficulty < opponentDifficulty) return 'high';
        }
        return 'mid'; // Default case
    };
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