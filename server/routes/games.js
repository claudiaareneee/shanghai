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
  res.json(data.games);
});

router.put("/", function (req, res) {
  console.log(req.body);
  // database()
  //   .ref("games/" + req.body.)
  //   .set({
  //     username: name,
  //     email: email,
  //     profile_picture: imageUrl,
  //   });
  res.json(req.body);
});

router.put("/:gameId", function (req, res) {
  console.log(req.body);
  firebase
    .database()
    .ref("games/" + req.params.gameId)
    .update(req.body);
  res.json(req.body);
});

router.get("/:gameId", function (req, res) {
  res.json(data.games[req.params.gameId]);
});

module.exports = router;
