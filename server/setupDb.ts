import { db } from "./db";
import { competitions, questions } from "@shared/schema";
import type { InsertCompetition, InsertQuestion } from "@shared/schema";

async function setupDatabase() {
  // Insert sample competitions
  const sampleCompetitions: InsertCompetition[] = [
    {
      title: "Win a Pro Surfboard",
      description: "Win a professional grade surfboard worth $800",
      prize: "Channel Islands Surfboard",
      imageUrl: "https://images.unsplash.com/photo-1486869801134-25b6bc85fc0d",
      ticketPrice: 5,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: true
    },
    {
      title: "Premium Wetsuit Giveaway",
      description: "Win a top-of-the-line wetsuit",
      prize: "O'Neill Psycho Tech 4/3mm Wetsuit",
      imageUrl: "https://images.unsplash.com/photo-1502933691298-84fc14542831",
      ticketPrice: 3,
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      isActive: true
    }
  ];

  const insertedCompetitions = await db.insert(competitions).values(sampleCompetitions).returning();
  console.log("Inserted competitions:", insertedCompetitions);

  // Insert corresponding questions
  const sampleQuestions: InsertQuestion[] = insertedCompetitions.map((comp) => ({
    competitionId: comp.id,
    question: "What is the primary function of a surfboard's fins?",
    correctAnswer: "Provide stability and control",
    options: [
      "Provide stability and control",
      "Make the board look cool",
      "Increase board weight",
      "Store wax"
    ]
  }));

  const insertedQuestions = await db.insert(questions).values(sampleQuestions).returning();
  console.log("Inserted questions:", insertedQuestions);
}

setupDatabase().catch(console.error);
