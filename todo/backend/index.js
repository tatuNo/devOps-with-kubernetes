const express = require("express");
const cors = require("cors");

const todosRouter = require('./controllers/todos');
const dailyImageRouter = require('./controllers/dailyimage');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todosRouter);
app.use('/dailyimage.jpg', dailyImageRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});