import { GeneralInformation } from "../models/general-info/GeneralInformation";
import { appConfig } from "../utils/appConfig";
import { localServerApi, netlifyProxyApi } from "../utils/axiosConfig";

class DataFetcher {
    public async getGeneralInformation(): Promise<GeneralInformation> {
        if(appConfig.env === "dev") {
            try {
                const response = await localServerApi.get('');
                console.log('API Response:', response.data);
                return response.data;
            } 
            catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
        else {
            try {
                const response = await netlifyProxyApi.get('');
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
