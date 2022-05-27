const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const dirTimestamp = path.join('/', 'usr', 'src', 'app', 'files');
const dirPingpongs = path.join('/', 'usr', 'src', 'app', 'pongs');
const timestampPath = path.join(dirTimestamp, 'timestamp.txt');
const pingpongsPath = path.join(dirPingpongs, 'pingpong.txt');

const id = uuidv4();
const PORT = 3001;

app.get('/', (_req, res) => {
  try {
    const timestamp = fs.readFileSync(timestampPath, 'utf8');
    const pingpongs = fs.readFileSync(pingpongsPath, 'utf8');
    res.send(`<p> ${timestamp}: ${id} </p> <p> Ping / Pongs: ${pingpongs} </p>`);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});