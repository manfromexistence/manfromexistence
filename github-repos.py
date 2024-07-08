# import requests
# import json

# def get_all_repos(username):
#     url = f"https://api.github.com/users/{username}/repos"
#     try:
#         response = requests.get(url)
#         response.raise_for_status()
#         repos = response.json()
#         return repos
#     except requests.RequestException as e:
#         print(f"Error fetching repositories: {e}")
#         return []

# if __name__ == "__main__":
#     username = "manfromexistence"

#     repositories = get_all_repos(username)
#     repo_data = [{"name": repo['name'], "description": repo['description']} for repo in repositories]

#     # Convert to JSON format
#     repo_json = json.dumps(repo_data, indent=2)
#     print(repo_json)

# import requests
# import json

# def get_all_repos(username):
#     url = f"https://api.github.com/users/{username}/repos"
#     try:
#         response = requests.get(url)
#         response.raise_for_status()
#         repos = response.json()
#         return repos
#     except requests.RequestException as e:
#         print(f"Error fetching repositories: {e}")
#         return []

# if __name__ == "__main__":
#     username = "manfromexistence"

#     repositories = get_all_repos(username)
#     repo_data = [{"name": repo['name'], "description": repo['description']} for repo in repositories]

#     # Convert to JSON format
#     repo_json = json.dumps(repo_data, indent=2)
#     print(repo_json)

#     print(f"There are {len(repositories)} number of repos in your GitHub account.")





# import requests
# import json

# def get_all_repos(username):
#     url = f"https://api.github.com/users/{username}/repos"
#     try:
#         response = requests.get(url)
#         response.raise_for_status()
#         repos = response.json()
#         return repos
#     except requests.RequestException as e:
#         print(f"Error fetching repositories: {e}")
#         return []

# if __name__ == "__main__":
#     username = "manfromexistence"

#     repositories = get_all_repos(username)
#     repo_data = [{"name": repo['name'], "description": repo['description']} for repo in repositories]

#     # Convert to JSON format
#     repo_json = json.dumps(repo_data, indent=2)
#     print(repo_json)

#     print(f"There are {len(repositories)} number of repos in your GitHub account.")



# import requests
# import json

# def get_all_repos(username):
#     url = f"https://api.github.com/users/{username}/repos"
#     try:
#         response = requests.get(url)
#         response.raise_for_status()
#         repos = response.json()
#         return repos
#     except requests.RequestException as e:
#         print(f"Error fetching repositories: {e}")
#         return []

# if __name__ == "__main__":
#     username = "manfromexistence"

#     repositories = get_all_repos(username)
#     repo_data = [{"name": repo['name'], "description": repo['description']} for repo in repositories]

#     # Convert to JSON format
#     repo_json = json.dumps(repo_data, indent=2)
#     print(repo_json)



# def get_repo_count(username):
#     url = f"https://api.github.com/users/{username}"
#     try:
#         response = requests.get(url)
#         response.raise_for_status()
#         user_data = response.json()
#         return user_data["public_repos"]
#     except requests.RequestException as e:
#         print(f"Error fetching user data: {e}")
#         return None

# if __name__ == "__main__":
#     username = "manfromexistence"

#     repo_count = get_repo_count(username)
#     if repo_count is not None:
#         print(f"Total number of repositories: {repo_count}")
#     else:
#         print("Unable to retrieve repository count. Please check your username or try again later.")


# from github import Github

# # Authentication is defined via github.Auth
# from github import Auth

# # using an access token
# auth = Auth.Token("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")

# # First create a Github instance:

# # Public Web Github
# g = Github(auth=auth)

# # Github Enterprise with custom hostname
# g = Github(base_url="https://{hostname}/api/v3", auth=auth)

# # Then play with your Github objects:
# for repo in g.get_user().get_repos():
#     print(repo.name)

# # To close connections after use
# g.close()

# from github import Github

# # Create a Github instance
# g = Github()

# # Replace '<username>' with the target user's GitHub username
# user = g.get_user("manofexistence")
# repos = user.get_repos()

# # Filter out forked repositories
# non_forks = [repo.name for repo in repos if not repo.fork]

# print(non_forks)



import requests
import json

def get_all_repos(username):
    url = f"https://api.github.com/users/{username}/repos"
    try:
        response = requests.get(url)
        response.raise_for_status()
        repos = response.json()
        return repos
    except requests.RequestException as e:
        print(f"Error fetching repositories: {e}")
        return []

if __name__ == "__main__":
    username = "manfromexistence"

    repositories = get_all_repos(username)
    repo_data = [{"name": repo['name'], "description": repo['description']} for repo in repositories]

    # Convert to JSON format
    repo_json = json.dumps(repo_data, indent=2)
    print(repo_json)

def get_repo_count(username):
    url = f"https://api.github.com/users/{username}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        user_data = response.json()
        return user_data["public_repos"]
    except requests.RequestException as e:
        print(f"Error fetching user data: {e}")
        return None

if __name__ == "__main__":
    username = "manfromexistence"

    repo_count = get_repo_count(username)
    if repo_count is not None:
        print(f"Total number of repositories: {repo_count}")
    else:
        print("Unable to retrieve repository count. Please check your username or try again later.")
