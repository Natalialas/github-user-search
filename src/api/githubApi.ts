import { Octokit } from "octokit";

const octokit = new Octokit({ 
    auth: process.env.GITHUB_TOKEN,
});

export const searchUsers = async (username: string) => {
    try {
      const { data } = await octokit.request('GET /search/users', {
        q: username,
        per_page: 5,
      });
      return data.items;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
};

export const getUserRepos = async (username: string, page: number = 1) => {
    try {
      const { data } = await octokit.request('GET /users/{username}/repos', {
        username: username,
        page: page,
        per_page: 5,
      });

      return {
        repos: data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
        }))
      };
    } catch (error) {
      console.error("Error fetching repos:", error);
      return { repos: [] };
    }
};

export const getUserDetails = async (username: string) => {
    try {
        const { data } = await octokit.request('GET /users/{username}', {
            username: username,
        });

        return {
            public_repos: data.public_repos,
        };
    } catch (error) {
        console.error("Error fetching user details:", error);
        return { public_repos: 0 };
    }
};
