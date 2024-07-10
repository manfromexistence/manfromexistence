Inspiration branch of better repository.
### C++ is fast!
```
sudo apt-get update
sudo apt-get install libcurl4-openssl-dev
g++ -o github-bulk-delete github-bulk-delete.cpp -lcurl
./github-bulk-delete
```



(
    "stocks"
    "test-new-stuffs"
    "infisical"
    "snippets-mate"
    "testing"
    "react-native-reusables"
    "spark-labs-website"
    "snap-project"
    "feild-manager-project"
    "snap"
    "people-per-hour-project"
    "field-manager"
    "dx-new"
    "dx-experiment"
    "dx-latest"
    "flutter"
    "snap-cloud-latest"
    "clerk-docs"
    "hello-nav"
    "npm-search"
    "dolt"
    "mindsdb"
    "instantsearch"
    "motion"
    "awesome-testing"
    "autocomplete"
    "llama3"
    "excalidraw"
    "zx"
    "Inquirer.js"
    "dx-depricated"
    "seyanet"
    "ollama"
    "zitadel"
    "jan"
    "ink"
    "svgl"
    "BlockNote"
    "dub"
    "plandex"
    "seyaha-net-marketplace"
    "prompts"
    "MEDLAI-Mood-Based-Music-Composition-Using-AI"
    "yargs"
    "tailwindcss"
    "xstream"
    "xstream-website"
    "xstream-dev-space"
    "rainbowkit"
    "soltrade"
    "youtube-automation"
    "vercel"
    "youtube-dl"
    "openvscode-server"
    "enquirer"
    "google-translate-2.0-clone-nextjs-14-ms-azure-clerk-openai-mongodb"
    "javascript-millionaire"
    "blessed-contrib"
    "highstorm"
    "TTS"
    "use-sound"
    "awesome-totally-open-chatgpt"
    "Solana-cli"
    "google-translate"
    "op"
    "Aladdin-Template-1o1"
    "Moralis-boilerplate"
    "aladdin-tm"
    "Aladdin-Template1o1"
    "Aladdin-template"
    "Doraemon"
    "Nft-collections"
    "Metaplex-Store"
    "must-be-polygon"
    "Ninja"
    "Cryto-Dragons"
    "Metaplex"
    "Candy-machine"
    "mint-polygon"
    "Mint"
    "Metaplex-candy"
    "Solana"
    "Jrzy"
    "Pancake"
    "Bitpanda"
    "Demo1o1"
    "Flag-Network"
    "Gung-Gang"
    "with-redux"
    "Demo"
    "React_Social_Login-Template"
    "Vivo-y20"
    "Pro-Component"
    "Test"
    "Pendings"
    "snap-cloud"
)



<!-- 
```
#include <cstdlib> // Include the standard library header for getenv
#include <iostream>
#include <string>
#include <vector>

// Function to get an environment variable value
std::string getEnvVar(const std::string& key) {
    char* val = std::getenv(key.c_str()); // Retrieve the environment
    variable

    if (val != nullptr) {
        return val; // Return the value as a string
    } else {
        return ""; // Return an empty string if the environment variable is
        not set
    }
}

// Function to delete a GitHub repository
bool deleteRepository(const std::string& repoName) {
    // Retrieve the GitHub access token from the environment variable
    std::string accessToken = getEnvVar("GITHUB_ACCESS_TOKEN");

    if (accessToken.empty()) {
        std::cerr << "GitHub access token not found in environment
        variables." << std::endl; return false;
    }

    // Rest of your deleteRepository logic...
    // (Replace GITHUB_ACCESS_TOKEN and other placeholders with accessToken)

    return true;
}

int main() {
    // Replace with your repository names
    std::vector<std::string> reposToDelete = {
        "snap-project",
        "aladdin-tm",
    };

    for (const auto& repo : reposToDelete) {
        if (deleteRepository(repo)) {
            std::cout << "Successfully deleted " << repo << std::endl;
        } else {
            std::cerr << "Failed to delete " << repo << std::endl;
        }
    }

    return 0;
}
``` -->