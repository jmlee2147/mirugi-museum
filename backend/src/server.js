import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { usersTable, tasksTable, artworksTable } from "./db/schema.js";
import { eq } from "drizzle-orm";
import job from "./config/cron.js";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());
if(ENV.NODE_ENV === "production") job.start();

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

// --- Users ---
app.post("/api/users", async (req, res) => {
  const { userId, email, name } = req.body;

  if (!userId || !email) {
    return res.status(400).json({ success: false, message: "userId와 email은 필수입니다" });
  }

  try {
    const result = await db.insert(usersTable)
      .values({ userId, email, name })
      .onConflictDoUpdate({
        target: usersTable.userId,
        set: { email, name }
      })
      .returning();

    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- Tasks ---
app.post("/api/tasks", async (req, res) => {
  const { userId, content, dueDate, status } = req.body;

  if (!userId || !content || !dueDate || !status) {
    return res.status(400).json({ success: false, message: "userId, content, dueDate, status는 필수입니다" });
  }

  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.userId, userId));
    if (!user.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid dueDate format" });
    }

    const inserted = await db.insert(tasksTable)
      .values({
        content,
        dueDate: dueDateObj,
        status,
        userId: user[0].id
      })
      .returning();

    res.status(201).json({ success: true, data: inserted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/tasks/:userId", async (req, res) => {
  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.userId, req.params.userId));
    if (!user.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const tasks = await db.select().from(tasksTable).where(eq(tasksTable.userId, user[0].id));
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- Artworks ---
app.post("/api/artworks", async (req, res) => {
  const { userId, taskId, imageUrl, title, description, isSuccess } = req.body;

  if (!userId || !imageUrl) {
    return res.status(400).json({ success: false, message: "userId, imageUrl은 필수입니다" });
  }

  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.userId, userId));
    if (!user.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (taskId) {
      const task = await db.select().from(tasksTable).where(eq(tasksTable.id, taskId));
      if (!task.length) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
    }

    const inserted = await db.insert(artworksTable)
      .values({
        imageUrl,
        title,
        description,
        isSuccess,
        userId: user[0].id,
        taskId
      })
      .returning();

    res.status(201).json({ success: true, data: inserted[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/api/artworks/:userId", async (req, res) => {
  try {
    const user = await db.select().from(usersTable).where(eq(usersTable.userId, req.params.userId));
    if (!user.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const artworks = await db.select().from(artworksTable).where(eq(artworksTable.userId, user[0].id));
    res.json({ success: true, data: artworks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});