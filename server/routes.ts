import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEntrySchema } from "@shared/schema";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all active competitions
  app.get("/api/competitions", async (_req, res) => {
    const competitions = await storage.getCompetitions();
    res.json(competitions.filter(c => c.isActive));
  });

  // Get single competition
  app.get("/api/competitions/:id", async (req, res) => {
    const competition = await storage.getCompetition(Number(req.params.id));
    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }
    res.json(competition);
  });

  // Get question for competition
  app.get("/api/competitions/:id/question", async (req, res) => {
    const question = await storage.getQuestionForCompetition(Number(req.params.id));
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    // Don't send the correct answer to the client
    const { correctAnswer, ...questionWithoutAnswer } = question;
    res.json(questionWithoutAnswer);
  });

  // Verify answer
  app.post("/api/competitions/:id/verify", async (req, res) => {
    const question = await storage.getQuestionForCompetition(Number(req.params.id));
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    const userAnswer = req.body.answer;
    const isCorrect = userAnswer === question.correctAnswer;
    res.json({ isCorrect });
  });

  // Create Stripe payment intent
  app.post("/api/competitions/:id/payment", async (req, res) => {
    const competition = await storage.getCompetition(Number(req.params.id));
    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    const { ticketCount } = req.body;
    const amount = ticketCount * competition.ticketPrice * 100; // Convert to cents

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: {
          competitionId: competition.id,
          ticketCount,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ message: "Error creating payment intent" });
    }
  });

  // Create entry after successful payment
  app.post("/api/competitions/:id/enter", async (req, res) => {
    const validated = insertEntrySchema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({ message: "Invalid entry data" });
    }

    try {
      const entry = await storage.createEntry(validated.data);
      res.json(entry);
    } catch (err) {
      res.status(500).json({ message: "Error creating entry" });
    }
  });

  // Get winners
  app.get("/api/winners", async (_req, res) => {
    const winners = await storage.getWinners();
    res.json(winners);
  });

  const httpServer = createServer(app);
  return httpServer;
}
