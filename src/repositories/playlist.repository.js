const Playlist = require("../models/playlist.model");

const createPlaylist = async (playlistData) => {
  return await Playlist.create(playlistData);
};

module.exports = {
  createPlaylist,
};