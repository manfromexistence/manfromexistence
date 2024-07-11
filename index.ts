const fs = require('fs');
const ytdl = require('ytdl-core');

ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
    .pipe(fs.createWriteStream('video.mp4'));