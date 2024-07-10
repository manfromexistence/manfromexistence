// fn main() {
//     println!("Hello, world!");
// }

use curl::easy::{Easy, List};

// Replace with your GitHub access token
const GITHUB_ACCESS_TOKEN: &str = "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";
const GITHUB_USERNAME: &str = "manfromexistence"; // Replace with your GitHub username

// Function to delete a GitHub repository
fn delete_repository(repo_name: &str) -> bool {
    let mut easy = Easy::new();
    easy.url(&format!("https://api.github.com/repos/{}/{}", GITHUB_USERNAME, repo_name))
        .unwrap();

    let mut list = List::new();
    list.append(&format!("Authorization: token {}", GITHUB_ACCESS_TOKEN))
        .unwrap();
    list.append("User-Agent: MyGitHubDeleter").unwrap();

    easy.http_headers(list).unwrap();
    easy.custom_request("DELETE").unwrap();

    match easy.perform() {
        Ok(_) => {
            println!("Deleted repository: {}", repo_name);
            true
        }
        Err(err) => {
            eprintln!("Error deleting repository {}: {}", repo_name, err);
            false
        }
    }
}

fn main() {
    // Replace with your repository names
    let repos_to_delete = vec![
        "snap-project",
        "llama3",
        "Solana-cli",
        "Aladdin-Template-1o1",
        "Moralis-boilerplate",
        "Aladdin-Template1o1",
        "Nft-collections",
        "must-be-polygon",
        "Ninja",
        "mint-polygon",
        "Mint",
        "Metaplex-candy",
        "Solana",
        "Pancake",
        "Demo1o1",
        "with-redux",
        "Demo",
        "React_Social_Login-Template",
    ];

    for repo in repos_to_delete {
        if delete_repository(repo) {
            println!("Successfully deleted {}", repo);
        } else {
            eprintln!("Failed to delete {}", repo);
        }
    }
}

