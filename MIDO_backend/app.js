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
import webhookRoutes from "./routes/webhookRoutes.js";
import cors from "cors";

// When deploying and having https certificate
// Use HSTS in headers, and setting a max-age i.e

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to the Mongo DB
connectDB();

// App initialization
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://fareharbor.com"],
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Frame-Options"],
  optionsSuccessStatus: 200, // status for preflights
};
app.use(cors(corsOptions));
// We want all transmited data in json before being read
app.use(json());

// This options set the request body into req.body
app.use(
  urlencoded({
    extended: false,
  })
);

app.options(
  ["/", "workers", "activities", "roles", "today", "notes", "healthz"],
  function (req, res, next) {
    // Set the allowed HTTP methods and headers
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.send();
  }
);

// Routes
app.use("/", userRoutes);
app.use("/fareharbor-webhook", webhookRoutes);
app.use("/workers", workerRoutes);
app.use("/activities", activityRoutes);
app.use("/today", todayRoutes);
app.use("/healthz", (req, res) => {
  res.send("ok").status(200);
});

// Error handling middleware at the end to catch any error thrown by the routes or other middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Live and listeting on port: ${PORT}`);
});
