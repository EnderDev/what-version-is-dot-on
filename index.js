const express = require("express");
const axios = require("axios");

const app = express();

const cache = {}

app.all("/", async (req, res) => {
    res.end(
        await axios.get("https://raw.githubusercontent.com/dothq/browser-desktop/nightly/package.json")
            .then(res => res.data.versions["firefox-display"])
    )
})

app.listen(3000 || process.env.PORT, () => {
    console.log(`Started at http://localhost:${3000 || process.env.PORT}`)
});