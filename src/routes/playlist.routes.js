const express = require("express");

const router = express.Router();

const { createPlaylist } = require("../controllers/playlist.controller");

const {
  createPlaylistValidation,
} = require("../validators/playlist.validator");

const validate = require("../middlewares/validation.middleware");

router.post(
  "/",
  createPlaylistValidation,
  validate,
  createPlaylist
);

module.exports = router;