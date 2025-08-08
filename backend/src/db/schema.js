import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasksTable = pgTable("tasks", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),        // 할 일 내용
  dueDate: timestamp("due_date").notNull(),  // 마감 기한
  status: text("status").notNull(),          // 상태: "pending", "completed" 등
  createdAt: timestamp("created_at").defaultNow().notNull(),

  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
});

export const artworksTable = pgTable("artworks", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),     // 작품 이미지 URL
  title: text("title"),                       // 작품 제목 (선택)
  description: text("description"),           // 작품 설명 (선택)
  createdAt: timestamp("created_at").defaultNow().notNull(),

  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),

  taskId: integer("task_id")
    .references(() => tasksTable.id),        // 어떤 태스크에 연결된 작품인지 (선택)
});