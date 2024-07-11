from pytube import Playlist

# Replace with your YouTube playlist URL
playlist_url = "https://www.youtube.com/watch?v=188PrFLan_A&list=PL5rwmnIfA-Ijoufw-LD2eYBgzNRURq75a"

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

# import pytube

# # Get the YouTube video URL
# url = "https://www.youtube.com/watch?v=188PrFLan_A&list=PL5rwmnIfA-Ijoufw-LD2eYBgzNRURq75a"  # Replace with the desired video URL

# # Create a YouTube object
# yt = pytube.YouTube(url)

# # Get available streams (resolution, format, etc.)
# print(yt.streams.filter(progressive=True).order_by('resolution').desc())

# # Choose a stream (e.g., the first progressive stream)
# stream = yt.streams.first()

# # Download the video
# stream.download()  # Downloads to the current directory

# print("Download complete!")


# import re
# from pytube import Playlist

# # Set the download directory
# DOWNLOAD_DIR = 'D:\\Users\\YourUsername\\Downloads'

# # Create a Playlist object with the playlist URL
# playlist = Playlist('https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID')

# # Fix the empty playlist.videos list
# playlist._video_regex = re.compile(r"\"url\":\"(/watch\?v=[\w-]*)\"")

# # Print the number of videos in the playlist
# print(f"Number of videos in the playlist: {len(playlist.video_urls)}")

# # Download the audio track for each video in the playlist
# for url in playlist.video_urls:
#     video = playlist.videos.get(url=url)
#     audio_stream = video.streams.get_by_itag('140')  # Modify the value for different streams
#     audio_stream.download(output_path=DOWNLOAD_DIR)
