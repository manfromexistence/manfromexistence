// fn main() {
//     println!("Hello, world!");
// }

use std::io;

fn main() {
    let mut video_link = String::new();

    println!("Enter a YouTube video link:");
    io::stdin().read_line(&mut video_link).expect("Error reading input");

    // Simulate checking for download permission (replace with actual logic)
    println!("Checking download permission for: {}", video_link);
    let is_download_permitted = false; // Assume permission is denied

    if is_download_permitted {
        println!("Download is permitted, but functionality is not implemented for ethical reasons.");
        // Replace with actual download logic if implemented ethically (e.g., using YouTube Data API)
    } else {
        println!("Download is not permitted.");
    }
}
