# ALAB 319.5

# Working with Mongoose (ALAB 319.5.1)

## Setup

1. `npm install`
2. Create a `.env` at project root:

- MONGO_URI=your-atlas-connection-string

3. `npm run dev` (or `npm start`)

## Project Structure

```
319.5/
├─ db/             # Mongoose connection
│  └─ conn.js
├─ models/         # Mongoose schemas
│  └─ gradeModel.js
├─ routes/         # Express route handlers
│  ├─ grades.js
│  └─ grades_agg.js
├─ index.js        # Entry point
├─ .env            # Environment variables (ignored)
├─ .gitignore
├─ package.json
└─ README.md
```

## API Endpoints

### Health Check

```
GET /            → "🎓 Grade API up and running"
```

### Create a Grade

```
POST /grades
Content-Type: application/json

Body: {
  "learner_id": 2,
  "class_id": 308,
  "scores": [
    { "type": "quiz", "score": 88 },
    { "type": "exam", "score": 92 }
  ]
}
```

### Get All Grades

```
GET /grades[?limit=5]
```

- Optional `limit` query

### Get Grade by ID

```
GET /grades/:id
```

### Get Grades by Learner

```
GET /grades/learner/:id[?class=308]
```

- Matches either `learner_id` or `student_id`.

### Get Grades by Class

```
GET /grades/class/:id[?learner=2]
```

### Add Score to Grade

```
PATCH /grades/:id/add
Content-Type: application/json

Body: { "type": "homework", "score": 75 }
```

### Remove Score from Grade

```
PATCH /grades/:id/remove
Content-Type: application/json

Body: { "type": "quiz", "score": 88 }
```

### Update Class IDs

```
PATCH /grades/class/:id
Content-Type: application/json

Body: { "class_id": 309 }
```

### Delete a Grade

```
DELETE /grades/:id
```

### Delete Learner’s Grades

```
DELETE /grades/learner/:id
```

### Delete Class’s Grades

```
DELETE /grades/class/:id
```
