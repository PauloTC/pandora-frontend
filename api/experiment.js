import { ENV } from "@/utils";

export class Experiment {
  async getExperiments() {
    try {
      const populateExperiment = "&populate[1]=experiment_type";

      const sortExperiments = "sort[0]=initial_date:desc";

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.EXPERIMENTS}?${sortExperiments}${populateExperiment}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
