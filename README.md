# Academy Backend Task - Playlists API

## Project Overview

This is a Node.js, Express, and MongoDB REST API for managing playlists and songs.

The project was created for a backend technical task. It supports creating playlists, adding songs to playlists, fetching playlists, and updating/deleting playlists and songs.

## Features

- Create a playlist.
- Get all playlists.
- Add a song to a playlist.
- Update a playlist.
- Delete a playlist.
- Update a song inside a playlist.
- Delete a song from a playlist.
- Validate request bodies using `express-validator`.
- Store data in MongoDB using Mongoose.
- Use a layered project structure: Route -> Controller -> Service -> Repository -> Model.
- Central error handling middleware.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator
- dotenv
- nodemon

## Project Structure

```text
.
+-- server.js
+-- package.json
+-- package-lock.json
+-- README.md
+-- .env.example
+-- .gitignore
+-- src
|   +-- app.js
|   +-- config
|   |   +-- database.js
|   +-- controllers
|   |   +-- playlist.controller.js
|   +-- middlewares
|   |   +-- error.middleware.js
|   |   +-- validation.middleware.js
|   +-- models
|   |   +-- playlist.model.js
|   +-- repositories
|   |   +-- playlist.repository.js
|   +-- routes
|   |   +-- playlist.routes.js
|   +-- services
|   |   +-- playlist.service.js
|   +-- utils
|   |   +-- ApiError.js
|   +-- validators
|       +-- playlist.validator.js
+-- test
    +-- playlist.model.test.js
    +-- playlist.service.test.js
```

## Architecture

The project uses a simple layered architecture:

```text
Route -> Controller -> Service -> Repository -> Model
```

- Route: defines API endpoints and attaches validation middleware.
- Controller: receives the request, calls the service, and returns the HTTP response.
- Service: contains business logic and handles not-found cases.
- Repository: contains database queries.
- Model: defines the MongoDB schema using Mongoose.

This keeps database code away from controllers and makes the code easier to read and maintain.

## Why MongoDB Was Chosen

MongoDB is a good fit for this project because a playlist naturally contains a list of songs. In the current schema, songs are embedded inside the playlist document.

Reasons for choosing MongoDB:

- The data is document-based: a playlist has basic fields and an array of songs.
- Songs belong directly to a playlist, so embedding them is simple and practical.
- Fetching playlists with their songs does not require joins.
- Mongoose provides schema definitions, validation, timestamps, and simple query methods.
- The schema can be extended later with fields like album, duration, genre, or cover image.

## Installation

Clone the repository:

```bash
git clone https://github.com/Sama-Ehab7/BackendTask.git
cd BackendTask
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root of the project.

Example:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/academy-playlists
```

Variables:

- `PORT`: the port where the server will run.
- `MONGODB_URI`: the MongoDB connection string.

The `.env` file should not be pushed to GitHub.

## Running the Project

Start MongoDB locally, or use a MongoDB Atlas connection string in `.env`.

Run the server:

```bash
npm start
```

Run in development mode:

```bash
npm run dev
```

Open this URL in the browser:

```text
http://localhost:3000
```

Expected response: a JSON message confirming that the backend API is running.

Example:

```json
{
  "message": "Backend Task API is running"
}
```

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### Get All Playlists

```http
GET /api/playlists
```

### Create Playlist

```http
POST /api/playlists
```

Body:

```json
{
  "name": "Workout Playlist",
  "userId": "user123"
}
```

### Add Song To Playlist

```http
POST /api/playlists/:playlistId/songs
```

Body:

```json
{
  "title": "APT",
  "artist": "ROSE & Bruno Mars"
}
```

### Update Playlist

```http
PUT /api/playlists/:playlistId
```

Body:

```json
{
  "name": "Updated Playlist"
}
```

### Delete Playlist

```http
DELETE /api/playlists/:playlistId
```

### Update Song

```http
PUT /api/playlists/:playlistId/songs/:songId
```

Body:

```json
{
  "title": "Updated Song",
  "artist": "Updated Artist"
}
```

### Delete Song

```http
DELETE /api/playlists/:playlistId/songs/:songId
```

## Validation

Validation is handled in `src/validators/playlist.validator.js` using `express-validator`.

Current validation rules:

- Playlist `name` is required.
- Playlist `name` must be at least 3 characters.
- `userId` is required when creating a playlist.
- Song `title` is required.
- Song `title` must be at least 2 characters.
- Song `artist` is required.
- Song `artist` must be at least 2 characters.

Validation error example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "msg": "Playlist name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

## Error Handling

The project uses a central error middleware in:

```text
src/middlewares/error.middleware.js
```

Expected not-found errors are created with:

```text
src/utils/ApiError.js
```

Example error response:

```json
{
  "success": false,
  "message": "Playlist not found"
}
```

## How To Download Postman

1. Go to the official Postman download page:

```text
https://www.postman.com/downloads/
```

2. Download Postman for your operating system.
3. Install and open Postman.
4. Create a new HTTP request.
5. Use the API endpoints listed above.

## How To Test The API With Postman

Make sure the backend is running first:

```bash
npm start
```

Then test requests in this order:

1. Send `GET http://localhost:3000/` to check that the server is running.
2. Send `POST http://localhost:3000/api/playlists` with a JSON body to create a playlist.
3. Copy the returned playlist `_id`.
4. Send `POST http://localhost:3000/api/playlists/{playlistId}/songs` to add a song.
5. Send `GET http://localhost:3000/api/playlists` to view playlists.
6. Use `PUT` requests to update playlists or songs.
7. Use `DELETE` requests to delete songs or playlists.

In Postman, set:

```text
Body -> raw -> JSON
```

Also add this header when sending JSON:

```text
Content-Type: application/json
```

## Automated Tests

The repository contains test files in the `test` folder.

The current `package.json` test script is still the default placeholder, so automated tests are not configured as the main testing workflow yet. For this submission, use Postman to test the API manually using the steps above.

## Notes For Reviewers

- The project currently does not include authentication.
- `GET /api/playlists` returns all playlists.
- Playlist and song IDs must be valid MongoDB ObjectIds when used in URL parameters.
- The project uses MongoDB through Mongoose.

## Author

Sama Ehab
