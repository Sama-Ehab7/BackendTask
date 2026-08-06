const playlistService = require("../services/playlist.service");

const createPlaylist = async (req, res, next) => {
  try {
    const playlist = await playlistService.createPlaylist(req.body);

    res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPlaylists = async (req, res, next) => {
  try {
    const playlists = await playlistService.getAllPlaylists();

    res.status(200).json({
      success: true,
      message: "Playlists retrieved successfully",
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

const addSongToPlaylist = async (req, res, next) => {
  try {
    const { playlistId } = req.params;

    const updatedPlaylist = await playlistService.addSongToPlaylist(
      playlistId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Song added successfully",
      data: updatedPlaylist,
    });
  } catch (error) {
    next(error);
  }
};

const updatePlaylist = async (req, res, next) => {
  try {
    const updatedPlaylist = await playlistService.updatePlaylist(
      req.params.playlistId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Playlist updated successfully",
      data: updatedPlaylist,
    });
  } catch (error) {
    next(error);
  }
};

const deletePlaylist = async (req, res, next) => {
  try {
    await playlistService.deletePlaylist(req.params.playlistId);

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateSong = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.params;

    const updatedPlaylist = await playlistService.updateSong(
      playlistId,
      songId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Song updated successfully",
      data: updatedPlaylist,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.params;

    const updatedPlaylist = await playlistService.deleteSong(
      playlistId,
      songId
    );

    res.status(200).json({
      success: true,
      message: "Song deleted successfully",
      data: updatedPlaylist,
    });
  } catch (error) {
    next(error);
  }
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