#include <curl/curl.h>
#include <iostream>
#include <string>
#include <vector>

// Replace with your GitHub access token
const std::string GITHUB_ACCESS_TOKEN =
    "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";
const std::string GITHUB_USERNAME =
    "manfromexistence"; // Replace with your GitHub username

// Function to delete a GitHub repository
bool deleteRepository(const std::string &repoName) {
  CURL *curl = curl_easy_init();
  if (!curl) {
    std::cerr << "Error initializing libcurl." << std::endl;
    return false;
  }

  // Set the GitHub API URL
  std::string apiUrl =
      "https://api.github.com/repos/" + GITHUB_USERNAME + "/" + repoName;

  // Set the required headers
  struct curl_slist *headers = nullptr;
  headers = curl_slist_append(
      headers, ("Authorization: token " + GITHUB_ACCESS_TOKEN).c_str());

  // Set the DELETE request
  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "DELETE");
  curl_easy_setopt(curl, CURLOPT_URL, apiUrl.c_str());
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

  // Perform the request
  CURLcode res = curl_easy_perform(curl);

  // Clean up
  curl_slist_free_all(headers);
  curl_easy_cleanup(curl);

  if (res != CURLE_OK) {
    std::cerr << "Error deleting repository " << repoName << ": "
              << curl_easy_strerror(res) << std::endl;
    return false;
  }

  std::cout << "Deleted repository: " << repoName << std::endl;
  return true;
}

int main() {
  // Replace with your repository names
  std::vector<std::string> reposToDelete = {
      "stocks",
      "infisical",
      "react-native-reusables",
      "snap",
      "snap-cloud-latest",
      "clerk-docs",
      "hello-nav",
      "npm-search",
      "dolt",
      "mindsdb",
      "instantsearch",
      "motion",
      "awesome-testing",
      "autocomplete",
      "excalidraw",
      "zx",
      "Inquirer.js",
      "ollama",
      "zitadel",
      "jan",
      "ink",
      "svgl",
      "BlockNote",
      "dub",
      "plandex",
      "prompts",
      "MEDLAI-Mood-Based-Music-Composition-Using-AI",
      "yargs",
      "tailwindcss",
      "xstream",
      "rainbowkit",
      "soltrade",
      "vercel",
      "youtube-dl",
      "openvscode-server",
      "enquirer",
      "google-translate-2.0-clone-nextjs-14-ms-azure-clerk-openai-mongodb",
      "javascript-millionaire",
      "blessed-contrib",
      "highstorm",
      "TTS",
      "use-sound",
      "awesome-totally-open-chatgpt",
      "google-translate",
      "snap-cloud",
  };

  for (const auto &repo : reposToDelete) {
    if (deleteRepository(repo)) {
      std::cout << "Successfully deleted " << repo << std::endl;
    } else {
      std::cerr << "Failed to delete " << repo << std::endl;
    }
  }

  return 0;
}
