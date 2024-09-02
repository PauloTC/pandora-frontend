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

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getExperiments() {
    try {
      const populateExperiment =
        "&populate[1]=experiment_type&populate[2]=participants.photo&populate[3]=vp&populate[4]=project&populate[5]=experiment_type&populate[6]=vp&populate[7]=execution_methods";

      const sortExperiments = "sort[0]=initial_date:desc";

      const pagination = `&pagination[page]=1&pagination[pageSize]=9`;

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.EXPERIMENTS}?${sortExperiments}${populateExperiment}${pagination}`;
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

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateExperiment(id, data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.EXPERIMENTS}/${id}`;
      const params = {
        method: "PUT",
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

      return result;
    } catch (error) {
      throw error;
    }
  }

  async filterExperiments(filters) {
    const {
      sort,
      vp,
      execution_methods,
      experiment_type,
      status,
      pagination,
      search,
    } = filters;

    let filter = "";

    if (vp) {
      filter += `&filters[vp][$eq]=${vp}`;
    }

    if (execution_methods) {
      filter += `&filters[execution_methods][$eq]=${execution_methods}`;
    }

    if (experiment_type) {
      filter += `&filters[experiment_type][$eq]=${experiment_type}`;
    }

    if (status) {
      filter += `&filters[status][$eq]=${status}`;
    }
    if (pagination) {
      filter += `&pagination[page]=${pagination.page}&pagination[pageSize]=9`;
    }

    if (search) {
      filter += `&filters[title][$contains]=${search}`;
    }

    try {
      const populateExperiment =
        "&populate[1]=experiment_type&populate[2]=participants.photo&populate[3]=vp&populate[4]=project&populate[5]=experiment_type&populate[6]=vp&populate[7]=execution_methods";

      const sortInvestigation = `sort[0]=initial_date:${sort}`;

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.EXPERIMENTS}?${filter}&${populateExperiment}&${sortInvestigation}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
