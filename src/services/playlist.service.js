const playlistRepository = require("../repositories/playlist.repository");

const createPlaylist = async (playlistData) => {
  return await playlistRepository.createPlaylist(playlistData);
};

module.exports = {
  createPlaylist,
};