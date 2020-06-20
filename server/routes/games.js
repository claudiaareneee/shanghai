const express = require("express");
const router = express.Router();
const data = require("../tools/mockData");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", function (req, res) {
  res.json(data.games);
});
// define the about route
router.get("/:gameId", function (req, res) {
  res.json(data.games[req.params.playerId]);
});

module.exports = router;
