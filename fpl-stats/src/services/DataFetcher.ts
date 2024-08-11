import { Event } from "../models/general-info/Event";
import { Team } from "../models/general-info/Team";
import GeneralInformation from "../models/general-info/GeneralInformation";
import { appConfig } from "../utils/appConfig";
import { localServerApi, netlifyProxyApi } from "../utils/axiosConfig";
import { Fixture } from "../models/general-info/Fixture";

class DataFetcher {
    public async getGeneralInformation(): Promise<GeneralInformation> {
        if(appConfig.env === "dev") {
            try {
                const response = await localServerApi.get<GeneralInformation>('general-information');
                const generalInfo = new GeneralInformation();
                
                // Set general information
                generalInfo.teams = response.data.teams;
                generalInfo.element_stats = response.data.element_stats;
                generalInfo.element_types = response.data.element_types;
                generalInfo.elements = response.data.elements;
                generalInfo.events = response.data.events;
                
                // Fetch fixtures data
                const fixtures = await this.getFixtures();
                // Associate fixtures with events
                generalInfo.events.forEach(event => {
                    event.fixtures = fixtures.filter(fixture => fixture.event === event.id);
                });
                this.getNextGamesForTeam(generalInfo);
                return generalInfo.toPlainObject();
            } 
            catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        } else {
            try {
                const response = await netlifyProxyApi.get('general-information');
                return response.data;
            } 
            catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
    }
    public async getFixtures(): Promise<Fixture[]> {
        if(appConfig.env === "dev") {
            try {
                const response = await localServerApi.get<Fixture[]>('fixtures');
                console.log('Fixtures API Response:', response.data);
                return response.data;
            } 
            catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
        else {
            try {
                const response = await netlifyProxyApi.get('fixtures');
                console.log('API Response:', response.data);
                return response.data;
            } 
            catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
    }
    public getNextGamesForTeam(generalInfo: GeneralInformation): void {
        // Find the current game week index
        const currentGameWeekIndex = generalInfo.events.findIndex((event: Event) => event.is_next);
    
        if (currentGameWeekIndex !== -1) {
            // Determine next 5 game weeks
            const nextGameWeeks: Event[] = generalInfo.events.slice(currentGameWeekIndex, currentGameWeekIndex + 5);
    
            generalInfo.teams.forEach((team: Team) => {
                let teamUpcomingFixtures: Fixture[] = [];
    
                // Iterate over each of the next 5 game weeks
                nextGameWeeks.forEach((gameWeek: Event) => {
                    // Extract fixtures for the current team in each game week
                    const fixturesForGameWeek: Fixture[] = gameWeek.fixtures.filter((fixture: Fixture) =>
                        fixture.team_a === team.id || fixture.team_h === team.id
                    );
    
                    teamUpcomingFixtures = teamUpcomingFixtures.concat(fixturesForGameWeek);
                });
    
                team.next_5_games = teamUpcomingFixtures.slice(0, 5);
                console.log(`Team ${team.name} next 5 games:`, team.next_5_games);
            });
        }
    }
    
    
    // // !data handling of fixtures!
    // public getUpcomingGames(generalInformation:GeneralInformation,teamId:number, range:number) {
    //     const now = new Date().getTime() / 1000;

    //     const upcomingGameWeeks = generalInformation.events
    //         .filter(event => event.dead) 
    // }
}

export const dataFetcher = new DataFetcher();
