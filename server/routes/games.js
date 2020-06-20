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

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", function (req, res) {
  return database
    .ref("/games/")
    .once("value")
    .then(function (snapshot) {
      const data = snapshot.val() || {};
      res.json(data);
    });
});

router.post("/", function (req, res) {
  const newGameKey = firebase.database().ref().child("games").push().key;
  database.ref("games/" + newGameKey).set({
    ...req.body,
    id: newGameKey,
  });
  res.json(req.body);
});

router.get("/:gameId", function (req, res) {
  res.json(data.games[req.params.gameId]);
});

router.put("/:gameId", function (req, res) {
  console.log(req.body);
  database.ref("games/" + req.params.gameId).update(req.body);
  res.json(req.body);
});

module.exports = router;
