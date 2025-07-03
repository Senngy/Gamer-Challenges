// File: api/app.js
import "dotenv/config";
import cors from "cors";
import express from "express";

const PORT = process.env.PORT || 3000; // Default port if not specified in .env

const app = express();

const corsOptions = { // Configure CORS options
  origin: 'http://localhost:5173', // Adjust this to your frontend's URL
  credentials: true, // Allow credentials if needed
};

app.use(cors(corsOptions)); // Use CORS middleware with the specified options
app.use(express.json());    // Parse JSON request bodies

/*

app.use("/user",);
app.use("/game",);
app.use("/challenge",);
app.use("/challenges",);
*/

app.listen(PORT, () => {
  console.log(`Server is running on port at http://localhost:${PORT}`);
});
