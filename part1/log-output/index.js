const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();
const PORT = 3001;

app.get('/', (_req, res) => {
  const date = new Date();
  res.send(`${date}: ${id}`)  
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});