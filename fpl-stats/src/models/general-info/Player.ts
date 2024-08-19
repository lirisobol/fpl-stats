export const playerStatsModel = [
    {
        "id": 1,
        "label": "Player name",
        "name": "player_name"
    },
    {
        "id": 2,
        "label": "Price",
        "name": "now_cost"
    },
    {   
        "id": 3,
        "label": "Selected",
        "name": "selected_by_percent",
        "rank": "selected_rank"
    },
    {
        "id": 4,
        "label": "PPG",
        "name": "points_per_game",
        "rank": "points_per_game_rank"
    },
    {
        "id":5,
        "label": "BPS",
        "name": "bps"
    },
    {
        "id": 6,
        "label": "xG",
        "name": "expected_goals"
    },
    {
        "id": 7,
        "label": "xA",
        "name": "expected_assists"
    },
    {
        "id": 8,
        "label": "xGI",
        "name": "expected_goal_involvements"
    },
    {
        "id": 9,
        "label": "Conceded",
        "name": "goals_conceded"
    },
    {
        "id": 10,
        "label": "Bonus",
        "name": "bonus"
    },
    {
        "id": 11,
        "label": "Influence",
        "name": "influence"
    },
    {
        "id": 12,
        "label": "Creativity",
        "name": "creativity"
    },
    {
        "id": 13,
        "label": "Threat",
        "name": "threat"
    },
    {
        "id": 14,
        "label": "ICT Index",
        "name": "ict_index"
    },
    {
        "id": 15,
        "label": "Expected Goals Conceded",
        "name": "expected_goals_conceded"
    },
]
export interface PlayerStat {
    id: number;
    label: string;
    name: string;
    rank?: string; // Optional since not all stats have a rank
}
export interface PlayerData {
    [key: string]: number | string; // Allows for additional dynamic fields
    first_name: string; // Optional, as not all data might have this field
    second_name: string; // Optional, as not all data might have this field
    player_name: string; // Optional, based on your data structure
    chance_of_playing_this_round:number;
    chance_of_playing_next_round:number;
    now_cost: number; // Price
    selected_by_percent: number; // Selected
    selected_rank: number; // Rank for Selected
    points_per_game: number; // PPG
    points_per_game_rank: number; // Rank for PPG
    bps: number; // BPS
    expected_goals: number; // xG
    expected_assists: number; // xA
    expected_goal_involvements: number; // xGI
    goals_conceded: number; // Conceded
    bonus: number; // Bonus
    influence: number; // Influence
    creativity: number; // Creativity
    threat: number; // Threat
    ict_index: number; // ICT Index
    expected_goals_conceded: number; // Expected Goals Conceded
}
export const advancedStatsModel = [
    {
        "id": 1,
        "label": "Player name",
        "name": "player_name"
    },
    {
        "id": 2,
        "label": "Price",
        "name": "now_cost"
    },
    {   
        "id": 3,
        "label": "Selected",
        "name": "selected_by_percent",
        "rank": "selected_rank"
    },
    {
        "id": 4,
        "label": "Points Per Game",
        "name": "points_per_game",
        "rank": "points_per_game_rank"
    },
    {
        "id": 5,
        "label": "Chance Of Playing This Round",
        "name": "chance_of_playing_this_round",
    },
    {
        "id": 6,
        "label": "Chance Of Playing Next Round",
        "name": "chance_of_playing_next_round",
    },
    {
        "id":7,
        "label": "BPS",
        "name": "bps"
    },
    {
        "id": 8,
        "label": "xG",
        "name": "expected_goals"
    },
    {
        "id": 9,
        "label": "xA",
        "name": "expected_assists"
    },
    {
        "id": 10,
        "label": "xGI",
        "name": "expected_goal_involvements"
    },
    {
        "id": 11,
        "label": "Conceded",
        "name": "goals_conceded"
    },
    {
        "id": 12,
        "label": "Bonus",
        "name": "bonus"
    },
    {
        "id": 13,
        "label": "Influence",
        "name": "influence"
    },
    {
        "id": 14,
        "label": "Creativity",
        "name": "creativity"
    },
    {
        "id": 15,
        "label": "Threat",
        "name": "threat"
    },
    {
        "id": 16,
        "label": "ICT Index",
        "name": "ict_index"
    },
    {
        "id": 17,
        "label": "xGC",
        "name": "expected_goals_conceded"
    },
]