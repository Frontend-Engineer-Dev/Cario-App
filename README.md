# Car Finder App

This repository contains a split frontend/backend app for a car finder chat experience.

## Overview

- `app/` is a React + TypeScript + Vite frontend.
- `server/` is a Node + Express backend API.
- The UI lets a user chat with an AI assistant about car needs.
- The backend returns either conversational replies or a structured `shortlist` of recommended cars.

## Architecture

### Frontend (`app/`)

- `src/main.tsx` mounts the app.
- `src/pages/chatInterface.tsx` contains the main chat screen and recommendation sidebar.
- `src/components/message.tsx` renders chat bubbles for user and assistant messages.
- `src/components/recommendation.tsx` renders car shortlist recommendations.
- `src/api/chat.ts` sends messages to the backend POST `/api/chat`.

### Backend (`server/`)

- `server.js` starts Express, enables CORS, parses JSON, and mounts `/api/chat`.
- `src/routes/chat.js` defines the `/chat` POST route.
- `src/controllers/chatController.js` validates requests, builds the prompt, invokes `kimiChat`, and returns a response.
- `src/utils/messages.js` loads the car dataset and constructs the system prompt used by the AI.
- `src/data/cars.json` contains the car dataset.

## Chat flow

1. User types a message in the frontend.
2. Frontend sends a POST request to `/api/chat` with the message and conversation history.
3. Backend builds a prompt using the dataset and history.
4. Backend calls `kimiChat` and receives a reply.
5. Backend returns either:
   - `type: "message"` with assistant text, or
   - `type: "shortlist"` with structured car recommendations.
6. Frontend displays the assistant reply and updates the recommendations panel when a shortlist is returned.

## How to run

### Server

```bash
cd server
npm install
npm run dev
```

The server uses `PORT` from environment variables or defaults to `3001`.

### Frontend

```bash
cd app
npm install
npm run dev
```

### Important note

The frontend currently posts to `http://localhost:3000/api/chat`, while the server defaults to port `3001`. To make the app work, either:

- start the server on port `3000`, or
- update the frontend API base URL to match the backend port.

## Recommended next steps

- Add environment variable support in the frontend for `VITE_API_BASE_URL`.
- Align the backend port and frontend API endpoint.
- Split the frontend further into reusable components like `ChatWindow`, `ChatInput`, and `RecommendationList`.
- Improve error handling and loading states in the UI.
- Add a root-level `README.md` (this file) and optionally a workspace script to start both services together.

## Notes

- This repo was created from a Vite React TypeScript template, so the app README was generic.
- The actual product is a car-finding chat assistant with a recommendation sidebar.
