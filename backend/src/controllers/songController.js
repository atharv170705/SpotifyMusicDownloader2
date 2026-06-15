import YTMusic from 'ytmusic-api'
import ytdlp from 'yt-dlp-exec'
import path from "path"
import fs from 'fs'

const ytmusic = new YTMusic()
await ytmusic.initialize()

const getSong = async (req, res) => {
    try {
        const {songName, artistName, url} = req.body;
        let finalURL;
        if(url) {
            finalURL = url;
        }
        else {
            let finalQuery = `${songName} ${artistName} official`;
            const results = await ytmusic.search(finalQuery);
            const songs = results.filter(item => item.type === 'SONG');
            if(songs.length === 0) {
                return res.status(404).json({error : "Song not found"})
            }
            const first = songs[0];
            finalURL = `https://music.youtube.com/watch?v=${first.videoId}`;
        }

        const outputPath = `downloads/${Date.now()}.mp3`;
        await ytdlp(finalURL, {
            extractAudio: true,
            audioFormat: "mp3",
            output: outputPath
        });
        
        res.download(path.resolve(outputPath), (err) => {
            if (!err) {
                fs.unlink(outputPath, () => {});
            }
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

export {getSong};