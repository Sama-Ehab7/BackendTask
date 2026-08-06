const playlistRepository = require("../repositories/playlist.repository");
const ApiError = require("../utils/ApiError");

const createPlaylist = async (playlistData) => {
  return await playlistRepository.createPlaylist(playlistData);
};

const getAllPlaylists = async () => {
  return await playlistRepository.getAllPlaylists();
};

const addSongToPlaylist = async (playlistId, songData) => {
  const playlist = await playlistRepository.addSongToPlaylist(
    playlistId,
    songData
  );

  if (!playlist) {
    throw new ApiError(
      404,
      "Playlist not found"
);
  }

  return playlist;
};

const updatePlaylist = async (playlistId, playlistData) => {
  const playlist = await playlistRepository.updatePlaylist(
    playlistId,
    playlistData
  );

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  return playlist;
};

const deletePlaylist = async (playlistId) => {
  const playlist = await playlistRepository.deletePlaylist(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  return playlist;
};

const updateSong = async (playlistId, songId, songData) => {
  const playlist = await playlistRepository.updateSong(
    playlistId,
    songId,
    songData
  );

  if (!playlist) {
    throw new ApiError(404, "Playlist or Song not found");
  }

  return playlist;
};

const deleteSong = async (playlistId, songId) => {
  const playlist = await playlistRepository.deleteSong(
    playlistId,
    songId
  );

  if (!playlist) {
    throw new ApiError(404, "Playlist or Song not found");
  }

  return playlist;
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  addSongToPlaylist,
  updatePlaylist,
  deletePlaylist,
  updateSong,
  deleteSong,
};