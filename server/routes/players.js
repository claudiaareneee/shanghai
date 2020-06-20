const express = require("express");
const router = express.Router();
const data = require("../tools/mockData");
const firebase = require("../tools/firebase.config");
require("firebase/database");

const database = firebase.database();
const baseUrl = "/players/";

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
  database.ref(baseUrl + newPlayer).set({
    ...req.body,
    id: newPlayer,
  });
  res.json(req.body);
});

router.get("/:playerId", function (req, res) {
  res.json(data.players[req.params.playerId]);
});

module.exports = router;
