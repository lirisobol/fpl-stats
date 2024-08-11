import {Fixture} from "./Fixture"

export interface Event {
    id:number; // event id
    name:string; // "Gameweek x"
    is_current:boolean;
    is_previous: boolean;
    is_next:boolean;
    fixtures: Fixture[];
}