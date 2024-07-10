# from pytube import YouTube

# def download_youtube_video():
#     # Ask the user for the link
#     link = input("Please enter the YouTube short link: ")

#     # Create a YouTube object
#     yt = YouTube(link)

#     # Download the highest resolution version of the video
#     yt.streams.get_highest_resolution().download()

#     print("Download completed!")

# # Call the function
# download_youtube_video()
# from pytube import YouTube
# YouTube('https://youtu.be/2lAe1cqCOXo').streams.first().download()
# yt = YouTube('http://youtube.com/watch?v=2lAe1cqCOXo')
# yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()

# from pytube import YouTube

# # Define the YouTube video URLhttps
# video_url = "https://www.youtube.com/shorts/QRAm1kkzvMg"

# # Create a YouTube object
# yt = YouTube(video_url, use_oauth=True, allow_oauth_cache=True)

# # Get the highest resolution video stream
# video_stream = yt.streams.get_highest_resolution()

# # Define the destination path to save the video
# destination_path = "./videos"

# # Download the video
# video_stream.download(output_path=destination_path)

# # Print a success message
# print(f"Video downloaded successfully and saved to {destination_path}.")

# python3 /usr/local/bin/youtube-dl -f bestvideo+bestaudio --all-subs --cookies $PWD/youtube.com_cookies.txt "https://www.youtube.com/shorts/QRAm1kkzvMg" --verbose
# from pytube import YouTube
# from pytube.innertube import _default_clients

# # Change the client from 'ANDROID_MUSIC' to 'ANDROID'
# _default_clients["ANDROID_MUSIC"] = _default_clients["ANDROID"]

# # Now you can use YouTube as usual
# yt = YouTube("https://www.youtube.com/shorts/QRAm1kkzvMg")
# video_stream = yt.streams.get_highest_resolution()
# destination_path = './video/youtube'
# video_stream.download(output_path=destination_path)

# import os

# def download_video(url):
#     command = f"youtube-dl {url} --verbose"
#     os.system(command)

# # Replace with your YouTube video URL
# url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
# download_video(url)

# pytube==15.0.0
from pytube import YouTube
from pytube.innertube import _default_clients

_default_clients["ANDROID_MUSIC"] = _default_clients["ANDROID"]
extractYB = YouTube("https://www.youtube.com/shorts/QRAm1kkzvMg")


video_stream = extractYB.streams.get_highest_resolution()
destination_path = './video/youtube'
video_stream.download(output_path=destination_path)
video_size_bytes = video_stream.filesize
video_duration_seconds = extractYB.lengt