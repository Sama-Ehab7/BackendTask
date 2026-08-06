const assert = require("node:assert/strict");
const test = require("node:test");

const repositoryPath = require.resolve("../src/repositories/playlist.repository");
const servicePath = require.resolve("../src/services/playlist.service");

const loadService = (fakeRepository) => {
  delete require.cache[servicePath];
  require.cache[repositoryPath] = {
    id: repositoryPath,
    filename: repositoryPath,
    loaded: true,
    exports: fakeRepository,
  };

  return require("../src/services/playlist.service");
};

test.afterEach(() => {
  delete require.cache[repositoryPath];
  delete require.cache[servicePath];
});

test("getAllPlaylists forwards filters to the repository", async () => {
  const filters = { userId: "user-123" };
  let receivedFilters;

  const service = loadService({
    getAllPlaylists: async (incomingFilters) => {
      receivedFilters = incomingFilters;
      return [];
    },
  });

  const playlists = await service.getAllPlaylists(filters);

  assert.deepEqual(playlists, []);
  assert.deepEqual(receivedFilters, filters);
});

test("addSongToPlaylist throws 404 when playlist does not exist", async () => {
  const service = loadService({
    addSongToPlaylist: async () => null,
  });

  await assert.rejects(
    () =>
      service.addSongToPlaylist("64b7f4e7f4e7f4e7f4e7f4e7", {
        title: "Song",
        artist: "Artist",
      }),
    {
      statusCode: 404,
      message: "Playlist not found",
    }
  );
});

test("updateSong throws 404 when playlist or song does not exist", async () => {
  const service = loadService({
    updateSong: async () => null,
  });

  await assert.rejects(
    () =>
      service.updateSong(
        "64b7f4e7f4e7f4e7f4e7f4e7",
        "64b7f4e7f4e7f4e7f4e7f4e8",
        {
          title: "Song",
          artist: "Artist",
        }
      ),
    {
      statusCode: 404,
      message: "Playlist or Song not found",
    }
  );
});
