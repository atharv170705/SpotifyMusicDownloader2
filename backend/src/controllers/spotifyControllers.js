import axios from "axios";

const redirectUri = "http://127.0.0.1:5008/auth/callback";

let accessToken = '';
let refreshToken = '';

const spotifyLogin = async (req, res) => {
    const client_id = process.env.CLIENT_ID;
    const scopes = [
        "playlist-read-private",
        "playlist-read-collaborative"
    ];

    const authUrl =
        "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" + client_id +
        "&scope=" + encodeURIComponent(scopes.join(" ")) +
        "&redirect_uri=" + encodeURIComponent(redirectUri);

    res.redirect(authUrl);
}

const spotifyAuthCallback = async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).json({
                error: "No authorization code received",
            });
        }

        const response = await axios.post(
            "https://accounts.spotify.com/api/token",

            new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri,
            }),
            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",

                    Authorization:
                        "Basic " +
                        Buffer.from(
                            process.env.CLIENT_ID +
                            ":" +
                            process.env.CLIENT_SECRET
                        ).toString("base64"),
                },
            }
        );

        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;

        res.redirect("http://localhost:5173/playlists");

    } catch (error) {
        console.error(
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Failed to get access token",
        });
    }
}

const getPlaylists = async (req, res) => {
    if(!accessToken) {
        return res.status(401).json({
            error: "Not logged in"
        });
    }
    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/me/playlists",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.json(response.data.items);

    } catch (error) {
        console.error(
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Failed to fetch playlists",
        });
    }
}

const fetchPlaylist = async (req, res) => {
    try {
        const {playlistId} = req.params;
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ); 
        res.status(200).json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({
            message: "Failed to fetch playlist"
        });
    }

}

export {spotifyLogin, spotifyAuthCallback, getPlaylists, fetchPlaylist};