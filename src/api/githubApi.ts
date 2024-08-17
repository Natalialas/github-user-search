import { Octokit } from "octokit";

const octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN,
});

export const searchUsers = async (username: string) => {
    try {
      const response = await octokit.request('GET /search/users', {
        q: username,
        per_page: 5,
      });
      return response.data.items;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
};

export const getUserRepos = async (username: string) => {
    try {
      const response = await octokit.request('GET /users/{username}/repos', {
        username: username,
        per_page: 10,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching repos:", error);
      return [];
    }
};