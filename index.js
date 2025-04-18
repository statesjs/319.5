// index.js
import express from "express";
import "express-async-errors";
import { connectDB } from "./db/conn.js";
import gradesRouter from "./routes/grades.js";
import aggRouter from "./routes/grades_agg.js";

const app = express();
app.use(express.json());

await connectDB();

app.get("/", (_req, res) => res.send("Grade API up and running"));
app.use("/grades", gradesRouter);
app.use("/grades/agg", aggRouter);

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
