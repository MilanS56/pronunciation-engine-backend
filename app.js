const express = require("express");
const cors = require("cors");
const pronounce = require("./routes/pronounce");

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

app.use("/api/pronounce", pronounce);

app.listen(5000, () => console.log("AI server running on 5000"));
