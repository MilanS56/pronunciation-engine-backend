const express = require("express");
const cors = require("cors");
const pronounce = require("./routes/pronounce");
app.use(express.json());

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: [
    "https://pronunciation-engine-frontend.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use("/api/pronounce", pronounce);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
