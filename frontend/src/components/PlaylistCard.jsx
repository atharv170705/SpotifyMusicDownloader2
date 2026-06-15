export default function PlaylistCard({
    image,
    title,
    subtitle,
    onClick,
}) {
    return (
        <div
            onClick={onClick}
            className="group w-45 cursor-pointer  p-3
    rounded-lg
    hover:bg-zinc-900
    transition"
        >
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src={image}
                    alt={title}
                    className="
                        w-full
                        aspect-square
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                />
            </div>

            <h3
                className="
                    mt-3
                    text-white
                    text-lg
                    font-medium
                    truncate
                "
            >
                {title}
            </h3>

            <p
                className="
                    text-zinc-400
                    text-base
                    truncate
                "
            >
                {subtitle}
            </p>
        </div>
    );
}