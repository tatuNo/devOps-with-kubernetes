const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const directory = path.join('/', 'usr', 'src', 'app', 'pongs');
const filePath = path.join(directory, 'pingpong.txt');

const PORT = 3002;
let pongs = 0;

const fileExists = () => {
  return fs.existsSync(filePath);
};

const increasePongs = () => {
  pongs++;
  try {
    fs.writeFileSync(filePath, pongs.toString());
  } catch (error) {
    console.log(error);
  }
};

const readPongs = () => {
  try {
    return Number(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    return 0;
  }
};

app.get('/', (req, res) => {
  
  if(fileExists()) {
    pongs = readPongs();
  }

  increasePongs();
  res.send(`Pong: ${pongs}`);
});

app.get('/count', (req, res) => {
  res.json(readPongs());
})

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});