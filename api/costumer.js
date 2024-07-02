import { ENV } from "@/utils";

export class Costumer {
  async getAllCostumers() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.COSTUMERS}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCostumerById(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.COSTUMERS}/${id}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createCostumer(costumer) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.COSTUMERS}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: costumer }),
      });

      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
