// fn main() {
//     println!("Hello, world!");
// }

// use std::io;

// fn main() {
//     let mut video_link = String::new();

//     println!("Enter a YouTube video link:");
//     io::stdin().read_line(&mut video_link).expect("Error reading input");

//     // Simulate checking for download permission (replace with actual logic)
//     println!("Checking download permission for: {}", video_link);
//     let is_download_permitted = false; // Assume permission is denied

//     if is_download_permitted {
//         println!("Download is permitted, but functionality is not implemented for ethical reasons.");
//         // Replace with actual download logic if implemented ethically (e.g., using YouTube Data API)
//     } else {
//         println!("Download is not permitted.");
//     }
// }

use rusty_ytdl::Video;

#[tokio::main]
async fn main() {
    let video_url = "https://www.youtube.com/watch?v=FZ8BxMU3BYc"; // You can replace this with your playlist URL
    let video = Video::new(video_url).unwrap();
    let stream = video.stream().await.unwrap();

    while let Some(chunk) = stream.chunk().await.unwrap() {
        // Do what you want with chunks (e.g., save to a file)
        println!("{:#?}", chunk);
    }
}