// File: api/app.js
import "dotenv/config";
import cors from "cors";
import express from "express";

import usersRouter from "./routes/users.routes.js";
import gamesRouter from "./routes/games.routes.js";
import challengesRouter from "./routes/challenges.routes.js";
import authRouter from "./routes/auth.routes.js"; // Import the auth routes

const PORT = process.env.PORT || 3000; // Default port if not specified in .env

const app = express();

const corsOptions = { // Configure CORS options
  origin: 'http://localhost:5173', // Adjust this to your frontend's URL
  credentials: true, // Allow credentials if needed
};

app.use(cors(corsOptions)); // Use CORS middleware with the specified options
app.use(express.json());    // Parse JSON request bodies

// const authRoutes = require('./routes/auth.routes');
// app.use('/auth', authRoutes);
app.use("/auth", authRouter)
// app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/challenges", challengesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port at http://localhost:${PORT}`);
});
