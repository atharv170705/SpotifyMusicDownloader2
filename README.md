# 🎵 Spotify Playlist Explorer & Downloader

A full-stack application that lets users authenticate with their Spotify account, browse all their playlists, view playlist tracks, and download songs as MP3 files.

The application:

- Authenticates users using Spotify OAuth 2.0
- Fetches playlists directly from the user's Spotify account
- Displays playlist metadata and tracks
- Searches YouTube Music for matching songs
- Downloads songs as MP3 files using yt-dlp and FFmpeg
- Built with React, Express, and Spotify Web API

---

## Features

- 🔐 Spotify OAuth 2.0 Authentication
- 👤 Login using your Spotify account
- 📂 View all playlists from your Spotify profile
- 🎵 Browse tracks inside playlists
- 🔍 Automatic YouTube Music song matching
- ⬇️ Download songs as MP3 files
- ⚡ Fast React + Express architecture
- 🎯 Clean and responsive UI

---

# Manual Installation

## Node.js

Install Node.js (v18+ recommended):

https://nodejs.org

Verify installation:

```bash
node -v
npm -v
```

---

## FFmpeg

### macOS

Install Homebrew if not already installed:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install FFmpeg:

```bash
brew install ffmpeg
```

### Windows

Install FFmpeg using Winget:

```powershell
winget install Gyan.FFmpeg
```

Verify installation:

```powershell
ffmpeg -version
```

---

## yt-dlp

### macOS

```bash
brew install yt-dlp
```

### Windows

Install yt-dlp using Winget:

```powershell
winget install yt-dlp.yt-dlp
```

Verify installation:

```powershell
yt-dlp --version
```



---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/atharv170705/SpotifyMusicDownloader.git
cd SpotifyMusicDownloader
```

---

### Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a `.env` file and add:

```env
PORT=5008
CORS_ORIGIN=http://localhost:5173
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:5008/auth/callback
```

### Spotify API Credentials

To obtain your Spotify credentials:

1. Visit the Spotify Developer Dashboard:
   https://developer.spotify.com/dashboard

2. Log in with your Spotify account.

3. Create a new application.

4. Open the application settings and copy:
   - **Client ID**
   - **Client Secret**

5. Add them to your `.env` file.

6. Under **Redirect URIs**, add:

```text
http://localhost:5008/auth/callback
```

> Make sure the redirect URI configured in the Spotify Developer Dashboard exactly matches the value of `REDIRECT_URI` in your `.env` file.

> Also ensure that the frontend runs on the same port specified in `CORS_ORIGIN` and the backend runs on port `5008`.

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run dev
```

---

### Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

---

## Running the Application

After both servers are running, open:

```text
http://localhost:5173
```

Login with your Spotify account and start downloading songs.

---
## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Authentication

- Spotify OAuth 2.0
- Spotify Web API

### Media Processing

- YouTube Music API
- yt-dlp
- FFmpeg

---



## Project Structure

```bash
SpotifyMusicDownloader/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Disclaimer

This project is intended for educational and personal use. Users are responsible for complying with the Terms of Service of any third-party platforms they interact with.

---

## License

MIT
