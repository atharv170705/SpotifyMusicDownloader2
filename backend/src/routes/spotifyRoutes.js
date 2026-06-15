import { Router } from "express";
import {
  spotifyLogin,
  spotifyAuthCallback,
  getPlaylists,
  fetchPlaylist,
} from "../controllers/spotifyControllers.js";
const router = Router();

router.route("/auth/spotify").get(spotifyLogin);
router.route("/auth/callback").get(spotifyAuthCallback);
router.route("/playlists").get(getPlaylists);
router.route("/playlists/:playlistId").get(fetchPlaylist);

export default router;
