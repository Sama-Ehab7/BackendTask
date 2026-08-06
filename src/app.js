const express = require("express");

const app = express();

const playlistRoutes = require("./routes/playlist.routes");
const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend Task API is running 🚀",
  });
});

app.use("/api/playlists", playlistRoutes);

app.use(errorHandler);

module.exports = app;