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
app.use("/api/eggs", require("./routes/eggRoutes"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
