import requests

def get_repos(username, token):
    url = f"https://api.github.com/users/{username}/repos"
    headers = {"Authorization": f"token {token}"}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        repos = response.json()
        return repos
    except requests.RequestException as e:
        print(f"Error fetching repositories: {e}")
        return []

if __name__ == "__main__":
    username = "manofexistence"
    token = "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"

    repositories = get_repos(username, token)
    for repo in repositories:
        print(f"Repository: {repo['name']}")
        print(f"Private: {repo['private']}")
        print(f"Description: {repo['description']}\n")
