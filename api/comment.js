import { ENV } from "@/utils";

export class Comment {
  async getComments() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.COMMENTS}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCommentsByExperiment(id) {
    try {
      const filterExperiments = `filters[experiment][id][$eq]=${id}`;

      const populateComment = "populate[1]=user.photo";

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.COMMENTS}?${filterExperiments}&${populateComment}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createComment(data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.COMMENTS}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
          },
        }),
      });
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
