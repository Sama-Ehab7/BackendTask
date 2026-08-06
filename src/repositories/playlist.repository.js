const Playlist = require("../models/playlist.model");

const createPlaylist = async (playlistData) => {
  return await Playlist.create(playlistData);
};

const getAllPlaylists = async () => {
  return await Playlist.find().select("-__v -songs.__v");
};

const addSongToPlaylist = async (playlistId, songData) => {
  return await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $push: {
        songs: songData,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

const updatePlaylist = async (playlistId, playlistData) => {
  return await Playlist.findByIdAndUpdate(
    playlistId,
    playlistData,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deletePlaylist = async (playlistId) => {
  return await Playlist.findByIdAndDelete(playlistId);
};

const updateSong = async (playlistId, songId, songData) => {
  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    return null;
  }

  const song = playlist.songs.id(songId);

  if (!song) {
    return null;
  }

  song.title = songData.title;
  song.artist = songData.artist;

  await playlist.save();

  return playlist;
};

const deleteSong = async (playlistId, songId) => {
  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    return null;
  }

  const song = playlist.songs.id(songId);

  if (!song) {
    return null;
  }

  song.deleteOne();

  await playlist.save();

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