const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/income", require("./routes/incomeRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/animals", require("./routes/animalRoutes"));
app.use("/api/eggsales", require("./routes/eggSaleRoutes"));
app.use("/api/incubator", require("./routes/incubatorRoutes"));
app.use("/api/eggs", require("./routes/eggRoutes"));
app.use("/api/feed", require("./routes/feedRoutes"));
app.use("/api/alerts", require("./routes/alertRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
