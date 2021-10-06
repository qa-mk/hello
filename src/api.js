const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});
router.get("/ftx", async (req, res) => {
    try {
        const response = await axios.get('https://ftx.com/api/markets')
        res.status(200).json(response.data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
  });

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);