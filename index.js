const express = require("express");
const axios = require("axios");

const app = express();

let cached = "";

app.all("/", async (req, res) => {
    cached = await axios.get("https://raw.githubusercontent.com/dothq/browser-desktop/nightly/package.json")
                    .then(res => res.data.versions["firefox-display"])

    res.end(cached)
})

app.all("/badge", async (req, res) => {
    res.redirect(`https://img.shields.io/badge/version-${cached}-green&style=plastic`)
})

app.listen(3000 || process.env.PORT, () => {
    console.log(`Started at http://localhost:${3000 || process.env.PORT}`)
});