const assert = require("node:assert/strict");
const test = require("node:test");

const Playlist = require("../src/models/playlist.model");

test("playlist model accepts a valid playlist with songs", async () => {
  const playlist = new Playlist({
    name: "Morning Focus",
    userId: "user-123",
    songs: [
      {
        title: "Time",
        artist: "Hans Zimmer",
      },
    ],
  });

  await assert.doesNotReject(() => playlist.validate());
});

test("playlist model requires name, userId, song title, and song artist", async () => {
  const playlist = new Playlist({
    songs: [{}],
  });

  const error = await playlist.validate().catch((validationError) => validationError);

  assert.ok(error.errors.name);
  assert.ok(error.errors.userId);
  assert.ok(error.errors["songs.0.title"]);
  assert.ok(error.errors["songs.0.artist"]);
});
