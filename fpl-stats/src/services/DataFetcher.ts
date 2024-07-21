import { GeneralInformation } from "../models/DataModel";
import api from "../utils/axiosConfig";

class DataFetcher {
    // unknown - temporary
    public async getGeneralInformation():Promise<GeneralInformation> {
        const response = await api.get('general-information');
        return response.data;
    }
}
export const dataFetcher = new DataFetcher();