const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');

const PORT = 3003;

const directory = path.join('/', 'usr', 'src', 'app', 'files');
const filePath = path.join(directory, 'timestamp.txt');

const writeFile = () => {
  try {
    const content = new Date().toString();
    fs.writeFileSync(filePath, content);
    console.log('successfully writed');
  } catch (error) {
    console.error(error);
  }
  setTimeout(writeFile, 5000);
};

writeFile();

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});