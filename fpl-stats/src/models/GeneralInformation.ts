import { ElementType } from "react";
import { Team } from "./Team";
import { ElementStat } from "./ElementStat";
import { Element } from "./Element";

export interface GeneralInformation {
    elements: Element[];
    teams: Team[];
    element_types: ElementType[];
    element_stats: ElementStat[];
}