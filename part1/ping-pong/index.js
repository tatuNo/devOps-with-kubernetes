const express = require('express');
const app = express();

const PORT = 3002;
let pongs = 0;

app.get('/', (req, res) => {
  pongs++;
  res.send(`Pong: ${pongs}`);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});