import { ElementType } from "react";
import { Team } from "./Team";
import { ElementStat } from "./ElementStat";
import { Element } from "./Element";
import { Event } from "./EventModel";
import { Fixture } from "../FixtureModel";

class GeneralInformation {
    public elements: Array<Element> = []; // players
    public teams: Array<Team> = []; // teams
    public element_types: Array<ElementType> = []; // player types
    public element_stats: Array<ElementStat> = []; // stats headings
    public events: Array<Event> = []; // game weeks
    public fixtures: Array<Fixture> = []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toPlainObject(): Record<string, any> {
        return {
            elements: this.elements,
            teams: this.teams,
            element_types: this.element_types,
            element_stats: this.element_stats,
            events: this.events,
            fixtures: this.fixtures,
        };
    }
}
export default GeneralInformation;