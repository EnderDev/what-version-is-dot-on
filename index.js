const express = require("express");
const axios = require("axios");

const app = express();

let cached = "";

const invalidate = async () => {
    const { data } = await axios.get("https://raw.githubusercontent.com/dothq/browser-desktop/nightly/package.json")
    
    if(data.versions && data.versions["firefox-display"]) cached = data.versions["firefox-display"];
}

invalidate();

app.all("/", async (req, res) => {
    await invalidate();

    res.send(`
<html>
    <head>
        <meta property="og:title" content="What version is Dot Browser on?">
        <meta name="twitter:title" content="What version is Dot Browser on?">
        <meta name="theme-color" content="#2F3136">
        <meta name="og:image" content="">
        <meta name="twitter:image" content="">
        <meta property="og:description" content="${cached}">
        <meta name="description" content="${cached}">
        <meta property="twitter:description" content="${cached}">
    </head>
    <body>${cached}</body>
</html>
    `)
})

app.all("/badge", async (req, res) => {
    await invalidate();
    
    res.redirect(`https://img.shields.io/badge/version-${cached}-green&style=plastic`)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Started at http://localhost:${process.env.PORT || 3000}`)
});
