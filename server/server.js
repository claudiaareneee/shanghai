const express = require("express");
const path = require("path");
const players = require("./routes/players");
const games = require("./routes/games");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.get("/api/passwords", (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(
    (i) => Math.random() * 360
  );

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.use("/api/players", players);

app.use("/api/games", games);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Password generator listening on ${port}`);
