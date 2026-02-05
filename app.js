const express = require("express");
const cors = require("cors");
const pronounce = require("./routes/pronounce");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

app.use("/api/pronounce", pronounce);

app.listen(PORT, () => {
  console.log("AI server running on", PORT);
});
