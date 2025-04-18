import express from "express";
import { Grade } from "../models/gradeModel.js";

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };
    // rename fields for backwards compatibility
    if (data.student_id) {
      data.learner_id = data.student_id;
      delete data.student_id;
    }
    const newDoc = await Grade.create(data);
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get route for backwards compatibility
router.get("/student/:id", (_req, res) => {
  res.redirect(`/grades/learner/${_req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const query = {
      $or: [{ student_id: id }, { learner_id: id }],
    };
    if (req.query.class) {
      query.class_id = Number(req.query.class);
    }
    const docs = await Grade.find(query).exec();
    if (!docs.length) {
      return res.status(404).send("Not found");
    }
    res.json(docs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({
      learner_id: Number(req.params.id),
    });
    if (result.deletedCount === 0) return res.status(404).send("Not found");
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  try {
    const query = { class_id: Number(req.params.id) };
    if (req.query.learner) query.learner_id = Number(req.query.learner);
    const docs = await Grade.find(query).exec();
    if (!docs.length) return res.status(404).send("Not found");
    res.json(docs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  try {
    const result = await Grade.updateMany(
      { class_id: Number(req.params.id) },
      { $set: { class_id: Number(req.body.class_id) } }
    );
    if (result.matchedCount === 0) return res.status(404).send("Not found");
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a class
router.delete("/class/:id", async (req, res) => {
  try {
    const result = await Grade.deleteMany({ class_id: Number(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).send("Not found");
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id).exec();
    if (!grade) return res.status(404).send("Not found");
    res.json(grade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  try {
    const updated = await Grade.findByIdAndUpdate(
      req.params.id,
      { $push: { scores: req.body } },
      { new: true }
    ).exec();
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  try {
    const updated = await Grade.findByIdAndUpdate(
      req.params.id,
      { $pull: { scores: req.body } },
      { new: true }
    ).exec();
    if (!updated) return res.status(404).send("Not found");
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Grade.findByIdAndDelete(req.params.id).exec();
    if (!deleted) return res.status(404).send("Not found");
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
