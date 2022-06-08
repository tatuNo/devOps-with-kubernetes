const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const axios = require('axios');

const dirTimestamp = path.join('/', 'usr', 'src', 'app', 'files');
//const dirPingpongs = path.join('/', 'usr', 'src', 'app', 'pongs');
const timestampPath = path.join(dirTimestamp, 'timestamp.txt');
//const pingpongsPath = path.join(dirPingpongs, 'pingpong.txt');

const id = uuidv4();
const PORT = 3001;

app.get('/', async (_req, res) => {
  try {
    const timestamp = fs.readFileSync(timestampPath, 'utf8');
    const response = await axios.get('http://ping-pong-svc:2346/count');
    res.send(`<p> ${process.env.MESSAGE} </p> <p> ${timestamp}: ${id} </p> <p> Ping / Pongs: ${response.data} </p>`);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});