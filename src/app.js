const express = require("express");

const app = express();

const playlistRoutes = require("./routes/playlist.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend Task API is running 🚀",
  });
});

app.use("/api/playlists", playlistRoutes);

module.exports = app;