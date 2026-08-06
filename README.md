# 🎵 Academy Backend Task - Playlists API

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success)
![Mongoose](https://img.shields.io/badge/ODM-Mongoose-red)
![License](https://img.shields.io/badge/License-MIT-blue)

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing playlists and songs.

This project was developed as a backend technical assessment. It demonstrates REST API development, layered architecture, clean code practices, MongoDB data modeling, request validation, and centralized error handling.

---

# 📑 Table of Contents

- Project Overview
- Features
- Tech Stack
- Project Structure
- Architecture
- Database Design
- Why MongoDB?
- Installation
- Environment Variables
- Running the Project
- API Documentation
- Validation
- Error Handling
- Testing
- Git Commit Strategy
- Future Improvements
- AI Usage
- Notes for Reviewers

---

# 📖 Project Overview

The goal of this project is to build a REST API that allows users to manage playlists and songs.

A user can:

- Create playlists
- Add songs to playlists
- Retrieve playlists
- Update playlists
- Delete playlists
- Update songs
- Delete songs

The application follows a **Layered Architecture** to separate responsibilities between different parts of the application, making the project easier to maintain, test, and extend.

---

# ✨ Features

### Required Features

- Create Playlist
- Add Songs to Playlist
- Get All Playlists

### Bonus Features

- Update Playlist
- Delete Playlist
- Update Song
- Delete Song

### Additional Features

- Request validation using Express Validator
- Centralized error handling
- Layered Architecture
- Repository Pattern
- MongoDB integration using Mongoose
- Environment variables support
- Modular folder structure
- Clean and readable code

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | NoSQL Database |
| Mongoose | MongoDB ODM |
| Express Validator | Request validation |
| dotenv | Environment variables |
| Nodemon | Development server |

---

# 📁 Project Structure

```text
.
├── server.js
├── package.json
├── README.md
├── .env.example
├── .gitignore
│
├── src
│   ├── app.js
│   │
│   ├── config
│   │     └── database.js
│   │
│   ├── controllers
│   │     └── playlist.controller.js
│   │
│   ├── services
│   │     └── playlist.service.js
│   │
│   ├── repositories
│   │     └── playlist.repository.js
│   │
│   ├── models
│   │     └── playlist.model.js
│   │
│   ├── routes
│   │     └── playlist.routes.js
│   │
│   ├── validators
│   │     └── playlist.validator.js
│   │
│   ├── middlewares
│   │     ├── validation.middleware.js
│   │     └── error.middleware.js
│   │
│   └── utils
│         └── ApiError.js
│
└── test
      ├── playlist.model.test.js
      └── playlist.service.test.js
```

---

# 🏗 Architecture

The project follows a **Layered Architecture** combined with the **Repository Pattern**.

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
MongoDB
```

### Route Layer

Defines the application's endpoints and connects middleware with controllers.

### Controller Layer

Handles incoming HTTP requests and returns HTTP responses.

Controllers do **not** contain business logic.

### Service Layer

Contains all business logic.

This layer validates business rules and coordinates application behavior.

### Repository Layer

Responsible for communicating directly with MongoDB.

All database queries are isolated inside repositories.

### Model Layer

Defines MongoDB schemas using Mongoose.

---

# 💾 Database Design

The application uses **embedded documents**.

Each playlist stores its own songs.

```text
Playlist
│
├── _id
├── name
├── userId
├── songs
│      ├── _id
│      ├── title
│      ├── artist
├── createdAt
└── updatedAt
```

Example document:

```json
{
  "_id": "...",
  "name": "Workout Playlist",
  "userId": "user123",
  "songs": [
    {
      "_id": "...",
      "title": "APT",
      "artist": "ROSE & Bruno Mars"
    },
    {
      "_id": "...",
      "title": "Believer",
      "artist": "Imagine Dragons"
    }
  ]
}
```

---

# 🍃 Why MongoDB?

MongoDB was selected because playlists naturally contain collections of songs.

Embedding songs inside playlist documents provides several advantages:

- Simple document structure
- Fast retrieval of playlists and songs
- No JOIN operations required
- Flexible schema for future enhancements
- Easy scalability
- Native support through Mongoose

For this assignment, embedding songs is more suitable than using separate collections because songs always belong to a single playlist.

---

# ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sama-Ehab7/BackendTask.git
```

Navigate to the project folder:

```bash
cd BackendTask
```

---

### 2. Install Dependencies

```bash
npm install
```

---

# 🌍 Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/academy-playlists
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Application port |
| MONGODB_URI | MongoDB connection string |

> **Note:** Never commit your `.env` file to GitHub.

---

# ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

If the application starts successfully, open:

```text
http://localhost:3000/
```

Expected response:

```json
{
    "message": "Backend Task API is running"
}
```

---

# 📡 API Documentation

## Base URL

```text
http://localhost:3000/api
```

---

# 📋 API Endpoints

| Method | Endpoint | Description |
|----------|------------------------------|------------------------------|
| GET | /playlists | Get all playlists |
| POST | /playlists | Create playlist |
| POST | /playlists/:playlistId/songs | Add song to playlist |
| PUT | /playlists/:playlistId | Update playlist |
| DELETE | /playlists/:playlistId | Delete playlist |
| PUT | /playlists/:playlistId/songs/:songId | Update song |
| DELETE | /playlists/:playlistId/songs/:songId | Delete song |

---

# 📌 Create Playlist

### Endpoint

```http
POST /api/playlists
```

### Request Body

```json
{
    "name": "Workout Playlist",
    "userId": "user123"
}
```

### Success Response

**Status Code**

```text
201 Created
```

```json
{
    "success": true,
    "message": "Playlist created successfully",
    "data": {
        "_id": "...",
        "name": "Workout Playlist",
        "userId": "user123",
        "songs": [],
        "createdAt": "...",
        "updatedAt": "..."
    }
}
```

---

# 📌 Get All Playlists

### Endpoint

```http
GET /api/playlists
```

### Success Response

**Status Code**

```text
200 OK
```

```json
[
    {
        "_id": "...",
        "name": "Workout Playlist",
        "userId": "user123",
        "songs": [
            {
                "_id": "...",
                "title": "APT",
                "artist": "ROSE & Bruno Mars"
            }
        ]
    }
]
```

---

# 📌 Add Song

### Endpoint

```http
POST /api/playlists/:playlistId/songs
```

### Request Body

```json
{
    "title": "APT",
    "artist": "ROSE & Bruno Mars"
}
```

### Success Response

**Status Code**

```text
200 OK
```

```json
{
    "success": true,
    "message": "Song added successfully"
}
```

---

# 📌 Update Playlist

### Endpoint

```http
PUT /api/playlists/:playlistId
```

### Request Body

```json
{
    "name": "Updated Playlist"
}
```

### Success Response

```json
{
    "success": true,
    "message": "Playlist updated successfully"
}
```

---

# 📌 Delete Playlist

### Endpoint

```http
DELETE /api/playlists/:playlistId
```

### Success Response

```json
{
    "success": true,
    "message": "Playlist deleted successfully"
}
```

---

# 📌 Update Song

### Endpoint

```http
PUT /api/playlists/:playlistId/songs/:songId
```

### Request Body

```json
{
    "title": "Updated Song",
    "artist": "Updated Artist"
}
```

### Success Response

```json
{
    "success": true,
    "message": "Song updated successfully"
}
```

---

# 📌 Delete Song

### Endpoint

```http
DELETE /api/playlists/:playlistId/songs/:songId
```

### Success Response

```json
{
    "success": true,
    "message": "Song deleted successfully"
}
```

---

# 📊 HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Request completed successfully |
| 201 | Resource created successfully |
| 400 | Validation error |
| 404 | Resource not found |
| 500 | Internal server error |

---

# ✅ Validation

Request validation is implemented using **express-validator**.

### Playlist Validation

- Playlist name is required.
- Playlist name must contain at least 3 characters.
- User ID is required.

### Song Validation

- Song title is required.
- Song title must contain at least 2 characters.
- Artist name is required.
- Artist name must contain at least 2 characters.

Example validation error:

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [
        {
            "msg": "Playlist name is required",
            "path": "name"
        }
    ]
}
```

---

# 🚨 Error Handling

A centralized error handling middleware is used throughout the application.

Errors are created using a custom `ApiError` class.

Example:

```json
{
    "success": false,
    "message": "Playlist not found"
}
```

Common handled errors:

- Validation errors
- Playlist not found
- Song not found
- Invalid MongoDB ObjectId
- Internal server errors

---

# 🧪 Testing

The project can be tested manually using **Postman**.

### Prerequisites

- Node.js installed
- MongoDB running locally or MongoDB Atlas
- Postman installed

Start the server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

---

# 📮 Testing with Postman

## Step 1 - Check the Server

```http
GET /
```

Expected Response:

```json
{
    "message": "Backend Task API is running"
}
```

---

## Step 2 - Create a Playlist

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

Copy the generated playlist `_id`.

---

## Step 3 - Add a Song

```http
POST /api/playlists/{playlistId}/songs
```

```json
{
    "title": "APT",
    "artist": "ROSE & Bruno Mars"
}
```

---

## Step 4 - Get All Playlists

```http
GET /api/playlists
```

Verify that the playlist contains the newly added song.

---

## Step 5 - Update Playlist

```http
PUT /api/playlists/{playlistId}
```

```json
{
    "name": "My Favorite Songs"
}
```

---

## Step 6 - Update Song

```http
PUT /api/playlists/{playlistId}/songs/{songId}
```

```json
{
    "title": "Believer",
    "artist": "Imagine Dragons"
}
```

---

## Step 7 - Delete Song

```http
DELETE /api/playlists/{playlistId}/songs/{songId}
```

---

## Step 8 - Delete Playlist

```http
DELETE /api/playlists/{playlistId}
```

---

# 📦 Available Scripts

| Command | Description |
|----------|-------------|
| npm install | Install dependencies |
| npm run dev | Run in development mode |
| npm start | Run the production server |
| npm test | Run automated tests (if configured) |

---

# 🧱 Design Principles

This project follows several software engineering best practices.

### SOLID Principles

- Single Responsibility Principle (SRP)
- Separation of Concerns
- Dependency Separation through Layers

### Clean Code

- Meaningful naming
- Small reusable functions
- Modular architecture
- Consistent coding style

### Repository Pattern

Database operations are isolated inside repositories instead of controllers.

Benefits:

- Easier testing
- Better maintainability
- Cleaner business logic
- Easier database replacement

---

# 🔐 Assumptions

This project intentionally does **not** implement authentication or authorization because they were not required in the assignment.

For simplicity:

- `userId` is provided in the request body.
- Every playlist belongs to one user.
- Songs exist only inside their parent playlist.

---

# 🚀 Future Improvements

Possible enhancements include:

- JWT Authentication
- User Registration & Login
- Pagination
- Filtering playlists
- Search functionality
- Upload playlist cover images
- Swagger / OpenAPI documentation
- Docker support
- CI/CD pipeline
- Logging with Winston or Pino
- Rate limiting
- Request caching
- Soft delete
- Role-based authorization

---

# 📝 Git Commit Strategy

The project was developed incrementally using meaningful commits.

Example commit history:

```text
Initial project setup

Configure Express application

Connect MongoDB using Mongoose

Create Playlist model

Implement Repository layer

Implement Service layer

Implement Controller layer

Create API routes

Add request validation

Implement global error handler

Implement playlist CRUD operations

Implement song CRUD operations

Update README documentation
```

---

# 🤖 AI Usage

This project was developed with the assistance of AI tools for learning, brainstorming, code review, and improving documentation.

AI assistance was used to:

- Review architecture decisions
- Improve code readability
- Refine documentation
- Explain concepts
- Suggest best practices

All generated code was manually reviewed, understood, tested, and integrated before being included in the project.

As requested in the assignment, the related AI conversation history can be provided together with the submission.

---

# 📄 License

This project is intended for educational and technical assessment purposes only.

---

# 👩‍💻 Author

**Sama Ehab**

Computer Science Student

Backend Developer

GitHub:

https://github.com/Sama-Ehab7

---

# 📬 Notes for Reviewers

Thank you for reviewing this submission.

This project was built with a strong focus on:

- Clean Architecture
- Readable and maintainable code
- Separation of concerns
- RESTful API design
- MongoDB best practices
- Proper validation
- Error handling
- Scalability

While the assignment requirements were relatively small, the project structure was intentionally designed to resemble a real-world backend application to demonstrate software engineering principles rather than only fulfilling the minimum functional requirements.