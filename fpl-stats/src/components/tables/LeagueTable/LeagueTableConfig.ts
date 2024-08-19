import { ColDef } from "ag-grid-community";
import { tableConfig, TableConfig } from "../TableConfig";
import { Team } from "../../../models/general-info/Team";

export class LeagueTableConfig extends TableConfig {
    // Generate column definitions for the league table
    public static generateLeagueColDef = (teams: Team[]): ColDef[] => {
        const columns: ColDef[] = [
            { headerName: "Team", field: "name", minWidth: 100, width:100,maxWidth:150, flex:1 },
            { headerName: "Points", field: "points", minWidth: 75 , width:75,maxWidth:150, flex:1},
            { headerName: "Position", field: "position", minWidth: 75 , width:75,maxWidth:150, flex:1},
            ...LeagueTableConfig.generateGameColumnsWithRules(teams, 5),  // Assuming 5 games to generate
        ];
        return columns;
    };

    // Generate game columns with rules
    private static generateGameColumnsWithRules = (teams: Team[], numGames: number): ColDef[] => {
        return Array.from({ length: numGames }, (_, i) => ({
            headerName: `Game ${i + 1}`,
            width:90,
            minWidth: 75,
            flex:1,
            valueGetter: (params) => tableConfig.getOpponentName(params.data, i, teams),
            cellClassRules: {
                'table-very-high-rank': (params) => LeagueTableConfig.determineStrength(params.data, i, teams) === 'very-high',
                'table-high-rank': (params) => LeagueTableConfig.determineStrength(params.data, i, teams) === 'high',
                'table-mid-rank': (params) => LeagueTableConfig.determineStrength(params.data, i, teams) === 'mid',
                'table-low-rank': (params) => LeagueTableConfig.determineStrength(params.data, i, teams) === 'low',
                'table-very-low-rank': (params) => LeagueTableConfig.determineStrength(params.data, i, teams) === 'very-low',
            }
        }));
    };

    // Determine strength based on game difficulty comparisons
    private static determineStrength = (team: Team, gameIndex: number, teams: Team[]): 'very-high' | 'high' | 'mid' | 'low' | 'very-low' => {
        if (team.next_5_games && team.next_5_games.length > gameIndex) {
            const game = team.next_5_games[gameIndex];
            const currentTeamDifficulty = team.id === game.team_h ? game.team_h_difficulty : game.team_a_difficulty;
            const opponentId = team.id === game.team_h ? game.team_a : game.team_h;
            const opponent = teams.find(t => t.id === opponentId);
            const opponentDifficulty = opponent ? (opponent.id === game.team_h ? game.team_h_difficulty : game.team_a_difficulty) : 0;

            if(currentTeamDifficulty > opponentDifficulty && currentTeamDifficulty - opponentDifficulty > 1) return 'very-low';
            if (currentTeamDifficulty > opponentDifficulty) return 'low';
            if (currentTeamDifficulty === opponentDifficulty) return 'mid';
            if(currentTeamDifficulty < opponentDifficulty && opponentDifficulty - currentTeamDifficulty > 1) return 'very-high';
            if (currentTeamDifficulty < opponentDifficulty) return 'high';
        }
        return 'mid'; // Default case
    };
}
