// import dotenv from "dotenv";
// if (process.env.NODE_ENV === "development") {
//
// }
// Read .env variables
import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import { connectDB } from "./config/db/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

import workerRoutes from "./routes/workerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import todayRoutes from "./routes/todayRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cors from "cors";

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to the Mongo DB
connectDB();

// App initialization
const app = express();

app.use(cors());
// We want all transmited data in json before being read
app.use(json());

// This options set the request body into req.body
app.use(
  urlencoded({
    extended: false,
  })
);

// Routes
app.use("/", userRoutes);
app.use("/workers", workerRoutes);
app.use("/activities", activityRoutes);
app.use("/roles", roleRoutes);
app.use("/today", todayRoutes);
app.use("/notes", noteRoutes);

// Error handling middleware at the end to catch any error thrown by the routes or other middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Live and listeting on port: ${PORT}`);
});
