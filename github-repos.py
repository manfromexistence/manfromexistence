import json
import requests

def get_all_repos(username):
  """Fetches all public repositories of a GitHub user with pagination.

  Args:
      username: The username of the GitHub user.

  Returns:
      A list of dictionaries, each containing information about a repo.
  """

  all_repos = []
  url = f"https://api.github.com/users/{username}/repos?per_page=100"

  while url:
    response = requests.get(url)

    if response.status_code == 403:  # Check for rate limit error
      print("API rate limit reached. Waiting and retrying...")
      # Implement exponential backoff here

    response.raise_for_status()  # Raise an exception for other HTTP errors

    repos = response.json()
    all_repos.extend(repos)

    # Check for next page URL (Link header)
    link_header = response.headers.get('Link')
    if link_header:
      url = next((link for link in link_header.split(',') if 'rel="next"' in link), None)
      if url:
        url = url.strip('<>').split(';')[0]  # Extract actual URL
    else:
      url = None  # No more pages

  return all_repos

if __name__ == "__main__":
  username = input("Enter GitHub username: ")
  repos = get_all_repos(username)

  # Convert list to JSON and print
  json_data = json.dumps(repos, indent=4)
  print(json_data)
