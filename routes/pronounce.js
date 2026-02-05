const router = require("express").Router();
const multer = require("multer");
const { spawn } = require("child_process");
const getPhonemes = require("../ai/phoneme");
const diff = require("../ai/diff");
const score = require("../ai/score");

// CHANGE THIS to your actual python path
const PYTHON = "py";

const upload = multer({ dest: "uploads/" });

router.post("/:word", upload.single("audio"), async (req, res) => {
  console.log("➡️ Request received");

  if (!req.file) {
    console.log("❌ No file received");
    return res.status(400).json({ error: "No audio file" });
  }

  console.log("📁 Audio saved:", req.file.path);

  const target = req.params.word;

  const py = spawn("python3", ["ai/transcribe.py", req.file.path]);

  console.log("🐍 Python started");

  let transcript = "";

  py.stdout.on("data", data => {
    transcript += data.toString();
  });

  py.stderr.on("data", err => {
    console.error("🐍 Python error:", err.toString());
  });

  py.on("close", async code => {
    console.log("🐍 Python exited with", code);

    transcript = transcript.trim();
    console.log("📝 Transcript:", transcript);

    try {
      const userPh = await getPhonemes(transcript);
      const correctPh = await getPhonemes(target);
      const comparison = diff(userPh, correctPh);
      const points = score(comparison);
res.json({
  word: target,
  transcript,
  userPh,
  correctPh,
  comparison,
  score: points
});
    } catch (e) {
      console.error("🔥 Processing error:", e);
      res.status(500).json({ error: "Phoneme processing failed" });
    }
  });
});

module.exports = router;
