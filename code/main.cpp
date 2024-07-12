// #include <iostream>
// #include <string>

// using namespace std;

// // Simulates checking for download permission from YouTube API
// bool isDownloadPermitted(const string& video_link) {
//   // Replace with actual API call or logic to determine permission
//   cout << "Checking download permission for: " << video_link << endl;
//   // ... (implementation to check permission)
//   return false; // Assume permission is denied for this example
// }

// int main() {
//   string video_link;
//   cout << "Enter a YouTube video link: ";
//   getline(cin, video_link);

//   if (isDownloadPermitted(video_link)) {
//     cout << "Download is permitted, but functionality is not implemented for ethical reasons." << endl;
//     // Replace with actual download logic if implemented ethically (e.g., using YouTube Data API)
//   } else {
//     cout << "Download is not permitted." << endl;
//   }

//   return 0;
// }

#include <iostream>
#include <cstdlib>

using namespace std;

int main(){

    string tool = "youtube-dl";

    string flags = "-cio";

    string name = "%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s";

    string quality = "best[ext=mp4]/best[height<=? 720]/best";

    string url = "https://www.youtube.com/playlist?list=";

    string list_name;

    cout <<"Enter the list ID = ";
    cin >> list_name;

    string query = tool + " " + flags + " \'" + name;

    query += "\' -f \'" + quality + "\' " + url + list_name;
    
    //cout << "\n" + query + "\n" <<endl;
    const char* q = query.c_str();

    system(q);

    return 0;
}