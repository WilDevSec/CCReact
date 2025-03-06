import { 
  competitions,
  questions,
  entries,
  winners,
  type Competition,
  type Question,
  type Entry,
  type Winner,
  type InsertCompetition,
  type InsertQuestion,
  type InsertEntry,
  type InsertWinner
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Competitions
  getCompetitions(): Promise<Competition[]>;
  getCompetition(id: number): Promise<Competition | undefined>;
  createCompetition(competition: InsertCompetition): Promise<Competition>;

  // Questions
  getQuestionForCompetition(competitionId: number): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;

  // Entries
  createEntry(entry: InsertEntry): Promise<Entry>;
  getEntriesForCompetition(competitionId: number): Promise<Entry[]>;

  // Winners
  getWinners(): Promise<Winner[]>;
  createWinner(winner: InsertWinner): Promise<Winner>;
}

export class DatabaseStorage implements IStorage {
  async getCompetitions(): Promise<Competition[]> {
    return await db.select().from(competitions);
  }

  async getCompetition(id: number): Promise<Competition | undefined> {
    const [competition] = await db
      .select()
      .from(competitions)
      .where(eq(competitions.id, id));
    return competition;
  }

  async createCompetition(competition: InsertCompetition): Promise<Competition> {
    const [newCompetition] = await db
      .insert(competitions)
      .values(competition)
      .returning();
    return newCompetition;
  }

  async getQuestionForCompetition(competitionId: number): Promise<Question | undefined> {
    const [question] = await db
      .select()
      .from(questions)
      .where(eq(questions.competitionId, competitionId));
    return question;
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await db
      .insert(questions)
      .values(question)
      .returning();
    return newQuestion;
  }

  async createEntry(entry: InsertEntry): Promise<Entry> {
    const [newEntry] = await db
      .insert(entries)
      .values(entry)
      .returning();
    return newEntry;
  }

  async getEntriesForCompetition(competitionId: number): Promise<Entry[]> {
    return await db
      .select()
      .from(entries)
      .where(eq(entries.competitionId, competitionId));
  }

  async getWinners(): Promise<Winner[]> {
    return await db.select().from(winners);
  }

  async createWinner(winner: InsertWinner): Promise<Winner> {
    const [newWinner] = await db
      .insert(winners)
      .values(winner)
      .returning();
    return newWinner;
  }
}

// Replace MemStorage with DatabaseStorage
export const storage = new DatabaseStorage();