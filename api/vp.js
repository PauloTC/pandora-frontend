import { ENV } from "@/utils";

export class Vp {
  async getAllVps() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.VPS}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
