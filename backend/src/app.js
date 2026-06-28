const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const uploadRoutes=require("./routes/uploadRoutes");
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");


app.use("/api/upload",uploadRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "LeadGen AI Backend Running",
  });
});

module.exports = app;