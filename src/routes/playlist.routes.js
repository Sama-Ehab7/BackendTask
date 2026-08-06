const express = require("express");

const router = express.Router();

const {
  createPlaylist,
  getAllPlaylists,
  addSongToPlaylist,
  updatePlaylist,
  deletePlaylist,
  updateSong,
  deleteSong,
} = require("../controllers/playlist.controller");

const {
  createPlaylistValidation,
  addSongValidation,
  updatePlaylistValidation,
  updateSongValidation,
} = require("../validators/playlist.validator");

const validate = require("../middlewares/validation.middleware");

// Get all playlists
router.get("/", getAllPlaylists);

// Create playlist
router.post(
  "/",
  createPlaylistValidation,
  validate,
  createPlaylist
);

// Add song to playlist
router.post(
  "/:playlistId/songs",
  addSongValidation,
  validate,
  addSongToPlaylist
);

// Update playlist
router.put(
  "/:playlistId",
  updatePlaylistValidation,
  validate,
  updatePlaylist
);

// Delete playlist
router.delete(
  "/:playlistId",
  deletePlaylist
);

// Update song
router.put(
  "/:playlistId/songs/:songId",
  updateSongValidation,
  validate,
  updateSong
);

router.delete(
  "/:playlistId/songs/:songId",
  deleteSong
);

module.exports = router;