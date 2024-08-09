import { ENV } from "@/utils";

export class Experiment {
  async getExperiments() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.EXPERIMENTS}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
