const express = require("express");
const path = require("path");
const players = require("./routes/players");
const games = require("./routes/games");
const bodyParser = require("body-parser");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

// Api end points
// app.use("/api/players", players);
// app.use("/api/games", games);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Shanghai API listening on ${port}`);
