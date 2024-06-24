import { ENV } from "@/utils";

export class Material {
  async createMaterial(data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.MATERIALS}`;
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

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMaterial(id, data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.MATERIALS}/${id}`;

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

  async deleteMaterial(id) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.MATERIALS}/${id}`;

      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
