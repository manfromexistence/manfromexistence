#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Your asynchronous code here
    let video_url = "https://www.youtube.com/watch?v=FZ8BxMU3BYc"; // Replace with your playlist URL
    let video = rusty_ytdl::Video::new(video_url).unwrap();
    let stream = video.stream().await.unwrap();

    while let Some(chunk) = stream.chunk().await.unwrap() {
        // Do what you want with chunks (e.g., save to a file)
        println!("{:#?}", chunk);
    }

    Ok(())
}