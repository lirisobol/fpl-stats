export class TeamsModel {
    id:number = 0;
    win: number = 0;
    draw: number = 0;
    loss: number = 0;
    name:string = '';
    short_name:string = '';
    strength: number = 0;
    strength_overall_home:number = 0;
    strength_overall_away:number = 0;
}
export interface GeneralInformation {
    teams: TeamsModel[];
    // Include other fields if necessary
}