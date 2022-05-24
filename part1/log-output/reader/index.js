const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const filePath = path.join(directory, 'timestamp.txt');

const id = uuidv4();
const PORT = 3001;

app.get('/', (_req, res) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.send(`${data}: ${id}`);
  } catch (error) {
    res.status(404).send({error: error});
  }
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});