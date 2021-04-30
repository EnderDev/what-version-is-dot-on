const express = require("express");
const axios = require("axios");

const app = express();

let cached = "";

const invalidate = async (noChance) => {
    if(!noChance && Math.random() > 0.3) return;

    cached = await axios.get("https://raw.githubusercontent.com/dothq/browser-desktop/nightly/package.json")
        .then(res => res.data.versions["firefox-display"])
}

invalidate(true);

app.all("/", async (req, res) => {
    invalidate();

    res.end(cached)
})

app.all("/badge", async (req, res) => {
    invalidate();
    
    res.redirect(`https://img.shields.io/badge/version-${cached}-green&style=plastic`)
})

app.listen(3000 || process.env.PORT, () => {
    console.log(`Started at http://localhost:${3000 || process.env.PORT}`)
});