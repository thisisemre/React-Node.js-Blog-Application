import { Router } from "express";
import db from "../config/database.js";
import { __dirname } from "../app.js";

const router = Router();

// Get all blogs for a specific user
router.get("/get", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const result = await db.query("SELECT id, title, content FROM blogs WHERE user_id = $1", [user_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

// Create a new blog post
router.post("/create", async (req, res) => {
  try {
    const { user_id, title, content } = req.body;
    const result = await db.query(
      "INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [user_id, title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

// Update a blog post
router.put("/update/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const result = await db.query(
      "UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Blog post not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Blog post deleted successfully" });
    } else {
      res.status(404).json({ message: "Blog post not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
