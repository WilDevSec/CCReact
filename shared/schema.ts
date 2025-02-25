import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const competitions = pgTable("competitions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  prize: text("prize").notNull(),
  imageUrl: text("image_url").notNull(),
  ticketPrice: integer("ticket_price").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id").notNull(),
  question: text("question").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  options: text("options").array().notNull(),
});

export const entries = pgTable("entries", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id").notNull(),
  userId: text("user_id").notNull(),
  ticketCount: integer("ticket_count").notNull(),
  paymentIntentId: text("payment_intent_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const winners = pgTable("winners", {
  id: serial("id").primaryKey(),
  competitionId: integer("competition_id").notNull(),
  userId: text("user_id").notNull(),
  announcedAt: timestamp("announced_at").notNull().defaultNow(),
});

export const insertCompetitionSchema = createInsertSchema(competitions).omit({ id: true });
export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true });
export const insertEntrySchema = createInsertSchema(entries).omit({ id: true, createdAt: true });
export const insertWinnerSchema = createInsertSchema(winners).omit({ id: true, announcedAt: true });

export type Competition = typeof competitions.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type Entry = typeof entries.$inferSelect;
export type Winner = typeof winners.$inferSelect;

export type InsertCompetition = z.infer<typeof insertCompetitionSchema>;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type InsertEntry = z.infer<typeof insertEntrySchema>;
export type InsertWinner = z.infer<typeof insertWinnerSchema>;
