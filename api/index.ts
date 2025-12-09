// Vercel serverless function wrapper for Express app
import express, { Request, Response } from "express";
import cors from "cors";
import { diagnosisRouter } from "./src/routes/diagnosis.js";
import { leadsRouter } from "./src/routes/leads.js";
import { contactRouter } from "./src/routes/contact.js";
import { budgetRouter } from "./src/routes/budget.js";
import { chatRouter } from "./src/routes/chat.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Zynera API is running" });
});

// Routes - Vercel already routes /api/* to this function, so we don't need /api prefix
app.use("/", diagnosisRouter);
app.use("/", leadsRouter);
app.use("/", contactRouter);
app.use("/", budgetRouter);
app.use("/", chatRouter);

// Error handling
app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

// Export for Vercel serverless
// Vercel with @vercel/node can handle Express apps directly
export default app;

