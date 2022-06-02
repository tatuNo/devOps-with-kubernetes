const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

const directory = path.join('/', 'usr', 'src', 'app', 'resources');
const filePath = path.join(directory, 'dailyimage.jpg');

const fileExists = () => {
  return fs.existsSync(filePath);
};

const getImage = async () => {
  const response = await axios.get('https://picsum.photos/400', { responseType: 'stream' });
  const stream = response.data.pipe(fs.createWriteStream(filePath));
  await new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.info('image saved');
      resolve();  
    }).on('error', err => {
      reject(err);
    });
  });
}

app.get('/', async (_req, res) => {
  if(fileExists()) {
    const stats = fs.statSync(filePath);
    const today = new Date();
    if (stats.mtime.getDay() !== today.getDay()) { // Tested with seconds
      await getImage();
    }
  } else {
    await getImage();
  }
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});