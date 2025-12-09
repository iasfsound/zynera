import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { diagnosisRouter } from "./routes/diagnosis.js";
import { leadsRouter } from "./routes/leads.js";
import { contactRouter } from "./routes/contact.js";
import { budgetRouter } from "./routes/budget.js";
import { chatRouter } from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CORS: Permitir múltiples orígenes (desarrollo local y producción en Vercel)
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Permitir requests sin origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/health", (req: express.Request, res: express.Response) => {
  res.json({ status: "ok", message: "Zynera API is running" });
});

// Routes
app.use("/api", diagnosisRouter);
app.use("/api", leadsRouter);
app.use("/api", contactRouter);
app.use("/api", budgetRouter);
app.use("/api", chatRouter);

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

