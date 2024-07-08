// Replace with your personal access token
const accessToken = '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';

async function getRepos(username: string) {
    const baseUrl = 'https://api.github.com';
    const reposUrl = `${baseUrl}/users/${username}/repos`;

    const response = await fetch(reposUrl, {
        headers: {
            Authorization: `token ${accessToken}`,
        },
    });

    // Check for successful response status code (2xx) 
    if (!response.ok) {
        throw new Error(`Error fetching repos: ${response.status}`);
    }

    const data = await response.json();

    // Check if data is undefined before looping
    if (!data) {
        console.error('No data received from GitHub API');
        return; // Exit the function if no data
    }

    // Loop through repositories and get title and description
    for (const repo of data) {
        const title = repo.name;
        const description = repo.description;

        console.log(`Title: ${title}`);
        console.log(`Description: ${description}\n`);
    }
}

// Call the function with the username
getRepos('manofexistence').then(() => {
    console.log('Data fetching completed');
  });
  
