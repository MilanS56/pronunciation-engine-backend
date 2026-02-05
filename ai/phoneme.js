const fs = require("fs");
const path = require("path");

const raw = fs.readFileSync(
    path.join(__dirname, "cmudict.txt"),
    "utf8"
);

const DICT = {};

raw.split("\n").forEach(line => {
    if (!line || line.startsWith(";;;")) return;
    const parts = line.trim().split(/\s+/);
    let word = parts.shift();
    word = word.replace(/\(\d+\)$/, "").toLowerCase();
    if (!DICT[word]) DICT[word] = parts;
});

const { spawn } = require("child_process");

function g2p(word) {
    return new Promise((resolve) => {
        const py = spawn("python", ["-c",
            `from g2p_en import G2p; g=G2p(); print(g("${word}"))`
        ]);
        let out = "";
        py.stdout.on("data", d => out += d.toString());
        py.on("close", () => {
            resolve(out.replace(/[\[\]',]/g, "").split(" ").filter(Boolean));
        });
    });
}

async function getPhonemes(word) {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    if (DICT[clean]) return DICT[clean];
    return await g2p(clean);
}

module.exports = getPhonemes;
