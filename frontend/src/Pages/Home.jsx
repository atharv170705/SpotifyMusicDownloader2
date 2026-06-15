import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImportCard from "../components/ImportCard";
import spotifyLogo from "../assets/spotify_logo.svg";
import ytMusicLogo from "../assets/ytmusic_logo.svg";
import PlaylistContext from "../Contexts/playlistContext";

export default function Home() {
  const { setPlaylists } = useContext(PlaylistContext);
  const navigate = useNavigate();
  
  const spotifyLogin = () => {
    window.location.href = "http://127.0.0.1:5008/auth/spotify";
  };
  const ytNavigate = () => {
    navigate("/youtubemusic");
  };
  return (
    <div
      className="
                min-h-screen
                bg-black
                flex
                justify-center
                items-center
                gap-20
            "
    >
      <ImportCard
        logo={spotifyLogo}
        alt="Spotify"
        subtitle="Import your playlists"
        buttonText="Connect"
        onButtonClick={spotifyLogin}
      />

      <ImportCard
        logo={ytMusicLogo}
        alt="YouTube Music"
        subtitle="Paste urls or search"
        buttonText="Continue"
        onButtonClick={ytNavigate}
      />
    </div>
  );
}
