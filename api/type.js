import { ENV } from "@/utils";

export class InvestigationType {
  async getInvestigationTypes() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATION_TYPES}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
