import { GeneralInformation } from "../models/GeneralInformation";
import api from "../utils/axiosConfig";

class DataFetcher {
  public async getGeneralInformation(): Promise<GeneralInformation> {
    try {
      const response = await api.get('');
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export const dataFetcher = new DataFetcher();
