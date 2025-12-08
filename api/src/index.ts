import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { diagnosisRouter } from "./routes/diagnosis.js";
import { leadsRouter } from "./routes/leads.js";
import { contactRouter } from "./routes/contact.js";
import { budgetRouter } from "./routes/budget.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Zynera API is running" });
});

// Routes
app.use("/api", diagnosisRouter);
app.use("/api", leadsRouter);
app.use("/api", contactRouter);
app.use("/api", budgetRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Zynera API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});

