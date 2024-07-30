import { GeneralInformation } from "../models/GeneralInformation";
import api from "../utils/axiosConfig";

class DataFetcher {
    public async getGeneralInformation():Promise<GeneralInformation> {
        const response = await api.get('general-infdormation');
        console.log(response.data);
        return response.data;
    }
}
export const dataFetcher = new DataFetcher();