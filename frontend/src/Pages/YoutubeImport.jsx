import axios from "axios";
import { useState } from "react";

export default function YoutubeImport() {
    const [url, setUrl] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [failed, setFailed] = useState(false);
    const fetchSong = async () => {
        try {
            if(!url) {
                setFailed(true);
                return;
            }
            setFailed(false);
            setIsFetching(true);
            const response = await axios.post("http://127.0.0.1:5008/fetch-song", {url}, {responseType: "blob"});
            const blob = new Blob([response.data], { type: "audio/mpeg" });
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = 'song.mp3';
            a.click();

            window.URL.revokeObjectURL(downloadUrl);
        } 
        catch(err) {
            setFailed(true);
            console.error(err);
        }
        finally {
            setIsFetching(false);
        }
    }

    return (
        <div
            className="
                min-h-screen
                bg-black
                flex
                items-center
                justify-center
                px-6
            "
        >
            <div
                className="
                    w-full
                    max-w-2xl
                    bg-zinc-900/60
                    backdrop-blur-md
                    rounded-3xl
                    p-10
                    border
                    border-zinc-800
                    shadow-2xl
                "
            >
                {/* Heading */}

                <div className="text-center mb-12">
                    <h1
                        className="
                            text-5xl
                            font-semibold
                            text-white
                            mb-4
                        "
                    >
                        YouTube Music Import
                    </h1>

                    <p
                        className="
                            text-zinc-400
                            text-lg
                        "
                    >
                        Import a song using a URL
                    </p>
                </div>

                {/* URL Input */}

                <div className="mb-8">
                    <label
                        className="
                            block
                            text-white
                            text-lg
                            mb-3
                        "
                    >
                        Song URL
                    </label>

                    <div className="relative">
                        <span
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                            "
                        >
                            🔗
                        </span>

                        <input
                            type="text"
                            placeholder="Paste YouTube Music URL..."
                            className="
                                w-full
                                bg-zinc-800
                                text-white
                                rounded-xl
                                pl-12
                                pr-4
                                py-4
                                outline-none
                                border
                                border-zinc-700
                                focus:border-blue-500
                                transition
                            "
                            onChange={(ev) => setUrl(ev.target.value)}
                        />
                    </div>
                </div>

                {/* Divider */}

                {/* Button */}

                <button
                    className={`
                        mt-10
                        w-full
                        py-4
                        rounded-xl
                        ${failed ? "bg-red-500" : "bg-blue-500"}
                        text-white
                        text-lg
                        font-medium
                       ${failed ? "hover:bg-red-400" : "hover:bg-blue-400"}
                        transition
                    `}
                    onClick={fetchSong}
                >
                    {isFetching ? "Fetching..." : failed ? "FAILED" : "Continue"}
                </button>
            </div>
        </div>
    );
}