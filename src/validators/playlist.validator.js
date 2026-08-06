const { body } = require("express-validator");

const createPlaylistValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Playlist name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Playlist name must be at least 3 characters"),

  body("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required"),
];

const addSongValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Song title is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Song title must be at least 2 characters"),

  body("artist")
    .trim()
    .notEmpty()
    .withMessage("Artist name is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Artist name must be at least 2 characters"),
];

const updatePlaylistValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Playlist name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Playlist name must be at least 3 characters"),
];

const updateSongValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Song title is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Song title must be at least 2 characters"),

  body("artist")
    .trim()
    .notEmpty()
    .withMessage("Artist name is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Artist name must be at least 2 characters"),
];

module.exports = {
  createPlaylistValidation,
  addSongValidation,
  updatePlaylistValidation,
  updateSongValidation,
};