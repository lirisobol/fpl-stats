import { Fixture } from "../models/FixtureModel";
import GeneralInformation from "../models/general-info/GeneralInformation";
import { appConfig } from "../utils/appConfig";
import { localServerApi, netlifyProxyApi } from "../utils/axiosConfig";

class DataFetcher {
    public async getGeneralInformation(): Promise<GeneralInformation> {
        if(appConfig.env === "dev") {
            try {
                const response = await localServerApi.get<GeneralInformation>('general-information');
                const generalInfo = new GeneralInformation();
                generalInfo.teams = response.data.teams;
                generalInfo.element_stats = response.data.element_stats;
                generalInfo.element_types = response.data.element_types;
                generalInfo.elements = response.data.elements;
                generalInfo.events = response.data.events;
                generalInfo.fixtures = await this.getFixtures();
                console.log('general info:', generalInfo);
                return generalInfo.toPlainObject();
            } 
            catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
        else {
            try {
                const response = await netlifyProxyApi.get('general-information');
                console.log('API Response:', response.data);
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
}

export const dataFetcher = new DataFetcher();
