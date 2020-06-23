const express = require("express");
const router = express.Router();
const data = require("../tools/mockData");
const firebase = require("../tools/firebase.config");
require("firebase/database");

const database = firebase.database();
const baseUrl = "/players/";
const baseUrlGames = "/games/";

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", function (req, res) {
  return database
    .ref(baseUrl)
    .once("value")
    .then(function (snapshot) {
      const data = snapshot.val() || {};
      res.json(data);
    });
});

router.post("/", function (req, res) {
  const newPlayer = firebase.database().ref().child(baseUrl).push().key;
  const player = {
    ...req.body.player,
    id: newPlayer,
  };

  database.ref(baseUrl + newPlayer).set(player);
  database
    .ref(baseUrlGames + req.body.gameId)
    .child("opponents")
    .push(newPlayer);

  res.json(player);
});

router.get("/:playerId", function (req, res) {
  res.json(data.players[req.params.playerId]);
});

module.exports = router;
