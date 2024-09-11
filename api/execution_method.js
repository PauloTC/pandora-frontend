import { ENV } from "@/utils";

export class ExecutionMethod {
  async getAllExecutionMethods() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.EXECUTION_METHODS}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
