from pytube import Playlist

# Replace with your YouTube playlist URL
playlist_url = "https://www.youtube.com/playlist?list=PL5rwmnIfA-IgqBVhV4tgAh1nLPMdZx_M7"

# Initialize the playlist
playlist = Playlist(playlist_url)

# Set the download directory (optional)
download_dir = ""

# Iterate through each video in the playlist
for video in playlist.videos:
    try:
        # Download the highest quality stream (audio only)
        stream = video.streams.first()
        stream.download(output_path=download_dir)
        print(f"Downloaded: {video.title}")
    except Exception as e:
        print(f"Error downloading {video.title}: {str(e)}")

print("Download complete!")