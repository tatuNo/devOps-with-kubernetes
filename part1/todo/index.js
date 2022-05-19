const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (_req, res) => {
  res.send('<h2>Welcome to todos</h2>');
});


app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});