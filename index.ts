const fs = require('fs');
const ytdl = require('ytdl-core');

ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
    .pipe(fs.createWriteStream('video.mp4'));

// const ytlist = require('youtube-playlist');
 
// const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';
 
// ytlist(url, 'url').then((res: any) => {
//   console.log(res);
//   /* Object
//   { data:
//    { playlist:
//       [ 'https://youtube.com/watch?v=bgU7FeiWKzc',
//         'https://youtube.com/watch?v=3PUVr8jFMGg',
//         'https://youtube.com/watch?v=3pXVHRT-amw',
//         'https://youtube.com/watch?v=KOVc5o5kURE' ] } }
//    */
// });

var PLD = require('youtube-playlist-download');


//usage node dl.js [playlist_id]
//e.g.  node dl.js PL8BFA7E713C650560
var output_dir    = "dl",
     playlist_id  = process.argv[2];
var pld       = new PLD("PL8BFA7E713C650560", output_dir);


pld.download(function(){
  console.log("All done, have a great day !");
});