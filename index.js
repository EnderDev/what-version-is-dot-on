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

    if(req.headers["user-agent"].toLowerCase().includes("discord")) {
        res.send(`
<meta property="og:title" content="What version is Dot Browser on?">
<meta name="twitter:title" content="What version is Dot Browser on?">
<meta name="theme-color" content="#2F3136">
<meta name="og:image" content="">
<meta name="twitter:image" content="">
<meta property="og:description" content="${cached}">
<meta name="description" content="${cached}">
<meta property="twitter:description" content="${cached}">
        `)
    }

    res.end(cached)
})

app.all("/badge", async (req, res) => {
    invalidate();
    
    res.redirect(`https://img.shields.io/badge/version-${cached}-green&style=plastic`)
})

app.listen(3000 || process.env.PORT, () => {
    console.log(`Started at http://localhost:${3000 || process.env.PORT}`)
});