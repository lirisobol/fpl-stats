export interface Fixture { // Game
    // game ->
    id: number; // game Id
    event: number; // gameweek Id
    code: number;
    // game details ->
    kickoff_time: string; // game date
    finished: boolean; // did game end ?
    finished_provisional: boolean;
    minutes: number;
    started: boolean; // did game start ?
    provisional_start_time: string;
    //  away team ->
    team_a: number; // away team Id
    team_a_score: string; // currently null !!!!!!
    team_a_difficulty: number; // away team strength
    // home team ->
    team_h: number; // home team Id
    team_h_score: string; // currently null !!!!!!
    team_h_difficulty: number; // home team strength

    pulse_id:number; // ? 

}