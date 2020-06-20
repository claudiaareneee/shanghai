const express = require("express");
const router = express.Router();
const firebase = require("../tools/firebase.config");
require("firebase/database");

const database = firebase.database();
const baseUrl = "/games/";

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
  const newGameKey = firebase.database().ref().child(baseUrl).push().key;
  database.ref(baseUrl + newGameKey).set({
    ...req.body,
    id: newGameKey,
  });
  res.json(req.body);
});

router.get("/:gameId", function (req, res) {
  return database
    .ref(baseUrl + req.params.gameId)
    .once("value")
    .then(function (snapshot) {
      const data = snapshot.val() || {};
      res.json(data);
    });
});

router.put("/:gameId", function (req, res) {
  database.ref(baseUrl + req.params.gameId).update(req.body);
  res.json(req.body);
});

router.get("/:gameId/shuffle", function (req, res) {
  // TODO
  return database
    .ref(baseUrl + req.params.gameId)
    .once("value")
    .then(function (snapshot) {
      const data = snapshot.val() || {};
      res.json(data);
    });
});

router.get("/:gameId/getCardFromDrawPile", function (req, res) {
  // TODO
  return database
    .ref(baseUrl + req.params.gameId)
    .once("value")
    .then(function (snapshot) {
      const data = snapshot.val() || {};
      res.json(data);
    });
});

module.exports = router;
