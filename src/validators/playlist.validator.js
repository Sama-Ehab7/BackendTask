const { body } = require("express-validator");

const createPlaylistValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Playlist name is required")
    .isLength({ min: 3 })
    .withMessage("Playlist name must be at least 3 characters"),

  body("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required"),
];

module.exports = {
  createPlaylistValidation,
};