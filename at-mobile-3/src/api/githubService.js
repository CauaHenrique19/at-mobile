import axios from "axios";

const BASE_URL = "https://api.github.com";

class GitHubService {
  constructor(token) {
    this.token = token;
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserProfile() {
    try {
      const response = await this.api.get("/user");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getRepositories(page = 1, perPage = 20) {
    try {
      const response = await this.api.get("/user/repos", {
        params: { page, per_page: perPage },
      });
      return {
        repositories: response.data,
        totalCount: parseInt(response.headers["x-total-count"] || 0, 10),
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserIssues(page = 1, perPage = 20) {
    try {
      const response = await this.api.get("/issues", {
        params: { page, per_page: perPage, state: "all" },
      });
      return {
        issues: response.data,
        totalCount: parseInt(response.headers["x-total-count"] || 0, 10),
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createIssue(repoOwner, repoName, issueData) {
    try {
      const response = await this.api.post(
        `/repos/${repoOwner}/${repoName}/issues`, 
        issueData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    console.error("GitHub API Error:", error);
    return {
      message: error.response?.data?.message || "Erro na requisição",
      status: error.response?.status,
    };
  }
}

export default GitHubService;
