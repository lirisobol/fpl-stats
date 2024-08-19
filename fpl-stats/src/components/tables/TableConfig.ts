import { CellClassParams, ColDef, ValueGetterParams } from "ag-grid-community";
import { PlayerRemoverHeader } from "./PlayerCompareTable/PlayerRemoverHeader/PlayerRemoverHeader";
import { advancedStatsModel, PlayerData,  playerStatsModel } from "../../models/general-info/Player";
import { Team } from "../../models/general-info/Team";

interface RowData {
    stat: string;
    [key: string]: unknown; // This allows for dynamic keys and values
}
export class TableConfig {
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
    public getPlayerNameColumn = (): ColDef => ({
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