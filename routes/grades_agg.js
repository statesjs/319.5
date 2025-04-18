import express from "express";
import { Grade } from "../models/gradeModel.js";

const router = express.Router();

router.get("/average/:classId", async (req, res) => {
  const pipeline = [
    { $match: { class_id: Number(req.params.classId) } },
    { $unwind: "$scores" },
    {
      $group: {
        _id: "$scores.type",
        avgScore: { $avg: "$scores.score" },
      },
    },
  ];
  const result = await Grade.aggregate(pipeline);
  res.json(result);
});

export default router;
