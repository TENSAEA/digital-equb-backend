const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const path = require("path");
const { logger } = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
const corsOptions = require("./config/corsOptions.js");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

dotenv.config();
// Import the mongoose module for connecting to MongoDB
const mongoose = require("mongoose");
// Import the connectDB function to connect to the database
const connectDB = require("./config/db.js");

// Establish a connection to the database
connectDB();
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "/public")));
// Parse incoming JSON payloads
app.use(bodyParser.json());
// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
// Use the logger middleware
app.use(logger);
// Apply CORS with the configured options
app.use(cors(corsOptions));

// Define a simple route to make sure the server is working
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Import routes
const equbRoutes = require("./routes/equbRoutes");
const userRoutes = require("./routes/userRoutes");
const contributionRoutes = require("./routes/contributionRoutes");
const ticketRoutes = require("./routes/TicketRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const holidayLotteryRoutes = require("./routes/holidayLotteryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verifyJWT = require("./middleware/verifyJWT.js");

// Use routes
app.use("/equbs", verifyJWT, equbRoutes);
app.use("/users", verifyJWT, userRoutes);
app.use("/admin", verifyJWT, adminRoutes);
app.use("/contributions", contributionRoutes);
app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);
app.use("/holidayLotteries", holidayLotteryRoutes);
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views/404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Use the errorHandler middleware for any errors that occur in the routing
app.use(errorHandler);

// Start the server and log the port it's running on
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
