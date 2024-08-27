import { ENV } from "@/utils";

export class Experiment {
  async createExperiment(data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.EXPERIMENTS}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
          },
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      console.log("result", result);
      // // Obtener el experimento creado
      // const createdExperiment = await this.getExperiment(
      //   result.data.attributes.slug
      // );

      return createdExperiment;
    } catch (error) {
      throw error;
    }
  }

  async getExperiments() {
    try {
      const populateExperiment =
        "&populate[1]=experiment_type&populate[2]=participants.photo&populate[3]=vp&populate[4]=project&populate[5]=experiment_type&populate[6]=vp&populate[7]=execution_methods";

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

  async getExperiment(id) {
    try {
      const populateExperiment =
        "populate[1]=experiment_type&populate[2]=participants.photo&populate[3]=vp&populate[4]=project&populate[5]=experiment_type&populate[6]=vp&populate[7]=execution_methods";

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.EXPERIMENTS}/${id}?${populateExperiment}`;

      const response = await fetch(url);
      const result = await response.json();

      console.log("result", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
