/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const path = require("path");
const firebase = require("firebase");
const express = require("express");
const router = express.Router();

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "apiKey",
  authDomain: "projectId.firebaseapp.com",
  databaseURL: "https://databaseName.firebaseio.com",
  storageBucket: "bucket.appspot.com",
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults({
  // Display json-server's built in homepage when json-server starts.
  static: "node_modules/json-server/dist",
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 0);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.post("/games/", function (req, res, next) {
  const error = validateGame(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.id); // Generate a slug for new courses.

    firebase.database().ref("users/").set({
      username: "Sokka",
    });
    next();
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateGame(game) {
  if (!game.players) return "players is required.";
  return "";
}
