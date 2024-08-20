# GitHub User and Repository Search

A React application to search for GitHub users and view their repositories. This project uses the GitHub API to fetch user details, repositories, and repository statistics like the number of stars.

## Features

- Search for GitHub users by username.
- View details of each user, including their public repositories.
- Pagination support for repositories (load more repositories on demand).
- Clean and responsive UI built with SCSS.
- State management using Redux.

## Demo

(link here)

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Redux**: State management for handling the application state.
- **TypeScript**: For static typing and better developer experience.
- **Octokit**: GitHub's official JavaScript library for interacting with the GitHub API.
- **SCSS**: CSS preprocessor for styling.
- **FontAwesome**: For icons.
- **Webpack & React Scripts**: Build and bundling tools.

## Installation and Setup

To run the application locally, follow the steps below:

### 1. Clone the repository:

```bash
git clone https://github.com/Natalialas/github-user-search.git
cd github-user-search
```

### 2. Install the dependencies:

```bash
npm install
```

### 3. Set up the GitHub API token:
Create a .env file in the root of the project with the following content:

```bash
REACT_APP_GITHUB_TOKEN=your_github_token
```

Make sure you replace your_github_token with a valid GitHub personal access token. You can create a token by visiting GitHub Developer Settings.

### 4. Start the development server:

```bash
npm start
```
This will start the application at http://localhost:3000.

## Usage
1. Open the application in your browser.
2. Enter a GitHub username in the search bar and click "Search".
3. The application will display matching users. Click on a user to view their repositories.
4. You can load more repositories by clicking the "Show more" button if the user has more than 5 repositories.

## Project Structure

- **`src/api/githubApi.ts`**: Contains functions that make API requests to GitHub using Octokit.
- **`src/components/`**: Contains React components such as `SearchBar`, `UserList`, and `RepositoryList`.
- **`src/redux/`**: Contains Redux-related code, including reducers and store configuration.
- **`src/styles/`**: SCSS stylesheets for the application.

## Example Code

Here is a brief example of how we use the GitHub API to search for users:

```typescript
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
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
```

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner in interactive watch mode.
- **`npm run build`**: Builds the app for production to the `build` folder.
- **`npm run eject`**: Ejects the app from `react-scripts` for advanced customization.

## Future Improvements

- Add tests for components and API calls.
- Improve UI responsiveness and accessibility.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
