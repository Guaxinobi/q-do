const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const dbService = require("./dbService.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("views"));

app.set("view engine", "ejs");

// PATH FOR HTML-TEMPLATE
app.use(express.static(path.join(__dirname, "..", "client")));

// read
app.get("/getTopTenScores", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getTopXScores(10);

  result
    .then((data) => {
      response.json({ data: data });
      return data;
    })
    .catch((err) => console.log(err));
});

// read
app.get("/getAllScores", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllScores();

  result
    .then((data) => {
      response.json({ data: data });
      return data;
    })
    .catch((err) => console.log(err));
});

app.get("/checkUsername/:username", (request, response) => {
  const { username } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.checkUsername(username);

  result
    .then((data) => {
      response.json({ data: data });
      return data;
    })
    .catch((err) => console.log(err));
});

// UPDATE
app.patch("/updateUserScore", (request, response) => {
  const { username, score } = request.body;
  const db = dbService.getDbServiceInstance();

  const result = db.updatePlayerScore(username, score);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

// CREATE
app.post("/createUserScore", (request, response) => {
  const { username, score } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.createPlayerScore(username, score);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen("4200", () => {
  console.log("Server gestartet auf Port 4200");
});
