const { v4: uuidv4 } = require('uuid');

const id = uuidv4();

const log = () => {
  const date = new Date();

  console.log(`${date}: ${id}`);

  setTimeout(log, 5000);
}

log();