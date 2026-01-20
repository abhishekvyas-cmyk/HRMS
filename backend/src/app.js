const express = require("express");
const cors = require("cors");

const routesAggregator = require("./routes/v1/routes");

const {rateLimiter} = require("./middleware/index")

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Versioned API
app.use("/api/v1", routesAggregator);

module.exports = app;