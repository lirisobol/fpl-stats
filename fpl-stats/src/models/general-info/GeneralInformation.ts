import { ElementType } from "react";
import { Team } from "./Team";
import { ElementStat } from "./ElementStat";
import { Element } from "./Element";
import { Event } from "./EventModel";

export interface GeneralInformation {
    elements: Element[]; // players
    teams: Team[]; // teams
    element_types: ElementType[]; // player types
    element_stats: ElementStat[]; // stats headings
    events: Event[]; // game weeks
}