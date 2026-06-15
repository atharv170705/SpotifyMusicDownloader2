import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrackRow from "../components/TrackRow";
import axios from "axios";

function PlaylistTracksPage() {
    const { playlistId } = useParams();

    const [playlist, setPlaylist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [downloadingTracks, setDownloadingTracks] = useState(new Set());

    useEffect(() => {
        fetchPlaylist();
    }, []);

    async function fetchPlaylist() {
        try {
            const res = await axios.get(`http://127.0.0.1:5008/playlists/${playlistId}`, {withCredentials: true});
            console.log(res.data);
            
            setPlaylist({
                id: res.data.id,
                name: res.data.name,
                image: res.data.images?.[0]?.url
            });

            const formattedTracks = res.data.tracks.items.map(item => ({
                id: item.track.id,
                name: item.track.name,
                artists: item.track.artists
                    .map(artist => artist.name)
                    .join(", "),
                album: item.track.album.name,
                image: item.track.album.images?.[0]?.url
            }));
            
            setTracks(formattedTracks);
        }
        catch(err) {
            console.error(err);
        }
    }

    async function fetchSong(track) {
        try {
            setDownloadingTracks(prev => {
                const next = new Set(prev);
                next.add(track.id);
                return next;
            });
            const response = await axios.post(
                "http://127.0.0.1:5008/fetch-song",
                {
                    songName: track.name,
                    artistName: track.artists
                },
                {
                    responseType: "blob"
                }
            );
            const blob = new Blob([response.data], { type: "audio/mpeg" });
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            const safeName = track.name.replace(/[<>:"/\\|?*]/g, "_");
            a.download = `${safeName}.mp3`;
            a.click();

            window.URL.revokeObjectURL(downloadUrl);
        }
        catch(err) {
            console.error(err);
        }
        finally {
            setDownloadingTracks(prev => {
                const next = new Set(prev);
                next.delete(track.id);
                return next;
            });
        }
    }
    return (
        <div className="bg-black min-h-screen text-white">
            {/* Playlist Header */}

            {playlist && (
                <div className="flex items-end gap-6 p-8">
                    <img
                        src={playlist.image}
                        alt=""
                        className="w-52 h-52 rounded"
                    />

                    <div>
                        <p className="uppercase text-sm">
                            Playlist
                        </p>

                        <h1 className="text-6xl font-bold">
                            {playlist.name}
                        </h1>

                        <p className="text-zinc-400 mt-2">
                            {tracks.length} songs
                        </p>
                    </div>
                </div>
            )}

            {/* Track Headers */}

            <div
                className="
                    grid
                    grid-cols-[50px_4fr_3fr_120px]
                    gap-4
                    px-4
                    py-3
                    border-b
                    border-zinc-800
                    text-zinc-400
                "
            >
                <div>#</div>
                <div>Title</div>
                <div>Album</div>
                <div>Action</div>
            </div>

            {/* Tracks */}

            {tracks.map((track, idx) => (
                <TrackRow
                    key={track.id}
                    index={idx + 1}
                    image={track.image}
                    title={track.name}
                    artists={track.artists}
                    album={track.album}
                    onFetch={() => fetchSong(track)}
                    downloading={downloadingTracks.has(track.id)}
                />
            ))}
        </div>
    );
}

export default PlaylistTracksPage;