import React from "react";
import { useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import { useContext } from "react";
import PlaylistContext from "../Contexts/playlistContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SpotifyPlaylistPage() {
  const { playlists, setPlaylists } = useContext(PlaylistContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Only fetch if the array is empty (like after a reload)
    if (playlists.length === 0) {
      const fetchPlaylists = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:5008/playlists");
          setPlaylists(response.data);
        } catch (error) {
          console.error("Failed to re-fetch playlists:", error.message);
        }
      };

      fetchPlaylists();
    }
  }, [playlists, setPlaylists]);

  return (
    <>
      <div className="flex flex-wrap gap-4 p-6">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            image={playlist.images[0]?.url}
            title={playlist.name}
            subtitle={`Playlist • ${playlist.owner.display_name}`}
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          />
        ))}
      </div>
    </>
  );
}

export default SpotifyPlaylistPage;
