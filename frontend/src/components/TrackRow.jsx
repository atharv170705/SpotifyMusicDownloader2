function TrackRow({
    index,
    image,
    title,
    artists,
    album,
    onFetch,
    downloading
}) {
    return (
        <div
            className= {`
                grid
                grid-cols-[50px_4fr_3fr_120px]
                items-center
                gap-4
                px-4
                py-2
                rounded-md
                hover:bg-zinc-800
                transition
                ${downloading ? "opacity-50" : "hover:bg-zinc-800"}
            `}
        >
            {/* Track Number */}
            <div className="text-zinc-400 text-center">
                {index}
            </div>

            {/* Song Info */}
            <div className="flex items-center gap-3">
                <img
                    src={image}
                    alt={title}
                    className="w-12 h-12 rounded"
                />

                <div>
                    <p className="text-white font-medium">
                        {title}
                    </p>

                    <p className="text-zinc-400 text-sm">
                        {artists}
                    </p>
                </div>
            </div>

            {/* Album */}
            <div className="text-zinc-400 truncate">
                {album}
            </div>

            {/* Fetch Button */}
            <button
                onClick={onFetch}
                disabled={downloading}
                className="
                    bg-green-500
                    hover:bg-green-400
                    text-black
                    font-semibold
                    px-3
                    py-1
                    rounded-full
                    transition
                "
            >
                {downloading ? "Downloading..." : "Fetch Song"}
            </button>
        </div>
    );
}

export default TrackRow;