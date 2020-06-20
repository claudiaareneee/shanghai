const express = require("express");
const router = express.Router();
const data = require("../tools/mockData");
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const firebaseConfig = require("../tools/firebase.config");
require("firebase/database");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const baseUrl = "/players/";

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", function (req, res) {
  return database
    .ref("/players/")
    .once("value")
    .then(function (snapshot) {
      const data = snapshot.val() || {};
      res.json(data);
    });
});

router.post("/", function (req, res) {
  const newPlayer = firebase.database().ref().child("players").push().key;
  database.ref("players/" + newPlayer).set({
    ...req.body,
    id: newPlayer,
  });
  res.json(req.body);
});

router.get("/:playerId", function (req, res) {
  res.json(data.players[req.params.playerId]);
});

module.exports = router;
