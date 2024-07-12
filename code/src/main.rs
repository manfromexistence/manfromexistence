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
        "op",
        "seyanet",
        "seyaha-net-marketplace",
        "xstream-website",
        "xstream-dev-space",
        "Jrzy",
        "Cryto-Dragons",
        "Flag-Network",
        "Gung-Gang",
        "youtube-automation",
        "feild-manager-project",
        "people-per-hour-project",
        "Bitpanda",
        "field-manager",
        "Aladdin-template",
        "Metaplex",
        "Candy-machine",
        "Doraemon",
        "flutter",
        "Metaplex-Store",
    ];

    for repo in repos_to_delete {
        if delete_repository(repo) {
            println!("Successfully deleted {}", repo);
        } else {
            eprintln!("Failed to delete {}", repo);
        }
    }
}

