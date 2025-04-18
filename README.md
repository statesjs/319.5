# ALAB 319.5

# Working with Mongoose (ALAB 319.5.1)

## Setup

1. `npm install`
2. Create a `.env` at project root:

- MONGO_URI=your-atlas-connection-string

3. `npm run dev` (or `npm start`)

## Endpoints

- `GET  /`
- `POST /grades`
- `GET  /grades`
- `GET  /grades/:id`
- `PATCH /grades/:id/add`
- `DELETE /grades/:id`
- `GET  /grades/agg/average/:classId`
