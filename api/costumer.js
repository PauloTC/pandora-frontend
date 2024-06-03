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
}
