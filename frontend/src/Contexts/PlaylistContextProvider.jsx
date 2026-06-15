import React, { useState } from "react";
import PlaylistContext from "./playlistContext";

const PlaylistContextProvider = ({children}) => {
    const [playlists, setPlaylists] = useState([]);
    return (
        <PlaylistContext.Provider value={{playlists, setPlaylists}}>
            {children}
        </PlaylistContext.Provider>
    )
};

export default PlaylistContextProvider