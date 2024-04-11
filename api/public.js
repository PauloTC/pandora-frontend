import { ENV } from "@/utils/constants";

export class Public {
  async getPublics() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.PUBLICS}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
